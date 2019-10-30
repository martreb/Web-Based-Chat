//In Javascript, require is similar to import.
//Express is the library we will be using. It's documentation is availiable at https://expressjs.com/ 
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
//calling express creates a server. Right now the server is not listening to any port/url.
var app = express();

//parse the body
app.use(bodyParser.raw());

//here we set the app to serve static files from the folder public.
app.use(express.static("public"));

app.get("/chat", (request, response) => {
    console.log("Recieving Get Request");
    console.log(request.body);
    response.send("Hello World");
})

app.listen(port);