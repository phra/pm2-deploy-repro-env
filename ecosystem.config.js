module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'API',
      script: 'dist/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_dev: {
        VAR: 'VAR',
        PORT: 4000
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'phra',
      host: 'localhost',
      ref: 'origin/master',
      repo: 'git@github.com:phra/pm2-deploy-repro-env.git',
      path: '/tmp/production',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production && printenv'
    },
    dev: {
      user: 'phra',
      host: 'localhost',
      ref: 'origin/master',
      repo: 'git@github.com:phra/pm2-deploy-repro-env.git',
      path: '/tmp/dev',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env dev && printenv',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
};
