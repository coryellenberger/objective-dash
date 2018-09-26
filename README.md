# MBO Dashboard

This project uses the [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database). There are two components to the starter, the UI application (a React app) and the API app (GraphQL server).

## Useful Knowledge

### API
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [GraphQL](https://graphql.org/)
* [GraphQL Tools](https://www.apollographql.com/docs/graphql-tools/)
* [Neo4j](https://neo4j.com/)

### UI
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [ReactJS](https://reactjs.org/)
* [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
* [Material UI](https://material-ui.com/)
* [GraphQL](https://graphql.org/)

## Quickstart

### Neo4j

You need a Neo4j instance, e.g. a [Neo4j Sandbox](http://neo4j.com/sandbox), a local instance via [Neo4j Desktop](https://neo4j.com/download), [Docker](http://hub.docker.com/_/neo4j) or a [Neo4j instance on AWS, Azure or GCP](http://neo4j.com/developer/guide-cloud-deployment) or [Neo4j Cloud](http://neo4j.com/cloud)

For schemas using the  `@cypher` directive via [`neo4j-graphql-js`](https://github.com/neo4j-graphql/neo4j-graphql-js), you need to have the [APOC library](https://github.com/neo4j-contrib/neo4j-apoc-procedures) installed, which is automatic in Sandbox, Cloud and a single click install in Neo4j Desktop. 

*Install dependencies*

```
(cd ./ui && npm install)
(cd ./api && npm install)
```

### [`/api`](./api)

*Start API server*
```
cd ./api && npm start
```

![](api/img/graphql-playground.png)

### [`/ui`](./ui)

This will start the GraphQL API in the foreground, so in another terminal session start the UI development server:

*Start UI server*
```
cd ./ui && npm start
```

![](ui/img/default-app.png)
