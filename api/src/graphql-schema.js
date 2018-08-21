import {v1 as neo4j} from "neo4j-driver";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let driver;

export const typeDefs = `
  type User {
    id: ID!
    email: String!
    password: String!
    jwt: String
  }
  
  type Query {
    currentUser: User
  }
  
  type Mutation {
    login(email: String!, password: String!): User
    signup(email: String!, password: String!): User
  }
`;

export const resolvers = {
  Query: {
    currentUser: async (root, args, scope) => {
      const context = await scope.authScope;
      return await context.user;
    },
  },
  Mutation: {
    login: async (root, { email, password }, scope) => {
      const context = await scope.authScope;

      const session = context.driver.session();

      const userResults = await session
        .run('MATCH (user:User { email: { email } }) RETURN user', { email: email });

      const user = userResults.records[0].get('user').properties

      if (!user) {
        throw new Error('Email not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Password is incorrect');
      }

      user.jwt = jwt.sign({ id: user.id }, context.secrets.JWT_SECRET);

      session.close();

      return user;
    },
    signup: async (root, { email, password }, scope) => {
      const context = await scope.authScope;

      const session = context.driver.session();

      const existingUser = await session
        .run('MATCH (user:User { email: { email } }) RETURN user', { email: email });

      if (existingUser.records.length > 0) {
        throw new Error('Email already used');
      }

      const hash = await bcrypt.hash(password, 10);
      const numberUsers = await session
        .run('MATCH (users:User) RETURN count(*)');
      const count = parseInt(numberUsers.records[0].get('count(*)')) + 1
      const results = await session
        .run('CREATE (newUser:User { id: { id }, email: { email }, password: { password } }) RETURN newUser', {
          id: 'u' + count,
          email: email,
          password: hash
        });
      const user = results.records[0].get('newUser').properties;

      user.jwt = jwt.sign({ id: user.id }, context.secrets.JWT_SECRET);

      session.close();

      return user;
    }
  }
};

// https://launchpad.graphql.com/n4xk8xm87
const getUser = async (authorization, secrets, driver) => {
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const { ok, result } = await new Promise(resolve =>
      jwt.verify(token, secrets.JWT_SECRET, (err, result) => {
        if (err) {
          console.log('Ok error');
          resolve({
            ok: false,
            result: err
          });
        } else {
          console.log('Ok 2');
          resolve({
            ok: true,
            result
          });
        }
      })
    );

    if (ok) {
      const session = driver.session();

      console.log(result.id);

      const results = await session
        .run('MATCH (user:User { id: { id } }) RETURN user', { id: result.id });

      const user = results.records[0].get('user').properties;

      console.log(user);

      session.close();
      return user;
    } else {
      console.error(result);
      return null;
    }
  }

  return null;
};

export async function context(req) {
  if (!driver) {
    driver = neo4j.driver(
      process.env.NEO4J_URI || "bolt://localhost:7687",
      neo4j.auth.basic(
        process.env.NEO4J_USER || "neo4j",
        process.env.NEO4J_PASSWORD || "neo4j"
      )
    );
  }

  let secrets;

  if (!secrets) {
    secrets = process.env;
  }

  let headers = req.headers;

  const user = await getUser(headers.authorization, secrets, driver);

  return {
    headers,
    secrets,
    driver,
    user,
  };

}
