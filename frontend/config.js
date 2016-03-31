let routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
	$stateProvider
		.state('authentication', {
			url: "/",
			templateUrl: './user_module/user-auth.html',
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

	$locationProvider.html5Mode(true);
};

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default routes;