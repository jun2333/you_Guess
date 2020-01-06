const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
	pm2: true,
	disableClustering: true,
	appenders: {
		access: {
			type: 'dateFile',
			compress: true, // 缩成.gz格式
			pattern: '-yyyy-MM-dd.log',//通过日期分割文件
			alwaysIncludePattern: true, //文件名始终以日期区分
			filename: path.join('logs/', 'access.log'),
			keepFileExt: true,//切割的日志保留文件拓展名，false(默认)
		},
		application: {
			type: 'dateFile',
			// alwaysIncludePattern: true, // 代表在最新的一个日志文件里追加日志(默认是在application.log文件写入内容)
			// daysToKeep: 5, // 大于0则会删除x天之前的日志
			pattern: '-yyyy-MM-dd.log', // yyyy-MM-dd-hh-mm=>每分钟切割一次 yyyy-mm-dd-hh =>每小时
			alwaysIncludePattern: true, //文件名始终以日期区分
			filename: path.join('logs/', 'application.log'),
			keepFileExt: true,
		},
		out: {
			type: 'console'
		}
	},
	categories: {
		default: { appenders: ['out'], level: 'info' },
		access: { appenders: ['access'], level: 'info' },
		application: { appenders: ['application'], level: 'all' }
	}
});
const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'));
const logger = log4js.getLogger('application');

module.exports = {
	accessLogger,
	logger
}

