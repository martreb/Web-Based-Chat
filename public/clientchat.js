//Javascript files run top-to-bottom at the time of their load.
//initialize user's name
var userName = prompt("Name:");
//userName evaluates to false while equal to 0, "", false, null, or undefined. In any of these cases, ask for a different name.
while (!userName) {
    userName = prompt("Invalid Name. \nName:");
}

//the $ represents Jquery, the library we are using.
//Post to server root, saying "we exist" and asking.
/*$.get parameters:
    -url, the url to make the request to. If no protocol (i.e. "http://"),
        sends relative to host (i.i "localhost:3000/")
    -data, data sent to the server.
*/
$.post("/chat", { "query": "new user", "name": name }).done((data) => {
    //handle success
    alert(data);
}).fail((data) => {
    //handle error
    alert(data);
});
