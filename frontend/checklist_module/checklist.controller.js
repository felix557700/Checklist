class ChecklistController {
	constructor($rootScope, $scope, $state, ChecklistService) {
		this.rootScope = $rootScope;
		this.state = $state;
		this.ChecklistService = ChecklistService;
		this.getAllChecklists();
		this.checklists = [];
		this.newChecklist = undefined;
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
					this.closeAddForm();
				})
				.catch(error => console.log('error checklist'));
		}
	}

	deleteChecklist(checklistId) {
		this.ChecklistService
			.deleteChecklist(this.rootScope.user, checklistId)
			.then(result => console.log(result))
			.catch(error => console.log('error checklist'));
	}

	openAddForm() {
		this.activateAdd = true;
	}

	closeAddForm() {
		this.activateAdd = false;
	}

	gotoItemsOfChecklist(index) {
		//this.state.go('items', {items: this.checklists[index].items});
	}

	editChecklist() {
		console.log('edit');
	}

	deleteChecklist() {
		console.log('delete');
	}
}

ChecklistController.$inject = ['$rootScope', '$scope', '$state', 'ChecklistService'];

export default ChecklistController;
