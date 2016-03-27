import angular from 'angular'
import uiRouter from 'angular-ui-router'
import routes from './config'
import AuthenticationController from './auth_module/authentication.controler'
import AuthenticationService from './auth_module/authentication.service'

const app = angular
	.module('myApp', [
		uiRouter
	])
	.config(routes)
	.controller("AuthenticationController", AuthenticationController)
	.service("AuthenticationService", AuthenticationService);

export default app;