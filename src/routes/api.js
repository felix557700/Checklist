import {express} from 'express';
import {Router} from 'express';
import {OK, NO_CONTENT, BAD_REQUEST} from './es6-http-status-codes';
import ChecklistService from './../service/checklistService';
import ItemService from './../service/itemService';

let router = new Router;
let checklistService = new ChecklistService();
let itemService = new ItemService();

router.get('/checklists', (request, response) => {
	checklistService
		.findAll()
		.then(value => response.status(OK).json(value))
});

router.post('/checklists', (request, response) => {
	let checklist = request.body;

	checklistService
		.createNewChecklist(checklist)
		.then(() => response.status(OK).end())
		.catch(() => response.status(BAD_REQUEST).end());
});

router.get('/checklists/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.getChecklist(id)
		.then(checklist => response.status(OK).json(checklist))
		.catch(error => response.status(BAD_REQUEST).end());
});

router.delete('/checklists/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.deleteChecklist(id)
		.then(() => response.status(NO_CONTENT).json())
		.catch(error => response.status(BAD_REQUEST).end());
});

router.get('/checklists/:checklistId/items', (request, response) => {
	let checklistId = request.params.checklistId;

	itemService
		.getItemsOfChecklist(checklistId)
		.then(items => response.status(OK).json(items))
		.catch(error => response.status(BAD_REQUEST).end());
});

router.post('/checklists/:checklistId/items', (request, response) => {
	let checklistId = request.params.checklistId;
	let item = request.body;

	itemService
		.createNewItem(checklistId, item)
		.then(() => response.status(OK).end())
		.catch(error => response.status(BAD_REQUEST).end());
});

router.delete('/checklists/:checklistId/items/:itemId', (request, response) => {
	let checklistId = request.params.checklistId;
	let itemId = request.params.itemId;

	itemService
		.deleteItemFromChecklist(checklistId, itemId)
		.then(() => response.status(NO_CONTENT).end())
		.catch(error => response.status(BAD_REQUEST).end());
});

router.put('/checklists/:checklistId/items/:itemId/check', (request, response) => {
	let checklistId = request.params.checklistId;
	let itemId = request.params.itemId;

	itemService
		.checkItem(checklistId, itemId)
		.then(() => response.status(OK).end())
		.catch(error => response.status(BAD_REQUEST).end());
});

router.put('/checklists/:checklistId/items/:itemId/uncheck', (request, response) => {
	let checklistId = request.params.checklistId;
	let itemId = request.params.itemId;

	itemService
		.uncheckItem(checklistId, itemId)
		.then(() => response.status(OK).end())
		.catch(error => response.status(BAD_REQUEST).end());
});

export {router};