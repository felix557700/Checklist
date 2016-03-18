import express from 'express';
import {Router} from 'express';
import {OK, NO_CONTENT, UNAUTHORIZED} from './es6-http-status-codes';
import ChecklistService from './../service/user';

let router = new Router;
let checklistService = new ChecklistService();

router.get('/', (request, response) => {
	checklistService
		.findAll()
		.then(value => response.status(OK).json(value))
});

router.post('/checklist', (request, response) => {
	let name = request.body.name;

	checklistService
		.createNewChecklist(name)
		.then(() => response.status(OK).end())
		.catch(() => response.status(UNAUTHORIZED).end());
});

router.get('/checklist/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.getChecklist(id)
		.then(checklist => response.status(OK).json(checklist))
		.catch(error => response.status(UNAUTHORIZED).end());
});

router.delete('/checklist/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.deleteChecklist(id)
		.then(() => response.status(NO_CONTENT).json())
		.catch(error => response.status(UNAUTHORIZED).end());
});

export {router};