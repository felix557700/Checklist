import MongoDb from './../db'

export default class UserService {
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
}