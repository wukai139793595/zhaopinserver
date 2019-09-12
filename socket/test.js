module.exports = function (server) {
    const io = require('socket.io')(server);
    io.on('connection', function (socket) {
        console.log('客户端连接')
        socket.on('clientMsg', function (data) {
            console.log('接收客户的消息', data)
            data = data.toUpperCase();
            io.emit('serverMsg', data);
        })
    })
}