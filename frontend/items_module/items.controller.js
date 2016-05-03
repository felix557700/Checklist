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

		let vm = this;
		if (!this.checklist) {
			this.ItemsService
				.getChecklist(this.rootScope.user, this.checklistName)
				.then(result => {
					vm.checklist = result.data;
				})
				.catch(error => console.log(error));
		}

		$scope.sortableConfig = {
			animation: 150,
			delay: 0,
			handle: ".handle",
			onUpdate: function () {
				vm.ItemsService.updateItems(vm.rootScope.user, vm.checklistName, vm.checklist.items);
			}
		};
	}

	toggleItem(index) {
		let user = this.rootScope.user;
		let checklistName = this.checklistName;
		let item = this.checklist.items[index];

		this.ItemsService
			.toggleItem(user, checklistName, item)
			.catch(error => this.checklist.items[index].checked = false);
	}

	getPercentage() {
		if (!this.checklist) {
			return '0%';
		}

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

		if (!this.newItem.text) {
			// TODO filip(16/04/2016): show error
			return;
		}

		let vm = this;
		this.ItemsService.addItem(this.rootScope.user, this.checklistName, this.newItem)
			.then(function (result) {
				let createdItem = result.data;

				vm.newItem = {};
				vm.checklist.items.push(createdItem);
				vm.closeAddForm();
			})
			.catch(error => console.log(error));
	}

	deleteItem() {
		if (!this.itemToDelete) {
			return;
		}

		let vm = this;
		this.ItemsService
			.deleteItem(this.rootScope.user, this.checklistName, this.itemToDelete)
			.then(() => {
				vm.checklist.items = vm.checklist.items.filter(item => item !== vm.itemToDelete);
				vm.closeModal();
			});
	}

	openModal(index) {
		let body = document.querySelector('body');
		let items = document.querySelector('.items');
		body.classList.add('modal-open');
		items.classList.add('blur');

		this.showModal = true;
		this.itemToDelete = this.checklist.items[index];
	}

	closeModal() {
		let body = document.querySelector('body');
		let items = document.querySelector('.items');
		body.classList.remove('modal-open');
		items.classList.remove('blur');

		this.showModal = false;
		this.itemToDelete = undefined;
	}
}

ItemsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'ItemsService'];

export default ItemsController;