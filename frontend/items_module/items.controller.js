import ItemService from './items.service';

class ItemsController {
	constructor($rootScope, $scope, $state, $stateParams, $timeout, ItemsService) {
		this.rootScope = $rootScope;
		this.state = $state;
		this.timeout = $timeout;
		this.ItemsService = ItemsService;
		this.checklistName = $stateParams.name;
		this.checklist = $stateParams.checklist;
		this.newItem = {};

		if (!this.checklistName) {
			this.state.go('checklist');
			return;
		}

		if (!this.checklist) {
			this.ItemsService
				.getChecklist(this.rootScope.user, this.checklistName)
				.then(checklist => this.checklist = checklist)
				.catch(error => console.log(error));
		}
	}

	toggleItem(index) {
		// TODO filip(15/04/2016): call API to save checked item
	}

	getPercentage() {
		let totalItems = this.checklist.items.length;
		let totalCheckedItems = this.checklist.items
			.filter(element => element.checked)
			.length;

		return (totalCheckedItems / totalItems * 100) + '%';
	}

	openAddForm() {
		this.activateAdd = true;
		this.focusOn('item-add');
	}

	focusOn(id) {
		let element = document.getElementById(id);
		if (element) {
			this.timeout(() => element.focus());
		}
	}

	closeAddForm() {
		this.activateAdd = false;
	}

	addItem() {
		if (!this.newItem.name) {
			// TODO filip(16/04/2016): show error
			return;
		}

		this.ItemsService.addItem(this.rootScope.user, this.checklist.checklistId, this.newItem);
	}
}

ItemsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'ItemsService'];

export default ItemsController;