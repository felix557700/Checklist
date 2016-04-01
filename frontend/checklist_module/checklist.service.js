class ChecklistService {
	constructor($http) {
		this.http = $http;
	}

	getChecklists(name, password) {
		return this.http.get('./api/checklists');
	}

	addChecklist(name, password) {
		return this.http.post('./api/checklists', {name, password});
	}

	deleteChecklist(){}

	updateChecklist(){}
}

ChecklistService.$inject = ['$http'];

export default ChecklistService;