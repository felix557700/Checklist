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

app.use(express.static(__dirname + '/../frontend_public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(compression());
app.disable("x-powered-by");

app.use(expressJwt({secret: secret}).unless({path: ['/api/users/login', '/api/users/register', '*.html', '*.js', '*.css', '*.ico']}));

app.use(function (error, request, response, next) {
	if (error.name === 'UnauthorizedError') {
		response.status(401).json({message: 'unauthorized'});
	} else if (error) {
		response.status(400).json({message: 'bad request'});
	}
});

app.use('/api', router);
app.use('/api/users', user);

new MongoDb().connectToMongo()
	.then(() => startServer(app))
	.catch(() => process.exit(1));

exports = module.exports = app;
