const app = require('../app');
const http = require('http');
const request = require('supertest');
const assert = require('assert');

describe('#http-test', () => {

    let server;

    before(() => {//执行测试用例前开启服务器
        server = http.createServer(app.callback()).listen(9900);
    });
    after(() => {//执行完后关闭服务器监听
        server.close();
    });

    describe('#test-server', () => {
        it('#test get api/user', async () => {
            await request(server)
                .get('/api/user')
                .expect(401);
        })
        it('#test post api/login', async () => {
            let res = await request(server)
                .post('/api/login')
                .expect(200);
            assert.strictEqual(res.body.status, 400);
            res = await request(server)
                .post('/api/login')
                .send({ userName: 'jun2333', password: '123123' })
                .expect(200);
            // console.log(res.headers);
            assert.strictEqual(res.body.status, 1);
            let cookie = res.headers['set-cookie'];//登录成功后获取cookie用于后面接口测试
            //测试查询接口
            res = await request(server)
                .get('/api/user')
                .set('Cookie', cookie);
            // console.log(res.body);
            assert.strictEqual(res.body.status, 1);
            //测试上传接口
            res = await request(server)
                .post('/api/upload')
                .set('Content-Type', 'multipart/form-data')
                .attach('file', '111.png')
                .expect(200);
            assert.strictEqual(res.body.status, 1);
        }).timeout(10000);
    })
})