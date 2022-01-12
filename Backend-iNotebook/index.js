const connectToMongo = require("./db");
connectToMongo();
const express = require("express");

const app = express();
const port = 5000;
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

console.log("coneected to port 5000");
app.listen(5000);
