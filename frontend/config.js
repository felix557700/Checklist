let routes = ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
	$stateProvider
		.state('authentication', {
			url: "/",
			templateUrl: './user_module/user.html',
			controller: 'UserController',
			authenticate: false
		})
		.state('checklist', {
			url: "/checklist",
			templateUrl: './checklist_module/checklist.html',
			controller: 'ChecklistController',
			authenticate: true
		});

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(false);

	$httpProvider.interceptors.push('AuthInterceptor')
};

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

export default routes;