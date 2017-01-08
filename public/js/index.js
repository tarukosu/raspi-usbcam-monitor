$(function(){
    var path = $('#stream-video').attr("src");
    var newPath = path.replace(/hostname/, location.hostname);
    $('#stream-video').attr("src", newPath);

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

    $("#stop").click(function(){
        socket.emit("stop streaming");
    });
});
