module.exports = {
    apps: [{
      name: 'scheduler',
      script: './backend/server.js'
    }],
    deploy: {
      production: {
        user: 'root',
        host: '185.244.130.86',
        key: './.ssh/vpskey.pem',
        ref: 'origin/master',
        repo: 'git@github.com:dandelionn/scheduler.git',
        path: '/home/ubuntu/scheduler',
        'post-deploy': 'npm run install-dependencies && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }