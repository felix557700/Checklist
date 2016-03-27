import angular from 'angular'
import uiRouter from 'angular-ui-router'
import routes from './config'

const app = angular
	.module('myApp', [
		uiRouter
	]);

app.config(routes);

export default app;