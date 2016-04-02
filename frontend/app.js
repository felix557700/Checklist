import angular from 'angular'
import uiRouter from 'angular-ui-router'
import {} from 'user_module/user'
import {} from 'checklist_module/checklist'
import AuthInterceptor from './authenticationInterceptor';
import routes from './config'

const app = angular
	.module('myApp', [
		uiRouter, 'user', 'checklist'
	])
	.config(routes)
	.factory('AuthInterceptor', AuthInterceptor)
	.run(['$rootScope', '$state', function ($rootScope, $state) {
		$rootScope.$on("$stateChangeStart", function (event, toState, fromState, fromParams, options) {
			if (!localStorage.getItem('token')) {
				// TODO filip(02/04/2016): continue here
				//event.preventDefault();
				//$state.go("authentication");
			}
		});
	}]);

export default app;