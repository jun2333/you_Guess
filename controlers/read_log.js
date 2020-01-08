

function formatLine(line) {
    let lineArr = line.split(' '),
        date = lineArr[0].replace(/[|]/g, ''),
        ip = lineArr[4],
        method = lineArr[5],
        url = lineArr[6],
        status = lineArr[7],
        time = lineArr[8];
    return { date, ip, method, url, status, time }
}

function readLog(fileName) {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        const readline = require('readline');
        let filePath = process.cwd() + `/logs/${fileName}.log`;
        if (!fs.existsSync(filePath)) return reject(new Error(`no such file "${filePath}"`));
        let input = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: input
        });
        let logArr = [];
        rl.on('line', line => { // 每读取一行，都触发此监听事件
            if (line.includes('[INFO]')) {
                logArr.push(formatLine(line));
            }
        });
        rl.on('close', () => { // 读取完毕之后触发
            // console.log(logArr);
            resolve(logArr);
        });
    })
}

class ReadLog {
    static async line(ctx) {
        let fileName = ctx.params.name;
        let fileDate = ctx.params.time;
        fileDate = fileDate.replace(/\//g, '-');
        let fullName = `${fileName}-${fileDate}`;
        try {
            let res = await readLog(fullName);
            ctx.success(res);
        } catch (err) {
            ctx.app.logger.error(err);
            ctx.status = 404;
        }
    }
};

module.exports = ReadLog;