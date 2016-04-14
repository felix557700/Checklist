import angular from 'angular'
import ItemsController from "./items.controller";
import ItemsService from "./items.service";

angular.module('items', [])
	.service('ItemsService', ItemsService)
	.controller('ItemsController', ItemsController);
