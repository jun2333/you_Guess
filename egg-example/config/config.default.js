/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574760848022_6419';

  // add your middleware config here
  config.middleware = ['report', 'reportError', 'login', 'gzip', 'compress'];

  //配置静态文件地址
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public')
  }

  //配置数据库
  config.sequelize = {
    dialect:'mysql',
    host:'127.0.0.1',
    password: '123456',
    port:3306,
    database:'egg-sequelize-doc-default'
  }

  //线上发生错误时，重定向到这个页面
  config.onerror = {
    // errorPageUrl:'/50x.html',
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error';
      ctx.status = 500;
    },
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  }

  config.gzip = {
    threshold: 1024,//小于1k不压缩
  }
  //配置登录拦截中间件
  config.login = {
    enable: false,
    whiteUrl:[
      '/login'
    ]
  }

  config.compress = {
    enable: true,
    threshold: 2048,
  }
  //配置logger
  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs/applogs')
  }
  //配置session
  config.session = {
    key: 'egg_sess',
    maxAge: 60 * 1000,
    httpOnly: true,
    signed:true
  }
  //关闭csrf
  config.security = {
    csrf: false
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
