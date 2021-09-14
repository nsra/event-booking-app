const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require('./schema/index');
const { resolvers } = require('./resolvers/index');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
    console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    return { server, app };
}
startApolloServer(typeDefs, resolvers);
