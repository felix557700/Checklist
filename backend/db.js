import {MongoClient} from "mongodb";

let database;

export default class MongoDb {
	constructor() {
		this.MongoClient = MongoClient;
		this.DB_URL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/checklist';
	}

	connectToMongo() {
		return new Promise((resolve, reject) => {
			this.MongoClient.connect(this.DB_URL, function (err, db) {
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
