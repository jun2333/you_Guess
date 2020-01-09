const logModel = require('../models/Log');
const fs = require('fs');
const readline = require('readline');
const { formatTime } = require('../utils');

class LogServer {
    constructor(fileName) {
        this.filePath = process.cwd() + `/logs/${fileName}.log`;
        this.logArr = [];
    }
    formatLine(line) {
        let lineArr = line.split(' '),
            date = lineArr[0].replace(/\[|\]/g, ''),
            ip = lineArr[4],
            method = lineArr[5],
            url = lineArr[6],
            status = lineArr[7],
            time = lineArr[8];
        return { date, ip, method, url, status, time }
    }
    readLog() {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(this.filePath)) return reject(new Error(`no such file "${this.filePath}"`));
            let input = fs.createReadStream(this.filePath);
            const rl = readline.createInterface({
                input: input
            });
            rl.on('line', line => { // 每读取一行，都触发此监听事件
                if (line.includes('[INFO]')) {
                    this.logArr.push(this.formatLine(line));
                }
            });
            rl.on('close', () => { // 读取完毕之后触发
                resolve(this.logArr);
            });
        })
    }
    async saveLog() {
        try {
            await this.readLog();
            await logModel.insertMany(this.logArr);
            return `${formatTime(Date.now(), '-', true)}：import successed`;
        } catch (err) {
            return `${formatTime(Date.now(), '-', true)} import failed ${err}`;
        }
    }
}

module.exports = LogServer;