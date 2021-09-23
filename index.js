const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require('./schema/index');
const { resolvers } = require('./resolvers/index');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.APP_URL);
        next();
    });
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null;
            if (auth) {
                const decodedToken = jwt.verify(
                    auth.split(' ')[1], process.env.JWT_SECRET
                );
                const user = await User.findById(decodedToken.id);
                return { user };
            }
        }
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => app.listen({ port: process.env.PORT }, resolve));
    console.log(`Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    mongoose.connect(process.env.DB_URL,
        // , { useNewUrlParser: true, useUnifiedTopology: true },
        err => {
            if (err) throw err;
            console.log('DB Connected successfully');
        }
    );
    //   mongoose.set('useFindAndModify', false);
    return { server, app };
}
startApolloServer(typeDefs, resolvers);
