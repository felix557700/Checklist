class ItemsController {
	constructor($rootScope, $scope, $state, ItemsService) {
		this.rootScope = $rootScope;
		this.state = $state;
		this.ItemsService = ItemsService;

		if (!$state.params.items) {
			ItemsService.getItems(this.rootScope.user)
				.then(items => this.items = items)
				.catch(error => console.log(error));
		} else {
			this.items = $state.params.items;
		}
	}
}

ItemsController.$inject = ['$rootScope', '$scope', '$state', 'ItemsService'];

export default ItemsController;