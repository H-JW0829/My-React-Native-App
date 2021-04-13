class HttpException extends Error {
  constructor(msg = '服务器异常', code = 500) {
    super();
    this.msg = msg;
    this.code = code;
  }
}

module.exports.HttpException = HttpException;
