import startServer from './server.listen';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import {api} from './routes/api';

const app = express();

app.use(express.static(__dirname + '../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(logger('dev'));

app.use('/api', api);

app.get('/', (req, res) => {
	res.status(200).json({hello: 'hello world'});
});

startServer(app);

exports = module.exports = app;
