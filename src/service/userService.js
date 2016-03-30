import MongoDb from './../db'

export default class UserService {
	constructor() {
	}

	findUser(name) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('users');

			collection
				.find({name: name})
				.limit(1)
				.toArray()
				.then(users => resolve(users[0]))
				.catch(error => reject(error));
		});
	}

	addUser(name, hashPassword) {
		return new Promise(function (resolve, reject) {
			let collection = MongoDb.getDb().collection('users');

			collection
				.insertOne({name: name, password: hashPassword})
				.then(() => resolve())
				.catch(error => reject(error));
		});
	}
}