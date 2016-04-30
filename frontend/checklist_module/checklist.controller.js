class ChecklistController {
	constructor($rootScope, $scope, $state, $timeout, ChecklistService) {
		this.rootScope = $rootScope;
		this.state = $state;
		this.timeout = $timeout;
		this.ChecklistService = ChecklistService;
		this.getAllChecklists();
		this.checklists = [];
		this.newChecklist = undefined;

		$scope.sortableConfig = {
			animation: 150,
			delay: 0,
			handle: ".handle",
			onStart: function (a, b) {
				//console.clear();
				//var items = $filter('filter')(a.models, { text: $scope.query });
				//console.log('Your selected item: ' + items[a.oldIndex].text);
			},
			onSort: function (a, b) {
				//var items = $filter('filter')(a.models, { text: $scope.query });
				//console.log('Your selected item: ' + items[a.oldIndex].text);
			},
			onEnd: function () {
				//console.log('default onEnd()');
			}
		};
	}

	getAllChecklists() {
		this.ChecklistService
			.getChecklists(this.rootScope.user)
			.then(result => this.checklists = result.data)
			.catch(error => console.log('error checklist'));
	}

	addChecklist() {
		if (this.newChecklist) {
			this.ChecklistService
				.addChecklist(this.rootScope.user, this.newChecklist)
				.then(result => {
					this.checklists.push(result.data);
					this.newChecklist = undefined;
					this.closeAddForm();
				})
				.catch(error => console.log('error checklist'));
		}
	}

	deleteChecklist(index) {
		this.ChecklistService
			.deleteChecklist(this.rootScope.user, this.checklists[index])
			.then(result => this.checklists.splice(index, 1))
			.catch(error => console.log('error checklist'));
	}

	openAddForm() {
		this.activateAdd = true;
		this.focusOn('checklist-add');
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

	editChecklist() {
		console.log('edit');
	}
}

ChecklistController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'ChecklistService'];

export default ChecklistController;
