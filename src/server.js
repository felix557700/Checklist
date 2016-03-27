import startServer from './server.listen';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import {router} from './routes/api';
import MongoDb from './db'

const app = express();

app.use(express.static(__dirname + '/../frontend-public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(compression());
app.disable("x-powered-by");

app.use('/api', router);

new MongoDb().connectToMongo()
	.then(() => startServer(app))
	.catch(() => process.exit(1));

exports = module.exports = app;
