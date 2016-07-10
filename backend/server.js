import startServer from './server.listen';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import expressJwt from 'express-jwt';
import {router} from './routes/api';
import {user} from './routes/user';
import MongoDb from './db'

const app = express();
let secret = process.env.SECRET || 'here is my secret';

app.use(compression());
app.use(express.static(__dirname + '/../frontend_public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.disable("x-powered-by");

app.use(expressJwt({secret: secret}).unless(
	{
		path: [
			'/api/users/login', '/api/users/register', /.*\.html/, /.*\.js/, /.*\.css/, /.*\.ico/,
			{url: '/', methods: ['GET', 'PUT']}
		]
	}
));

app.use(function (error, request, response, next) {
	if (error.name === 'UnauthorizedError') {
		response.status(401).json({message: 'unauthorized'});
	} else if (error) {
		response.status(400).json({message: 'bad request'});
	}
});

app.use(function (request, response, next) {
	response.setHeader('x-frame-options', 'SAMEORIGIN');
	response.setHeader('X-XSS-Protection', '1; mode=block');
	response.setHeader('X-Content-Type-Options', 'nosniff');
	next();
});

app.use('/api', router);
app.use('/api/users', user);
app.use('/*', function (request, response) {
	response.redirect('/')
});

new MongoDb().connectToMongo()
	.then(() => startServer(app))
	.catch(() => process.exit(1));

exports = module.exports = app;
