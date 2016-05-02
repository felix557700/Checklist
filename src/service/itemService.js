import MongoDb from './../db'
import {v4 as uuid} from 'node-uuid'

let writeSafe = {w: 1, j: true};

export default class ItemService {
	constructor() {
	}

	getItemsOfChecklist(checklistName) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({name: checklistName})
				.limit(1)
				.toArray()
				.then(checklists => resolve(checklists[0].items))
				.catch(error => reject(error));
		});
	}

	createNewItem(checklistName, newItem) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			newItem.checked = false;
			newItem.flagged = false;
			newItem.note = '';
			newItem.priority = 0;
			newItem.itemId = uuid();

			collection
				.updateOne({name: checklistName}, {$push: {items: newItem}}, writeSafe)
				.then(() => resolve(newItem))
				.catch(error => reject(error));
		});
	}

	deleteItemFromChecklist(checklistName, itemId) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.updateOne({name: checklistName}, {'$pull': {items: {itemId: itemId}}}, writeSafe)
				.then(() => resolve())
				.catch(error => reject(error));
		});
	}

	checkItem(checklistId, itemId) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.updateOne({'items.itemId': itemId}, {$set: {'items.$.checked': true}}, writeSafe)
				.then(() => resolve())
				.catch(err => reject(err));
		});
	}

	uncheckItem(checklistId, itemId) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.updateOne({'items.itemId': itemId}, {$set: {'items.$.checked': false}}, writeSafe)
				.then(() => resolve())
				.catch(err => reject(err));
		});
	}
}
