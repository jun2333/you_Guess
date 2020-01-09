module.exports = {
    apps: [{
        name: 'schedule',
        script: 'schedule.js',
        args: 'one two',
        //   error_file: "./logs/pm2/schedule.log",
        out_file: "./logs/pm2/schedule.log",
        log_date_format: "YYYY-MM-DD HH:mm Z",
        instances: 1,
        exec_mode: "fork",
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]
};
