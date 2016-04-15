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

	toggleItem(index) {
		// TODO filip(15/04/2016): call API to save checked item
	}

	getPercentage() {
		let totalItems = this.items.length;
		let totalCheckedItems = this.items
			.filter(element => element.checked)
			.length;

		console.log(totalCheckedItems / totalItems * 100);
		return (totalCheckedItems / totalItems * 100) + '%';
	}
}

ItemsController.$inject = ['$rootScope', '$scope', '$state', 'ItemsService'];

export default ItemsController;