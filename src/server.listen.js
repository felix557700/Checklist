import http from 'http';

export default function (app) {
	let server = http.createServer(app);
	let port = process.env.PORT || 3000;
	server.listen(port, () => {
		console.log('Server is listening localhost:3000');
});
}