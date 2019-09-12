const {
    ChatModal
} = require('../db/mongoose.js')
module.exports = function (server) {
    const io = require('socket.io')(server);
    io.on('connection', function (socket) {
        console.log('客户端连接')
        socket.on('clientMsg', function ({
            from,
            to,
            content
        }) {
            const chat_id = [from, to].sort().join('_');
            const create_time = Date.now()
            new ChatModal({
                from,
                to,
                content,
                chat_id,
                create_time
            }).save(function (error, data) {
                console.log('serverMsg', data)
                io.emit('serverMsg', data)
            })
        })
    })
}