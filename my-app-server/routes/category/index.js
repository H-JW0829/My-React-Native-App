const router = require('koa-router')();

const Category = require('../../models/category');

router.prefix('/api/category');

router.get('/getAll', async (ctx, next) => {
  try {
    const categories = await Category.find({});
    ctx.body = {
      code: 0,
      data: {
        categories,
      },
      msg: 'success',
    };
  } catch (e) {
    throw e;
  }
});

router.post('/add', async (ctx, next) => {
  try {
    const { icon, title, backgroundColor } = ctx.request.body;
    const category = await Category.findOne({ title });
    if (category) {
      ctx.body = {
        code: 1,
        msg: '该分类已存在',
        data: {},
      };
      return;
    }
    const newCategory = new Category({
      icon,
      title,
      backgroundColor,
    });

    await newCategory.save();
    ctx.body = {
      code: 0,
      data: {},
      msg: '创建成功',
    };
  } catch (e) {
    throw e;
  }
});

module.exports = router;
