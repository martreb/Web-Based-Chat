//In Javascript, require is similar to import.
//Express is the library we will be using. It's documentation is availiable at https://expressjs.com/
const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const http = require("http");
const port = process.env.port || 3000;

//calling express creates a server. Right now the server is not listening to any port/url.
var app = express();
var server=http.Server(app);

//set up socket connections
var io = socket(server);
io.on("connection",(sock)=>{
    console.log("New client connected.");
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
        case "new user":
            io.emit("message",{"text":"<em>joined the chat</em>","name":data.name});
            break;
        case "post":
            console.log(data);
            io.emit("message",{"text":data.message,"name": data.name})
            response.sendStatus(200);
            break;
        default:
            response.sendStatus(400);
    }
})

server.listen(port);
console.log("Server started successfully.");