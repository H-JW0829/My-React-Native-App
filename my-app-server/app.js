const Koa = require('koa');
const app = new Koa();
const http = require('http');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const middlewares = require('./middlewares');
const cors = require('koa2-cors');
const koa_jwt = require('koa-jwt');
// const io = require('./bin/www');

const registerRouter = require('./routes');

const db = require('./models/database');

app.use(middlewares.catchGlobalError); //全局错误处理，一定要放在第一位
db.connect(); //连接数据库

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(cors());

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//一定要放在路由前面！！！！！
// app.use(
//   koa_jwt({
//     secret: key,
//   }).unless({
//     path: [
//       /\/api/,
//     ], //除了这个地址，其他的URL都需要验证
//   })
// );

// routes
app.use(registerRouter());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// server.listen(8001);
module.exports = app;
// app.listen(8001);
