const router = require('koa-router')();

const User = require('../../models/user');

router.prefix('/api/user');

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: {},
    msg: 'success',
  };
});

router.post('/register', async (ctx, next) => {
  try {
    // todo 数据校验;
    const { tel, nickname, password, avatar } = ctx.request.body;
    const user = await User.findOne({ tel }); //根据手机号查找用户，判断是否已经注册过
    if (user) {
      ctx.body = {
        code: 1,
        msg: '手机号已注册',
        data: {},
      };
    } else {
      const user = new User({
        tel,
        nickname,
        password,
        avatar,
      });
      await user.save();
      ctx.body = {
        code: 0,
        msg: '注册成功',
        data: {},
      };
    }
  } catch (error) {
    throw error;
  }
});

router.post('/login', async (ctx, next) => {
  try {
    //todo 数据校验
    const { tel, password } = ctx.request.body;
    const user = await User.findOne({ tel }); //按手机号查找用户，看是否已注册
    if (!user) {
      ctx.body = {
        code: 1,
        msg: '手机号还未注册',
        data: {},
      };
      return;
    }
    const flag = user.password === password; //和数据库存储的密码比较
    if (flag) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        data: {
          _id: user._id,
          nickname: user.nickname,
          avatar: user.avatar,
          tel: user.tel,
        },
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '密码错误',
        data: {},
      };
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
