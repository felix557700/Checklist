import express from 'express';
import {Router} from 'express';
import {OK, CREATED, NO_CONTENT, BAD_REQUEST} from './es6-http-status-codes';
import ChecklistService from './../service/checklistService';
import ItemService from './../service/itemService';

let router = new Router();
let checklistService = new ChecklistService();
let itemService = new ItemService();


//-------------------- API for checklists --------------------//

router.get('/:username/checklists', (request, response) => {
	let username = request.params.username;

	checklistService
		.getAllChecklists(username)
		.then(checklists => response.status(OK).json(checklists))
		.catch(error => response.sendStatus(BAD_REQUEST))
});

router.post('/:username/checklists', (request, response) => {
	let username = request.params.username;
	let checklist = request.body;

	checklistService
		.createNewChecklist(username, checklist)
		.then(newChecklist => response.status(CREATED).json(newChecklist))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.get('/:username/checklists/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.getChecklist(id)
		.then(checklist => response.status(OK).json(checklist))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.get('/:username/checklists/:name', (request, response) => {
	let name = request.params.name;

	checklistService
		.getChecklist(name)
		.then(checklist => response.status(OK).json(checklist))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.delete('/:username/checklists/:id', (request, response) => {
	let id = request.params.id;

	checklistService
		.deleteChecklist(id)
		.then(() => response.sendStatus(NO_CONTENT))
		.catch(error => response.sendStatus(BAD_REQUEST));
});


//-------------------- API for items of checklist --------------------//

router.get('/:username/checklists/:checklistId/items', (request, response) => {
	let checklistId = request.params.checklistId;

	itemService
		.getItemsOfChecklist(checklistId)
		.then(items => response.status(OK).json(items))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.post('/:username/checklists/:checklistId/items', (request, response) => {
	let checklistId = request.params.checklistId;
	let item = request.body;

	itemService
		.createNewItem(checklistId, item)
		.then(() => response.sendStatus(CREATED))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.delete('/:username/checklists/:checklistId/items/:itemId', (request, response) => {
	let checklistId = request.params.checklistId;
	let itemId = request.params.itemId;

	itemService
		.deleteItemFromChecklist(checklistId, itemId)
		.then(() => response.sendStatus(NO_CONTENT))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.put('/:username/checklists/:checklistId/items/:itemId/check', (request, response) => {
	let checklistId = request.params.checklistId;
	let itemId = request.params.itemId;

	itemService
		.checkItem(checklistId, itemId)
		.then(() => response.sendStatus(OK))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.put('/:username/checklists/:checklistId/items/:itemId/uncheck', (request, response) => {
	let checklistId = request.params.checklistId;
	let itemId = request.params.itemId;

	itemService
		.uncheckItem(checklistId, itemId)
		.then(() => response.sendStatus(OK))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

export {router};