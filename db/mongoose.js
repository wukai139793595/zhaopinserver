// 1.1.引入 mongoose 
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
// 1.2.连接指定数据库(URL 只有数据库是变化的) 
mongoose.connect('mongodb://localhost:27017/zhipin_test');
// 1.3.获取连接对象 
const oConnect = mongoose.connection;
// 1.4.绑定连接完成的监听(用来提示连接成功)
oConnect.on('connected', function () {
    console.log('连接数据库mongodb成功！！！')
})

// 2. 得到对应特定集合的 Model 
// 2.1.字义 Schema(描述文档结构) 
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    usertype: {
        type: String,
        require: true
    }, //用户类型
    header: {
        type: String
    }, // 头像名称
    post: {
        type: String
    }, // 职位
    info: {
        type: String
    }, // 个人或职位简介
    company: {
        type: String
    }, // 公司名称
    salary: {
        type: String
    } // 月薪
})
// 2.2.定义 Model(与集合对应, 可以操作集合)
const UserModal = new mongoose.model('user', userSchema);

exports.UserModal = UserModal;

const ChatSchema = mongoose.Schema({
    from: {
        type: String,
        require: true
    },
    to: {
        type: String,
        require: true
    },
    chat_id: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        default: false
    },
    create_time: {
        type: Number
    }
})
const ChatModal = mongoose.model('chat', ChatSchema);
exports.ChatModal = ChatModal;