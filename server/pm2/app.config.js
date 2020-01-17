module.exports = {
  apps: [{
    name: 'app',
    script: 'start.js',
    args: 'one two',
    error_file: "./logs/pm2/err.log",
    out_file: "./logs/pm2/out.log",
    log_date_format: "YYYY-MM-DD HH:mm Z",
    instances: 2,
    instance_var: "INSTANCE_ID",
    exec_mode: "cluster",
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: '192.168.61.108',
      ref: 'origin/koa-pro',
      repo: 'https://github.com/jun2333/you_Guess.git',
      path: '/root/www/koa-pro',
      'post-deploy': 'npm install && pm2 reload pm2/app.config.js --env production && pm2 reload pm2/schedule.config.js'
    }
  }
};
