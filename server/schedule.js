const schedule = require('node-schedule');
const test = require('./schedules/access_log');

schedule.scheduleJob(test.interval, test.handler);