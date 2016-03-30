import express from 'express';
import {Router} from 'express';
import {OK, NO_CONTENT, BAD_REQUEST} from './es6-http-status-codes';
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { v4 as uuid} from 'node-uuid'
import UserService from './../service/UserService'

let user = new Router();
let userService = new UserService();

let secret = process.env.SECRET || 'here is my secret';

user.put('/login', (request, response) => {
	let {name, password} = request.body;

	if (!name || !password) {
		response.status(BAD_REQUEST).json();
	}

	userService
		.findUser(name)
		.then(user => {
			if (compareSync(password, user.password)) {
				let data = {name: user.name};
				let myToken = jwt.sign(data, secret, {expiresIn: 24 * 60 * 60, jwtid: name + uuid()});

				response.status(OK).json({token: myToken});
			} else {
				response.status(BAD_REQUEST).json();
			}
		})
		.catch(error => {
			response.status(NOT_FOUND).json(error);
		})
});


//user.put('/logout', (request, response) => {
//	let {name} = request.body;
//
//	if (!name) {
//		response.status(BAD_REQUEST).json();
//	}
//
//	//userService
//	//	.findUser(name)
//	//	.then(value => {
//	//		//unset session / token !!!
//	//		response.status(OK).json(value);
//	//	})
//	//	.catch(() => {
//	//		response.status(BAD_REQUEST).json();
//	//	})
//	response.status(OK).json();
//});


user.post('/register', (request, response) => {
	let {name, password} = request.body;

	if (!name || !password) {
		response.status(BAD_REQUEST).json({});
	}

	let hashPassword = bcrypt.hashSync(password);

	userService
		.addUser(name, hashPassword)
		.then(result => {
			response.status(OK).json({name: result.name});
		})
		.catch(() => {
			response.status(CONFLICT).json();
		});
});


export {user}
