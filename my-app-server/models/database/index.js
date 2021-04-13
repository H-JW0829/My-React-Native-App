const mongoose = require('mongoose');

const { mongoURI } = require('../../config/globalVar');

module.exports = db = {
  connect: function () {
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log('数据库连接成功！');
      })
      .catch((err) => {
        console.log('数据库连接失败: ', err);
      });
  },
};
