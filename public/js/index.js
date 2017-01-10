$(function(){
    var path = $('#stream-video').attr("src");
    var newPath = path.replace(/hostname/, location.hostname);
    $('#stream-video').attr("src", newPath);

    var socket = io.connect();

    // 接続時の動作
    socket.on('user connected', function (data) {
        $('#connection').text(data);
    });

    // 切断時の動作
    socket.on('user disconnected', function (data) {
        $('#connection').html(data);
    });

    socket.on('streaming status', function (data) {
        if(data){
            $('#streaming').html("動作中");
        }else{
            $('#streaming').html("停止中");
        }
    });

    $("#reload").click(function(){
        location.reload();
    });

    $("#stop").click(function(){
        socket.emit("stop streaming");
    });
});
