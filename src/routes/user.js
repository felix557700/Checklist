import express from 'express';
import {Router} from 'express';
import {OK, NO_CONTENT, BAD_REQUEST, FORBIDDEN, CONFLICT} from './es6-http-status-codes';
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import { v4 as uuid} from 'node-uuid'
import UserService from './../service/UserService'

let user = new Router();
let userService = new UserService();

let secret = process.env.SECRET || 'here is my secret';

user.put('/login', (request, response) => {
	let {name, password, rememberMe} = request.body;

	if (!name || !password) {
		response.sendStatus(BAD_REQUEST);
		return;
	}

	userService
		.findUser(name)
		.then(user => {
			if (!user) {
				response.sendStatus(BAD_REQUEST);
				return;
			}

			if (bcrypt.compareSync(password, user.password)) {
				// TODO filip(17/04/2016): improve when user try to login from different devices

				let expire = rememberMe ? '30 days' : '1 day';
				let userData = {name: user.name};
				let issuedToken = jwt.sign(userData, secret, {expiresIn: expire, jwtid: name + uuid()});

				response.status(OK).json({user: userData, token: issuedToken});
			} else {
				response.sendStatus(FORBIDDEN);
			}
		})
		.catch(error => response.sendStatus(BAD_REQUEST));
});


//user.put('/logout', (request, response) => {
//	let {name} = request.body;
//
//	if (!name) {
//		response.sendStatus(BAD_REQUEST);
//	}
//
//	//userService
//	//	.findUser(name)
//	//	.then(value => {
//	//		//unset session / token !!!
//	//		response.status(OK).json(value);
//	//	})
//	//	.catch(() => {
//	//		response.sendStatus(BAD_REQUEST);
//	//	})
//	response.sendStatus(OK);
//});


user.post('/register', (request, response) => {
	let {name, password} = request.body;

	if (!name || !password) {
		response.sendStatus(BAD_REQUEST);
	}

	userService
		.findUser(name)
		.then(user => {
			if (!user) {
				let hashPassword = bcrypt.hashSync(password);

				userService
					.addUser(name, hashPassword)
					.then(user => response.status(OK).json({name: name}))
					.catch(error => response.sendStatus(BAD_REQUEST));
			} else {
				response.sendStatus(CONFLICT);
			}
		})
		.catch(error => response.sendStatus(BAD_REQUEST))
});

export {user}
