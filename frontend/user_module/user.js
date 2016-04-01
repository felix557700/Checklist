import angular from 'angular'
import UserController from "./user.controler";
import UserService from "./user.service";

angular.module('user', [])
	.service('UserService', UserService)
	.controller('UserController', UserController);
