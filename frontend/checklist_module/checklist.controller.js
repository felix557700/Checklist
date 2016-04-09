class ChecklistController {
	constructor($rootScope, $scope, ChecklistService) {
		this.rootScope = $rootScope;
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
				.then(result => this.checklists.push(result.data))
				.catch(error => console.log('error checklist'));
		}
	}

	deleteChecklist(checklistId) {
		this.ChecklistService
			.deleteChecklist(this.rootScope.user, checklistId)
			.then(result => console.log(result))
			.catch(error => console.log('error checklist'));
	}

	gotoChecklist(index) {
		console.log(index);
	}

	editChecklist() {
		console.log('edit');
	}

	deleteChecklist() {
		console.log('delete');
	}
}

ChecklistController.$inject = ['$rootScope', '$scope', 'ChecklistService'];

export default ChecklistController;
