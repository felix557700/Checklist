import http from 'http';

export default function startServer(app) {
	let server = http.createServer(app);
	let port = process.env.PORT || 3000;
	let hostname = 'localhost';
	server.listen(port, hostname, () => console.log(`Magic is happening on ${hostname}:${port}`));
}