
//--------------------------------------------------------------------------
//
// TODO: create proper config file
//
//--------------------------------------------------------------------------


export default {
	app: {
		title: 'checklist',
		description: '',
		keywords: 'mongodb, express, node.js, es6'
	},
	favicon: 'favicon.ico',
	server: {
		hostname: 'localhost',
		port: process.env.PORT || 3000
	},
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost'),
		options: {
			user: '',
			pass: ''
		}
	}
}
