## 安装依赖
```bush
// install dependencies
npm install
```
## 启动
### Development
```bush
node start.js
```

## 部署
git push 推送到github或者码云上
pm2 deploy pm2/app.config.js production setup 第一次从github上拉取到服务器
pm2 deploy pm2/app.config.js production 部署并运行 看到 success

## 简介
&emsp;&emsp;基于node.js框架koa的web项目...


## 文件结构
```shell
.
├── config  项目配置
├── controlers  控制器
├── database  数据库初始化
├── logs  日志
├── middleware  中间件
├── models  模型
├── pm2  pm2启动文件
├── public  静态资源
├── routes  路由
├── schedules  首页
├── services  服务
├── test  单元测试
├── utils  工具类
├── app.js  程序入口文件
├── logger.js  日志配置文件
├── package.json  包描述文件
├── README.md  项目帮助文档
├── schedule.js  定时任务注册
└── start.js  应用启动文件
```

