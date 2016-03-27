import AuthenticationController from 'auth_module/authentication.controler'
import ChecklistController from 'checklist_module/checklist.controller'

let routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
	$stateProvider
		.state('authentication', {
			url: "/",
			controller: AuthenticationController,
			templateUrl: './auth_module/authentication.html'
		})
		.state('checklist', {
			url: "/checklist",
			controller: ChecklistController,
			templateUrl: './checklist_module/checklist.html'
		});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);
};

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default routes;