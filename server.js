const server = require("express")();
const logger = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const express = require("express");

const PORT = 5000;
const api = require("./app");

server.use(logger(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(fileUpload());

server.use("/wayfinder-api", api);

// to serve images and videos
server.use(express.static(__dirname + "/fileUploads"));

server.listen(PORT, () => {
  console.log("server is listening the port", PORT);
});
