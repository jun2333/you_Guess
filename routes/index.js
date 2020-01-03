const Router = require('koa-router');
const userControler = require('../controlers/user');
const fileControler = require('../controlers/file');
const anthControler = require('../controlers/auth');
const logControler = require('../controlers/log');


const router = new Router();

//log
router.get('/api/log',logControler.all);

//auth
router.post('/api/login', anthControler.login);
router.post('/api/logout', anthControler.logout);

//user
router.get('/api/user/:name', userControler.findOne);
router.post('/api/user', userControler.createOne);
router.put('/api/user', userControler.updateOne);
router.delete('/api/user/:name', userControler.removeOne);
router.post('/api/user', userControler.create);
router.delete('/api/user', userControler.remove);
router.get('/api/user', userControler.findAll);

//file
router.post('/api/upload', fileControler.uploadFile);
router.get('/api/download/:name', fileControler.downloadFile);
router.get('/api/downloadAll', fileControler.downloadAll);
router.get('/api/export/:name',fileControler.exportUser);

module.exports = router