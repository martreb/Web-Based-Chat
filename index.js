//In Javascript, require is similar to import.
//Express is the library we will be using. It's documentation is availiable at https://expressjs.com/
const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const http = require("http");
const port = process.env.port || 3000;

//the list of the names of currently connected clients
var connectedClients = {};

//calling express creates a server. Right now the server is not listening to any port/url.
var app = express();
var server = http.Server(app);

//set up socket connections
var io = socket(server);

//handle incoming connections
io.on("connection", (sock) => {
    //give just the new user the list of connected people
    var names = "";
    for (addr in connectedClients) {
        names += connectedClients[addr] + " "
    }
    if (names.length < 1) {
        names = "You are the first to connect!";
    }
    sock.emit("message", { "text": names, "name": "Already Connected" })

    //add new client to list
    var name = sock.handshake.query.name;
    var address = sock.handshake.address;
    if (connectedClients[address]) {
        //already exists, changing name
        io.emit("message", { "text": "<em>changed their name to " + name, "name": connectedClients[address] });
    } else {
        //tell everybody who connected
        io.emit("message", { "text": "<em>joined the chat</em>", "name": name });
    }
    connectedClients[address] = name;

    //set up code to handle client disconnect
    sock.on("disconnect", () => {
        io.emit("message", { "name": connectedClients[address], "text": "<em>has left the chat.<em>" });
    });
});


//parse the body
app.use(bodyParser.urlencoded({
    extended: true
}));

//here we set the app to serve static files from the folder public.
app.use(express.static("public"));

app.post("/chat", (request, response) => {
    data = request.body;
    switch (data.query) {
        case "post":
            console.log(data);
            io.emit("message", { "text": data.message, "name": data.name })
            response.sendStatus(200);
            break;
        default:
            response.sendStatus(400);
    }
})

server.listen(port);
console.log("Server started.");