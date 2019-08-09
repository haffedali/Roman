var express = require("express");
var path = require("path");


var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

// Single route to serve index.html
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'index.html'))
  })

// Start our server so that it can begin listening to client requests.
const server = app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });