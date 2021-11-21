'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (ctx.session.id) {
      await next();
    } else {
      return ctx.fail(1000, '未登录');
    }
  };
};
