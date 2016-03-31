import angular from 'angular'
import uiRouter from 'angular-ui-router'
import {} from 'user_module/user'
import routes from './config'

const app = angular
	.module('myApp', [
		uiRouter, 'user'
	])
	.config(routes)
	.run(['$rootScope', '$state', function ($rootScope, $state) {
		$rootScope.$on("$stateChangeStart", function (event, toState, fromState, fromParams, options) {
			//if (toState.authenticate && !AuthService.isAuthenticated()) {
			// User is not authenticated
			//$state.transitionTo("login");
			//event.preventDefault();
			//}
		});
	}]);

export default app;