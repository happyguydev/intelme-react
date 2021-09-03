const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://dev.intelme.com.au/',
      changeOrigin: true,
    })
  );
};
