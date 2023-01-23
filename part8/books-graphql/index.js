const { createServer } = require('http');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const context = require("./src/context");
const { MONGODB_URI, GRAPHQL_PATH, PORT, WS_PATH } = require("./config");

mongoose.set("strictQuery", true);

const app = express();

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  // Proper shutdown for the HTTP server.
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: WS_PATH,
});

const serverCleanup = useServer({ schema }, wsServer);

// Async wrapper to avoid .then() hell
(async () => {
  await mongoose.connect(MONGODB_URI);
  await server.start();
  
  app.use(GRAPHQL_PATH, cors(), bodyParser.json(), expressMiddleware(server,  {
    context
  }));

  console.log("🌐  Connected to MongoDB ");
  
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(`🚀  WS Subscriptions ready at ws://localhost:${PORT}${WS_PATH}`);
  console.log(`🚀  Server ready at http://localhost:${PORT}${GRAPHQL_PATH}`);
})();
