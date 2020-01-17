
const LogServer = require('../services/log.js');

class ReadLog {
    static async query(ctx) {
        let fileName = ctx.params.name;
        let fileDate = ctx.params.time;
        fileDate = fileDate.replace(/\//g, '-');
        let fullName = `${fileName}-${fileDate}`;
        try {
            const myLogServer = new LogServer(fullName)
            let res = await myLogServer.readLog();
            ctx.success(res);
        } catch (err) {
            ctx.app.logger.error(err);
            ctx.status = 404;
        }
    }
};

module.exports = ReadLog;