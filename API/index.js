const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./models/db");
const schema = require("./schema");
require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
