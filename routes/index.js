const Router = require('koa-router');
const UserControler = require('../controlers/user');
const FileControler = require('../controlers/file');
const AnthControler = require('../controlers/auth');
const LogControler = require('../controlers/log');


const router = new Router();

//log
router.get('/api/log',LogControler.all);

//auth
router.post('/api/login', AnthControler.login);
router.post('/api/logout', AnthControler.logout);

//user
router.get('/api/user/:name', UserControler.findOne);
router.post('/api/user', UserControler.createOne);
router.put('/api/user', UserControler.updateOne);
router.delete('/api/user/:name', UserControler.removeOne);
router.post('/api/user', UserControler.create);
router.delete('/api/user', UserControler.remove);
router.get('/api/user', UserControler.findAll);

//file
router.post('/api/upload', FileControler.uploadFile);
router.get('/api/download/:name', FileControler.downloadFile);
router.get('/api/downloadAll', FileControler.downloadAll);
router.get('/api/export/:name',FileControler.exportUser);

module.exports = router