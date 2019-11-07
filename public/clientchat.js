//Javascript files run top-to-bottom at the time of their load.
//initialize user's name
var userName = prompt("Name:");

//userName evaluates to false while equal to 0, "", false, null, or undefined. In any of these cases, ask for a different name.
while (!userName) {
    userName = prompt("Invalid Name. \nName:");
}

var socket = io("/",{query: "name="+userName});
console.log(socket);
//the $ represents Jquery, the library we are using.
//Post to server root, saying "we exist" and asking.
/*$.get parameters:
    -url, the url to make the request to. If no protocol (i.e. "http://"),
        sends relative to host (i.i "localhost:3000/")
    -data, data sent to the server.
*/
$.post("/chat", { "query": "new user", "name": userName }).done((data) => {
    //handle success
    alert(data);
}).fail((data) => {
    //handle error
    console.log("There was an error connecting to the server.");
});

/**
Handles logic for when the user enters a message
@param {String} msg- the text entered by this page's user
 */
function messageEntered(msg) {
    //Put server communication code here
    $.post("/chat", { "query": "post","name": userName, "message": msg }).done((data) => {
        //success
    }).fail((data) => {
        console.log(data);
    })
}

/**ß
Creates the HTML elements to display a message
@param {String} msg- message text
 */
function addMessage(msg) {
    var messageBox = document.getElementById("messages");
    //create and format div wrapper
    var wrapper = document.createElement("div");
    wrapper.className = "message";
    //create paragraph text element
    var text = document.createElement("p");
    text.innerHTML = msg;
    //add children
    wrapper.appendChild(text);
    messageBox.appendChild(wrapper);
}

var textInput = document.getElementById("textInput");

textInput.addEventListener("input", () => {
    var inputString = textInput.value;
    //check for newline. This expression looks really weird- take a look at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    newlines = (/(\n|\r)/g).test(inputString);
    if (newlines) {
        messageEntered(inputString);
        textInput.value = "";
    }
});

socket.on("message",(msg)=>{
    addMessage(msg.name+": "+msg.text);
});