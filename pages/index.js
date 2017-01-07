$(function(){
    var socket = io.connect();

    // 接続時の動作
    socket.on('user connected', function (data) {
        $('span').html(data);
    });

    // 切断時の動作
    socket.on('user disconnected', function (data) {
        $('span').html(data);
    });

    $("#reload").click(function(){
        location.reload();
    });

    $("#exit").click(function(){
        open(location, '_self').close();
        window.close();
        window.top.close();
    });
});
