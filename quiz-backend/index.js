// it starts the backend server
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const sequelize = require("./db");
const Question = require("./models/Question");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  await sequelize.sync({ force: true });

  // Seed data
  await Question.bulkCreate([
    {
      question: "What is my birthday month?",
      options: ["February", "July", "December"],
      correctAnswer: "February",
    },
    {
      question: "What is my favourite hobby?",
      options: ["Singing", "Painting" , "Sketching"],
      correctAnswer: "Painting",
    },
    {
      question: "What would I prefer?",
      options: ["City", "Mountains" , "Beaches"],
      correctAnswer: "Mountains",
    },
    {
      question: "What is my favourite colour?",
      options: ["Blue", "Green" , "Red"],
      correctAnswer: "Red",
    },
  ]);

//   app.listen(4000, () =>
//     console.log("Server running at http://localhost:4000/graphql")
//   );
// }
app.listen(4000, "0.0.0.0", () =>
  console.log("Server running at http://0.0.0.0:4000/graphql")
);
}
startServer();
