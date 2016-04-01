class ChecklistController {
	constructor($scope, ChecklistService){
		$scope.checklistText = 'Hi checklist';
		this.ChecklistService = ChecklistService;
		this.getAllChecklist();
	}

	getAllChecklist() {
		return this.ChecklistService
			.getChecklists()
			.then(result => console.log('success checklist'))
			.catch(error => console.log('error checklist'));
	}
}

ChecklistController.$inject = ['$scope', 'ChecklistService'];

export default ChecklistController;
