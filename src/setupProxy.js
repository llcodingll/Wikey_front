const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/register', '/login', '/api', '/logout'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );
};
