module.exports = {
    keys: 'some secret',
    db: {
        host: '127.0.0.1',
        port: 27017,
        username: 'test-admin',
        password: '123456',
        database: 'test'
    },
    redisConf: {
        host: '127.0.0.1',
        port: 6379,
        options: {
            auth_pass: '123456'
        }
    },
    uploadConf: {
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024  //设置上传文件大小的最大限制，默认2M
        }
    },
    SESS_CONFIG: {
        key: 'koa:sess', // 配置cookie的key值
        maxAge: 60 * 60 * 1000, // 有效期
        httpOnly: true, // 服务器有效(开启后禁止前端操作cookie)
        signed: true, // 签名
    },
    authConf: {
        enable: true,
        white: ['/api/login', '/api/logout', '/api/upload', '/api/export/user']
    },
    logConf: {
        enable: true,
        whiteMethods: ['GET']
    },
    errConf: {
        enable: true,
    },
    crossConf: {
        enable: false,
        allowOrigin: ['*'],
        allowMethods: [],
        allowHeaders: [],
        allowCredentials: true,
    }
}