import angular from 'angular'
import ItemsController from "./items.controller";
import ItemsService from "./items.service";

angular.module('items', ['ng-sortable'])
	.service('ItemsService', ItemsService)
	.controller('ItemsController', ItemsController);
