/*
var app = require('express').createServer();
var io = require('socket.io').listen(app);
 
// カウンタ初期化
var count = 0;
app.listen(8124);
 
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
 
io.sockets.on('connection', function (socket) {
 
    // 接続時にカウンタのインクリメント
    count++;
 
    // ブロードキャストで送信
    io.sockets.emit('user connected',count);
 
    // 切断
    socket.on('disconnect', function () {
 
        // カウンタのデクリメント
        count--;
 
        // ブロードキャストで送信
        io.sockets.emit('user disconnected',count);
    });
});
*/
var http = require("http");
var socketio = require("socket.io");
var fs = require("fs");

var server = http.createServer(function(req, res) {
     res.writeHead(200, {"Content-Type":"text/html"});
     var output = fs.readFileSync("./index.html", "utf-8"); 
     res.end(output);
}).listen(process.env.APP_PORT || 4000);

var io = socketio.listen(server);

var connection = 0;

var to;

io.sockets.on("connection", function (socket) {
    connection ++;
    console.log("connected: " + connection);

    clearTimeout(to);
    to = setTimeout(function () {
        console.log("timeout");
    }, 5000);

    // ブロードキャストで送信
    io.sockets.emit('user connected', connection);
 
    // 切断
    socket.on('disconnect', function () {
         // カウンタのデクリメント
        connection--;
         // ブロードキャストで送信
        io.sockets.emit('user disconnected', connection);
    });
    /*
  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", function (data) {
    io.sockets.emit("S_to_C_message", {value:data.value});
  });

  // ブロードキャスト（送信者以外の全員に送信）
  socket.on("C_to_S_broadcast", function (data) {
    socket.broadcast.emit("S_to_C_message", {value:data.value});
  });

  // 切断したときに送信
  socket.on("disconnect", function () {
    connection --;
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
  */
});