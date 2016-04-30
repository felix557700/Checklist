import angular from 'angular'
import ChecklistController from "./checklist.controller";
import ChecklistService from "./checklist.service";

angular.module('checklist', ['ng-sortable'])
	.service('ChecklistService', ChecklistService)
	.controller('ChecklistController', ChecklistController);
