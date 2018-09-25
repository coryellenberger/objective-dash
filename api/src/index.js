import { typeDefs, resolvers, context } from "./graphql-schema";
import { ApolloServer } from "apollo-server-express";
import Express from 'express';
import dotenv from "dotenv";

const app = Express();

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

dotenv.config();

if (typeof process.env.JWT_SECRET === 'undefined') {
  console.warn('WARNING: process.env.JWT_SECRET is not defined. Check README.md for more information');
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authScope: context(req)
  }),
});

server.applyMiddleware({ app });

app.listen({ port: process.env.GRAPHQL_LISTEN_PORT }, () => {
  console.log(`GraphQL API ready at ${server.graphqlPath}`);
});