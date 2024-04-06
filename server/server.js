const express = require("express");
const path = require("path");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;

//convert everything to rest api
// rewrite project

// Initialize Express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

async function startApolloServer() {
  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    async context({ req }) {
      // Use authMiddleware to add user info to context
      return authMiddleware({ req });
    },
  });

  // Use startStandaloneServer for Apollo Server setup
  await startStandaloneServer(server, {
    listen: { port: PORT },
    // Optionally, provide the Express app for HTTP server configuration
    // This allows startStandaloneServer to attach itself to the Express app
    httpServer: app,
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

db.once("open", startApolloServer);
