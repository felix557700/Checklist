import MongoDb from '../db'
import { v4 as uuid} from 'node-uuid'

let writeSafe = {w: 1, j: true};

export default class ChecklistService {
	constructor() {}

	getAllChecklists(username) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({username: username}, {_id: false})
				.toArray()
				.then(checklists => resolve(checklists))
				.catch(error => reject(error));
		});
	}

	createNewChecklist(username, {name}) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			let newChecklist = {
				checklistId: uuid(),
				username: username,
				name: name,
				priority: 0,
				color: 'white',
				items: []
			};

			collection
				.insertOne(newChecklist, writeSafe)
				.then(() => {
					delete newChecklist._id;
					resolve(newChecklist);
				})
				.catch(error => reject(error));
		});
	}

	getChecklist(name) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({name: name}, {_id: false})
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
