import {MongoClient} from "mongodb";

let database;

export default class MongoDb {
	constructor() {
		this.MongoClient = MongoClient;
	}

	connectToMongo() {
		return new Promise((resolve, reject) => {
			this.MongoClient.connect('mongodb://localhost:27017/checklist', function (err, db) {
				if (!err) {
					console.log('We are connected to mongodb');
					database = db;
					resolve(db);
				} else {
					console.log('Unable to connect to Mongo.', err);
					reject(err);
				}
			});
		});
	}

	static getDb() {
		if (database) {
			return database;
		} else {
			throw new Error('There is no connection to Mongo.')
		}
	}
}
