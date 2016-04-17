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
				return;
			}

			if (toState.name === 'authentication' && localStorage.getItem('token')) {
				event.preventDefault();
				$state.go('checklist');
				return;
			}

			let user = localStorage.getItem('user');
			$rootScope.user = JSON.parse(user);
		});
	}]);

export default app;