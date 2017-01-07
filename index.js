var http = require("http");
var socketio =  require("socket.io");
var fs = require("fs");
var ejs = require('ejs');
var exec = require('child_process').exec;


/* app settings */
var PORT = 8127;
var TIMEOUT = 50 * 1000;
var CAMERA_PORT = 8128;
var PAGE_HOST = "leafeon.local";

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    //var output = fs.readFileSync("./index.html", "utf-8"); 
    var ejsPage = fs.readFileSync("./index.ejs", "utf-8"); 
    var output = ejs.render(ejsPage, {stream_url: "http://" + PAGE_HOST + ":" + CAMERA_PORT + "/?action=stream"});
    res.end(output);
}).listen(process.env.APP_PORT || PORT);

var io = socketio.listen(server);

var connection = 0;
var to;

var isStreaming = false;

var startStreaming = function(){
    console.log("start streaming");
    exec('./scripts/start_streaming.sh -p ' + CAMERA_PORT, (err, stdout, stderr) => {
	if (err) { console.log(err); }
	console.log(stdout);
    });
}

var stopStreaming = function(){
    isStreaming = false;
    exec('./scripts/stop_streaming.sh', (err, stdout, stderr) => {
	console.log("stop streaming");
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
});
