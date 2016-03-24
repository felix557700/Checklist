import angular from 'angular'
import uiRouter from 'angular-ui-router'
import AppDemoController from 'AppDemoController'

angular
	.module('myApp', [])
	.controller('AppDemoController', AppDemoController);

//angular.element(document).ready(function() {
//	angular.bootstrap(document, ['myApp']);
//});
