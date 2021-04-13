const compose = require('koa-compose');

const UserRoute = require('./user');
const CategoryRoute = require('./category');
const ListRoute = require('./list');
const conversionRoute = require('./conversion');

registerRouter = () => {
  let routers = [];
  routers.push(UserRoute.routes());
  routers.push(UserRoute.allowedMethods());

  routers.push(CategoryRoute.routes());
  routers.push(CategoryRoute.allowedMethods());

  routers.push(ListRoute.routes());
  routers.push(ListRoute.allowedMethods());

  routers.push(conversionRoute.routes());
  routers.push(conversionRoute.allowedMethods());

  return compose(routers);
};

module.exports = registerRouter;
