'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async getAll() {
    return [
        {name:'bob'}
    ]
  }
}

module.exports = UserService;
