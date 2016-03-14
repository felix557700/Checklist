import express from 'express';
import UserService from './../service/user'

let api = express();
let userService = new UserService();

api.route('/')
	.get((req, res) => {
		userService.findAll()
			.then(value => {
				res.status(200).json(value);
			})
	})
	.post((req, res) => {
		console.log(req.body);
		res.status(200).json({hello: 'post api'});
	});

api.route('/checklist')
	.get((req, res) => {
		res.status(200).json({hello: 'get api'});
	})
	.post((req, res) => {
		console.log(req.body);
		res.status(200).json({hello: 'post api'});
	});

export {api};