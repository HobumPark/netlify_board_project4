const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/board', {
			target: 'http://mynodetest.cafe24app.com', 
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/*', {
			target: 'http://mynodetest.cafe24app.com', 
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/insert', {
			target: 'http://mynodetest.cafe24app.com', 
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/delete/*', {
			target: 'http://mynodetest.cafe24app.com', 
			changeOrigin: true,
		})
	);

	app.use(
		createProxyMiddleware('/board/update/*', {
			target: 'http://mynodetest.cafe24app.com', 
			changeOrigin: true,
		})
	);
};