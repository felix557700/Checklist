class ChecklistService {
	constructor($http) {
		this.http = $http;
	}

	getChecklists(name, password) {
		//return this.http.put('./api/users/login', {name, password});
	}

	addChecklist(name, password) {
		//return this.http.post('./api/users/register', {name, password});
	}

	deleteChecklist(){}

	updateChecklist(){}
}

ChecklistService.$inject = ['$http'];

export default ChecklistService;