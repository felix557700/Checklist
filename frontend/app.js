import angular from 'angular'
import {} from './user_module/user'
import {} from './checklist_module/checklist'
import {} from './items_module/items'
import AuthInterceptor from './authenticationInterceptor';
import routes from './config'

const app = angular
	.module('myApp', ['ui.router', 'user', 'checklist', 'items'])
	.config(routes)
	.config(['$httpProvider', $httpProvider => $httpProvider.interceptors.push('AuthInterceptor')])
	.factory('AuthInterceptor', AuthInterceptor)
	.run(['$rootScope', '$state', function ($rootScope, $state) {
		$rootScope.$on("$stateChangeStart", function (event, toState, fromState, fromParams, options) {
			if (toState.authenticate && !localStorage.getItem('token')) {
				// TODO: show error -> user not authenticated
				event.preventDefault();
				$state.go("authentication");
			}

			// TODO filip(14/04/2016): read user info from localStorage | solve refresh page problem
		});
	}]);

export default app;