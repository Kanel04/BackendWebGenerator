
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
require('dotenv').config({path:"config.env"});
// const connectDB = require("./src/config/db");
const app = express();
const PORT = process.env.PORT ||5000 ;

// connectDB();
const { createFolder } = require("./src/utils/os");
const { connect } = require('http2');

//connexion à la base de donnée
const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb://localhost:27017'
const dbName = 'dbmongo';

MongoClient.connect(url, function (err, client) {
    console.log("Connecté à MongoDB");
    const db = client.db(dbName);
    client.close();
});
// connexion à mongoose 
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dbmongo', { useNewUrlParser: true, useUnifiedTopology: true });

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connecté à Mongoose")
});

app.use(cors());
app.use(express.json());

app.use("/api/auth" , require("./src/routes/auth"));

app.get("/api/createProject", (req, res) => {
    res.send({
        hello: "World"
    })
})

app.post("/api/createProject", (req, res) => {
    createFolder(req.body.project)
    res.send({
        message: "Your project is created"
    })
})


const server = app.listen(PORT, () =>
    console.log(`Notre seveur démarre sur localhost:${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
