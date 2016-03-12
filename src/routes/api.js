import express from 'express';

let api = express();

api.route('/')
	.get((req, res) => {
		res.status(200).json({hello: 'get api'});
	})
	.post((req, res) => {
		console.log(req.body);
		res.status(200).json({hello: 'post api'});
	});

export {api};