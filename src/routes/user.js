import express from 'express';
import {Router} from 'express';
import {OK, NO_CONTENT, BAD_REQUEST, FORBIDDEN, CONFLICT, INTERNAL_SERVER_ERROR} from './es6-http-status-codes';
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
		response.sendStatus(BAD_REQUEST);
	}

	userService
		.findUser(name)
		.then(user => {
			if (!user) {
				response.sendStatus(BAD_REQUEST);
				return;
			}

			if (bcrypt.compareSync(password, user.password)) {
				// TODO filip(30/03/2016): save token in db / if token exist and not expired return token
				// if (user.token) jwt.verify -> if expired -> renew -> return token
				// else jwt.sign() -> return token + add to db async
				// TODO filip(30/03/2016): if expired issue new token / on logout invalidate token

				let userData = {name: user.name};
				let issuedToken = jwt.sign(userData, secret, {expiresIn: 24 * 60 * 60, jwtid: name + uuid()});

				response.status(OK).json({user: userData, token: issuedToken});
			} else {
				response.sendStatus(FORBIDDEN);
			}
		})
		.catch(error => response.sendStatus(INTERNAL_SERVER_ERROR));
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
//	//		response.sendStatus(INTERNAL_SERVER_ERROR);
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
		.catch(error => response.sendStatus(INTERNAL_SERVER_ERROR))
});

export {user}
