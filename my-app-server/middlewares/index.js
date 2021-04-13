const { HttpException } = require('../utils/class');

const catchGlobalError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    return (ctx.body = {
      code: 1,
      data: {},
      msg: error.msg || '服务器错误',
    });
  }
};

module.exports.catchGlobalError = catchGlobalError;
