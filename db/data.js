// 1、引入mongoose
const mongoose = require('mongoose')
// 2、连接数据库
mongoose.connect('mongodb://localhost:27017/zhipin_test');
//  3、获取连接对象
const oMongo = mongoose.connection;
//  4、绑定连接完成的监听
oMongo.on('connected', function () {
    console.log('连接成功')
})

//   得到对应集合的Model
// 1、字义Schema
const oSchema = mongoose.Schema({
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
    },
    header: {
        type: String
    }

})
//   2.定义Model
const User = mongoose.model('user', oSchema);
//   通过Model或其实例对集合数据进行CRUD操作
// 1、通过Model实例的save()添加数据
function save() {
    const oUser = new User({
        username: 'wk',
        password: '123',
        usertype: 'biggod'
    })
    oUser.save(function (error, data) {
        console.log(`error:${error};data:${data}`)
    })
}
// save();
// 2、通过Model的find()/findOne()查询多个或一个数据

function find() {
    User.find({
        username: 'wukai'
    }, function (error, data) {
        console.log('finderror', error, 'finddata', data)
    })
    User.findOne({
        username: 'wk'
    }, function (error, data) {
        console.log('findOne', error, 'data', data)
    })
}
find();

// 3. 通过Model的findByIdAndUpdate()更新某个数据

function update() {
    User.findOneAndUpdate({
        _id: '5d6dcfc9e9c7392354c9d10c'
    }, {
        username: 'wukai'
    }, function (error, data) {
        console.log('findOneAndUpdate', 'error', error, 'data', data)
    })
}
// update();

// 通过Model的remove()删除匹配的数据
function remove() {
    User.remove({
        username: 'wk'
    }, function (error) {
        console.log('remove', error)
    })
}
// remove();