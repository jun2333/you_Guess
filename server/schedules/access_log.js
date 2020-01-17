const LogServer = require('../services/log.js');
const { formatTime } = require('../utils');

module.exports = {
    interval: '55 59 23 * * *',//每天23点将日志导入到数据库
    async handler() {
        let curDate = formatTime(Date.now(),'-');
        let fullName = `access-${curDate}`;
        const myLogServer = new LogServer(fullName);
        let res = await myLogServer.saveLog();
        console.log(res);//记录日志在pm2文件夹下
    }
}