const Service = require('egg').Service;

class UserService extends Service {
  async findByAcc(acc) {
      console.log(this.ctx.model.User)
    const user = await this.ctx.model.User.findOne({
        where: {
            state: 0,
            acc
        }
    })
    return user? user.dataValues : null;
  }
}

module.exports = UserService;