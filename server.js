const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const routes = require("./routes/api");
const connection = require("./database/dbConnection");

const app = express();
const PORT = 12345; // TODO change for final

// connect to database
connection.connect( err => {
    err? console.log(err) : console.log("SERVER is connected to the database");
});

// Middleware
app.use(express.json()); // parses json data
app.use(express.urlencoded({ extended: true })); // like body parser it parses the data
app.use(cors());
app.use("/api", function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });
app.use("/api", routes);

// process.on("SIGTERM")

// Start server
const server = app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
});

// Server Socket
const io = socket(server); // setup

io.on("connection", (client) =>{
  console.log(client.id); // part of logging middleware
  client.on("update", () =>{
    console.log(`Website updated by: ${client.id}`);
    io.emit("update");
  });
});