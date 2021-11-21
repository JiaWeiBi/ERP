'use strict';

module.exports = {
  success(param) {
    this.body = {
      code: 200,
      data: param,
    };
  },

  fail(code, msg) {
    this.body = {
      code: code || -1,
      msg: msg || '请求失败',
      data: null,
    };
  },
};
