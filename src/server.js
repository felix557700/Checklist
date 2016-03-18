import startServer from './server.listen';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import {router} from './routes/api';
import MongoDb from './db'

const app = express();

app.use(express.static(__dirname + '../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(logger('dev'));

app.use('/api', router);

app.get('/', (req, res) => {
	res.status(200).json({hello: 'hello world'});
});

new MongoDb().connectToMongo()
	.then(() => startServer(app))
	.catch(() => process.exit(1));

exports = module.exports = app;