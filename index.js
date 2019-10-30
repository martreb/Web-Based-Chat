//In Javascript, require is similar to import.
//Express is the library we will be using. It's documentation is availiable at https://expressjs.com/
const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
//calling express creates a server. Right now the server is not listening to any port/url.
var app = express();

//parse the body
app.use(bodyParser.urlencoded({
    extended:true
}));

//here we set the app to serve static files from the folder public.
app.use(express.static("public"));

app.post("/chat", (request, response) => {
    console.log("Recieving Post Request");
    console.log(request.body);
    response.send("Hello World");
})

app.listen(port);