import express from 'express';
import {Router} from 'express';

let auth = new Router();

auth.get('/auth', (request, response) => {
	authenticationService
		.findAll()
		.then(value => response.status(OK).json(value))
});

export {auth}
