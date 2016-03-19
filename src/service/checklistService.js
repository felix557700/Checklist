import MongoDb from './../db'
import { v4 as uuid} from 'node-uuid'

let writeSafe = {w: 1, j: true};

export default class ChecklistService {
	constructor() {}

	findAll() {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({}, {_id: 0})
				.toArray()
				.then(documents => resolve(documents))
				.catch(error => reject(error));
		});
	}

	createNewChecklist(newChecklist) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			newChecklist.checklistId = uuid();

			collection
				.insertOne(newChecklist, writeSafe)
				.then(documents => resolve(documents))
				.catch(error => reject(error));
		});
	}

	getChecklist(id) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({checklistId: id})
				.limit(1)
				.toArray()
				.then(array => resolve(array[0]))
				.catch(error => reject(error));
		});
	}

	deleteChecklist(id) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.deleteOne({checklistId: id}, writeSafe)
				.then(() => resolve())
				.catch(err => reject(err));
		});
	}
}
