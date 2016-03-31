import angular from 'angular'
import UserController from "./user.controler";
import UserService from "./user.service";
import AuthInterceptor from './authenticationInterceptor';

angular.module('user', [])
	.config(['$httpProvider', $httpProvider => $httpProvider.interceptors.push('AuthInterceptor')])
	.service('AuthInterceptor', AuthInterceptor)
	.service('UserService', UserService)
	.controller('UserController', UserController);
