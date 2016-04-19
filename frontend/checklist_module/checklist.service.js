class ChecklistService {
	constructor($http) {
		this.http = $http;
	}

	getChecklists(user) {
		let {name} = user;
		return this.http.get(`./api/${name}/checklists`);
	}

	addChecklist(user, newChecklist) {
		let {name} = user;
		return this.http.post(`./api/${name}/checklists`, newChecklist);
	}

	deleteChecklist(user, checklist) {
		let {name} = user;
		let {checklistId} = checklist;
		return this.http.delete(`./api/${name}/checklists/${checklistId}`);
	}

	updateChecklist() {
		// TODO filip(19/04/2016): make update of checklist
	}
}

ChecklistService.$inject = ['$http'];

export default ChecklistService;