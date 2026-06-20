const Sentry = require('@sentry/node');

function initSentry(app) {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) {
    console.log('Sentry: DSN non configuré, monitoring désactivé');
    return;
  }

  Sentry.init({ dsn, environment: process.env.NODE_ENV || 'development' });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.errorHandler());
  console.log('Sentry: monitoring activé');
}

module.exports = { initSentry };
