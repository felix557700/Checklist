import MongoDb from './../db'
import {v4 as uuid} from 'node-uuid'

let writeSafe = {w: 1, j: true};

export default class ItemService {
	constructor() {
	}

	getItemsOfChecklist(checklistId) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({checklistId: checklistId})
				.limit(1)
				.toArray()
				.then(checklists => resolve(checklists[0].items))
				.catch(error => reject(error));
		});
	}

	createNewItem(checklistId, newItem) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			newItem.itemId = uuid();
			collection
				.updateOne({checklistId: checklistId}, {$push: {items: newItem}}, writeSafe)
				.then(() => resolve())
				.catch(error => reject(error));
		});
	}

	deleteItemFromChecklist(checklistId, itemId) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.updateOne({checklistId: checklistId}, {'$pull': {items: {itemId: itemId}}}, writeSafe)
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
