import {typeDefs, resolvers, context} from "./graphql-schema";
import {ApolloServer} from "apollo-server";
import dotenv from "dotenv";

import {makeExecutableSchema, addSchemaLevelResolveFunction} from 'graphql-tools';

dotenv.config();

if (typeof process.env.JWT_SECRET === 'undefined') {
  console.warn('WARNING: process.env.JWT_SECRET is not defined. Check README.md for more information');
}

const schema = makeExecutableSchema({typeDefs, resolvers});

addSchemaLevelResolveFunction(schema, (root, args, context, info) => {
  console.log('hitting the schema resolver');
  console.log('info', info);
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