import express from 'express';
import {Router} from 'express';
import ChecklistService from './../service/user'

let router = new Router;
let checklistService = new ChecklistService();

router.get('/', (request, response) => {
	checklistService
		.findAll()
		.then(value => {
			response.status(200).json(value);
		})
});

router.post('/checklist', (request, response) => {
	console.log(request.body, request.body.name)
	let name = request.body.name;

	checklistService
		.createNewChecklist(name)
		.then(() => response.status(200).end())
		.catch(() => response.status(401).end());
});

router.get('/checklist/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.getChecklist(id)
		.then(checklist => response.status(200).json(checklist))
		.catch(error => response.status(401).end());
});

export {router};