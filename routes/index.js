var express = require('express');
var router = express.Router();
const {
  UserModal,
  ChatModal
} = require('../db/mongoose.js')
const filter = {
  password: 0,
  __v: 0
} //过滤查找的信息

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// 注册路由
router.post('/register', function (req, res, next) {
  const {
    username,
    password,
    password2,
    usertype,
    header,
    post,
    info,
    company,
    salary
  } = req.body;
  UserModal.findOne({
    username
  }, function (error, data) {
    if (error)
      throw error;
    if (data) {
      res.send({
        code: 1,
        msg: '用户已存在'
      })
    } else {

      const oUser = new UserModal({
        username,
        password,
        usertype,
      })
      oUser.save(function (error, data) {

        if (data) {
          res.cookie('userid', data._id, {
            maxAge: 1000 * 60 * 60 * 24
          })
          res.send({
            code: 0,
            data: {
              username: username,
              usertype: usertype,
              _id: data._id
            },
            msg: '注册成功'
          })
        }
      })
    }
  })
})

// 登录路由
router.post('/login', (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  UserModal.findOne({
    username,
    password
  }, filter, function (error, data) {

    if (data) {
      res.cookie('userid', data._id, {
        maxAge: 1000 * 60 * 60 * 24
      });
      res.send({
        code: 0,
        data: data,
        msg: '登录成功'
      })
    } else {
      res.send({
        code: 1,
        msg: '登录失败'
      })
    }
  })
})
// 根据userid获取用户信息
router.get('/getuser', (req, res, next) => {
  const userid = req.cookies.userid;

  UserModal.findOne({
    _id: userid
  }, filter, function (error, data) {
    if (data) {
      res.send({
        code: 0,
        data: data
      })
    } else {
      res.clearCookie('userid')
      res.send({
        code: 1,
        msg: '请登录'
      })
    }
  })
})
// 更新用户信息
router.post('/update', function (req, res, next) {
  const {
    userid
  } = req.cookies;
  const {
    user
  } = req.body;
  if (!userid) {
    res.send({
      code: 1,
      msg: '请先登录'
    })
  } else {
    UserModal.findByIdAndUpdate({
      _id: userid
    }, user, function (error, oldUser) {
      if (!oldUser) {
        res.clearCookie('userid')
      } else {
        const {
          username,
          usertype,
          _id
        } = oldUser;
        let data = Object.assign({
          username,
          usertype,
          _id
        }, user);
        res.send({
          code: 0,
          data: data
        })
      }
    })
  }
})

// 获取用户列表
router.post('/userlist', function (req, res, next) {
  const {
    usertype
  } = req.body;
  UserModal.find({
    usertype
  }, filter, function (error, userList) {
    if (userList) {
      res.send({
        code: 0,
        data: userList
      })
    } else {
      res.send({
        code: 1,
        msg: '请求错误'
      })
    }
  })
})
// 获取消息列表
router.get('/msglist', function (req, res) {
  const userid = req.cookies.userid;
  UserModal.find(function (error, userDocs) {
    const users = userDocs.reduce((users, user) => {
      users[user._id] = {
        username: user.username,
        header: user.header
      }
      return users
    }, {})
    ChatModal.find({
      '$or': [{
        from: userid
      }, {
        to: userid
      }]
    }, filter, function (error, chatMsgs) {
      console.log('users', users, "chatMsgs", chatMsgs)
      res.send({
        code: 0,
        data: {
          users,
          chatMsgs
        }
      })
    })
  })


})
module.exports = router;