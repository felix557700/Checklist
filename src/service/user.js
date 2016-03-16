import MongoDb from './../db'
import { v4 } from 'node-uuid'

export default class ChecklistService {
	constructor() {}

	findAll() {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({}, {_id: 0})
				.toArray(function (err, documents) {
					if (err) {
						reject(err);
					} else {
						resolve(documents);
					}
				});
		});
	}

	createNewChecklist(name) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			let uuid = v4();
			let newChecklist = {
				checklistId: uuid,
				name: name,
				priority: 0,
				color: 'white',
				size: 0,
				items: []
			};
			let safe = {w: 1, j: 1};

			collection
				.insertOne(newChecklist, safe,function (err, documents) {
					if (err) {
						reject(err);
					} else {
						resolve(documents);
					}});
				//.then(() => resolve())
				//.catch(() => reject());
		});
	}

	getChecklist(id) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('test');

			collection
				.find({checklistId: id})
				.toArray()
				.then(array => resolve(array[0]))
				.catch(err => reject(err));
		});
	}
}
// TODO: check data
//var checklist = {
//	checklistId: UUID,
//	checklistName: 'airplane',
//	priority: 0,
//	color: white,
//	items: [
//		{
//			itemId: UUID,
//			title: 'first',
//			done: false,
//			flagged: false,
//			note: 'this is first item',
//			priority: 0
//		},
//		{
//			itemId: UUID,
//			title: 'first',
//			done: false,
//			flagged: false,
//			note: 'this is first item',
//			priority: 1
//		},
//		{
//			itemId: UUID,
//			title: 'first',
//			done: false,
//			flagged: false,
//			note: 'this is first item',
//			priority: 2
//		}
//	]
//};