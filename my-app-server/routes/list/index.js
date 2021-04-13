const router = require('koa-router')();

const User = require('../../models/user');
const Category = require('../../models/category');
const List = require('../../models/list');
const Listing = require('../../models/list');

router.prefix('/api/list');

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 0,
    data: {},
    msg: 'success',
  };
});

router.get('/getAll', async (ctx, next) => {
  try {
    const lists = await List.find({}).populate('category user');

    ctx.body = {
      code: 0,
      data: { lists },
      msg: 'success',
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
});

router.post('/add', async (ctx, next) => {
  try {
    // todo 数据校验;
    const { images, title, price, category, desc, user } = ctx.request.body;

    const _user = await User.findById(user);
    const _category = await Category.findById(category);
    // console.log(_category);
    const newList = new List({
      images,
      title,
      price,
      desc,
      category: _category._id,
      user: _user._id,
    });
    await newList.save();
    ctx.body = {
      code: 0,
      data: {},
      msg: '创建成功',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.post('/getMyList', async (ctx, next) => {
  try {
    // todo 数据校验;
    const { user } = ctx.request.body;
    console.log(user);
    const lists = await List.find({ user }).populate('user');
    console.log(lists);
    ctx.body = {
      code: 0,
      data: { lists },
      msg: '创建成功',
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = router;
