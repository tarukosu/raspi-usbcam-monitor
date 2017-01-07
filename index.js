var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");
var ejs = require('ejs');

/* app settings */
var PORT = 4000;
var TIMEOUT = 5000;

var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8"); 
     res.end(output);
}).listen(process.env.APP_PORT || PORT);

var io = socketio.listen(server);

var connection = 0;
var to;

var isStreaming = false;

var startCamera = function(){
    if(isStreaming){
        return;
    }
    isStreaming = true;

    // start streaming
}

var stopCamera = function(){
    isStreaming = false;

    //stop streaming
}

io.sockets.on("connection", function (socket) {
    connection ++;
    startCamera();
    console.log("connected: " + connection);

    clearTimeout(to);
    to = setTimeout(function () {
        console.log("timeout");
        stopCamera();
    }, TIMEOUT);

    io.sockets.emit('user connected', connection);
 
    socket.on('disconnect', function () {
        connection--;
        if(connection == 0){
            stopCamera();
        }
        io.sockets.emit('user disconnected', connection);
    });
});