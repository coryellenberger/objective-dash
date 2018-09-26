import {typeDefs, resolvers, publicResolvers, context} from "./graphql-schema";
import {ApolloServer, AuthenticationError} from "apollo-server";
import dotenv from "dotenv";

import {makeExecutableSchema, addSchemaLevelResolveFunction} from 'graphql-tools';

dotenv.config();

if (typeof process.env.JWT_SECRET === 'undefined') {
  console.warn('WARNING: process.env.JWT_SECRET is not defined. Check README.md for more information');
}

const schema = makeExecutableSchema({typeDefs, resolvers});

addSchemaLevelResolveFunction(schema, async (root, args, context, info) => {
  // if Private Resolver is being handled
  if (publicResolvers.indexOf(info.fieldName) === -1) {
    // gather current user from the context
    const scope = await context.authScope;
    const user = await scope.user;
    if (!user) {
      console.error('User NOT authenticated attempted to hit API:', info.fieldName);
      throw new AuthenticationError('Not Authenticated');
    }
  }
});

const server = new ApolloServer({
  schema,
  context: ({req}) => ({
    authScope: context(req)
  }),
});

server.listen(process.env.GRAPHQL_LISTEN_PORT, '0.0.0.0').then(({url}) => {
  console.log(`GraphQL API ready at ${url}`);
});