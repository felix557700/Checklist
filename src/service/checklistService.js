import MongoDb from './../db'
import { v4 as uuid} from 'node-uuid'

let writeSafe = {w: 1, j: true};

export default class ChecklistService {
	constructor() {}

	getAllChecklists(username) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({username: username}, {_id: 0})
				.toArray()
				.then(checklists => resolve(checklists))
				.catch(error => reject(error));
		});
	}

	createNewChecklist(username, newChecklist) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			newChecklist.checklistId = uuid();
			newChecklist.username = username;

			collection
				.insertOne(newChecklist, writeSafe)
				.then(() => resolve())
				.catch(error => reject(error));
		});
	}

	getChecklist(id) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({checklistId: id}, {_id: 0})
				.limit(1)
				.toArray()
				.then(checklists => resolve(checklists[0]))
				.catch(error => reject(error));
		});
	}

	deleteChecklist(id) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.deleteOne({checklistId: id}, writeSafe)
				.then(() => resolve())
				.catch(error => reject(error));
		});
	}
}
