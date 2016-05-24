import express from 'express';
import {Router} from 'express';
import {OK, CREATED, NO_CONTENT, BAD_REQUEST} from './es6-http-status-codes';
import ChecklistService from '../service/checklistService';
import ItemService from '../service/itemService';

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
	let username = request.params.username,
		checklist = request.body;

	checklistService
		.createNewChecklist(username, checklist)
		.then(newChecklist => response.status(CREATED).json(newChecklist))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.get('/:username/checklists/:checklistName', (request, response) => {
	let checklistName = request.params.checklistName;

	checklistService
		.getChecklist(checklistName)
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

router.get('/:username/checklists/:checklistName/items', (request, response) => {
	let checklistName = request.params.checklistName;

	itemService
		.getItemsOfChecklist(checklistName)
		.then(items => response.status(OK).json(items))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.post('/:username/checklists/:checklistName/items', (request, response) => {
	let checklistName = request.params.checklistName;
	let item = request.body;

	itemService
		.createNewItem(checklistName, item)
		.then(item => response.status(CREATED).json(item))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.put('/:username/checklists/:checklistName/items/reorder', (request, response) => {
	let checklistName = request.params.checklistName;
	let items = request.body;

	itemService
		.updateItems(checklistName, items)
		.then(() => response.sendStatus(OK))
		.catch(error => response.sendStatus(BAD_REQUEST));
});

router.delete('/:username/checklists/:checklistName/items/:itemId', (request, response) => {
	let checklistName = request.params.checklistName;
	let itemId = request.params.itemId;

	itemService
		.deleteItemFromChecklist(checklistName, itemId)
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