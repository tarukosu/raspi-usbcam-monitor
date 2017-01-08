var fs = require("fs");
var ejs = require('ejs');
var exec = require('child_process').exec;
var express = require('express');
var app = express();
var http = require("http").Server(app);
var io =  require("socket.io")(http);

/* app settings */
var PORT = 8127;
var TIMEOUT = 50 * 1000;
var CAMERA_PORT = 8128;

app.engine('ejs',ejs.renderFile);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("index.ejs", {stream_url: "http://hostname:" + CAMERA_PORT + "/?action=stream"});
});

http.listen(process.env.APP_PORT || PORT);

var connection = 0;
var to;

var startStreaming = function(){
    console.log("start streaming");
    exec('./scripts/start_streaming.sh -p ' + CAMERA_PORT, (err, stdout, stderr) => {
	if (err) { console.log(err); }
	console.log(stdout);
	console.log(stderr);
    });
}

var stopStreaming = function(){
    console.log("stop streaming");
    exec('./scripts/stop_streaming.sh', (err, stdout, stderr) => {
	    if (err) { console.log(err); }
	    console.log(stdout);
    });
}

io.sockets.on("connection", function (socket) {
    connection ++;
    startStreaming();
    console.log("connected: " + connection);

    clearTimeout(to);
    to = setTimeout(function () {
        console.log("timeout");
        stopStreaming();
    }, TIMEOUT);

    io.sockets.emit('user connected', connection);
 
    socket.on('disconnect', function () {
        connection--;
        if(connection == 0){
            stopStreaming();
        }
        io.sockets.emit('user disconnected', connection);
    });

    socket.on('stop streaming', function(){
        stopStreaming();
    });
});
