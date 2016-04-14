let routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
	$stateProvider
		.state('authentication', {
			url: "/",
			templateUrl: './user_module/user.html',
			controller: 'UserController',
			controllerAs: 'vm',
			authenticate: false
		})
		.state('checklist', {
			url: "/checklist",
			templateUrl: './checklist_module/checklist.html',
			controller: 'ChecklistController',
			controllerAs: 'vm',
			authenticate: true
		})
		.state('items', {
			url: "/items",
			templateUrl: './items_module/items.html',
			controller: 'ItemsController',
			controllerAs: 'vm',
			params: {
				items: null
			},
			authenticate: true
		});

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(false);
};

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default routes;