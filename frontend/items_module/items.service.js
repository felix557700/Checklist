class ItemsService {
	constructor($http) {
		this.http = $http;
	}

	getItems(user, checklistId) {
		let {name} = user;
		return this.http.get(`./api/${name}/checklists/${checklistId}`);
	}

	addItem(user, checklistId, newItem) {
		let {name} = user;
		return this.http.post(`./api/${name}/checklists/${checklistId}/items`, newItem);
	}
}

ItemsService.$inject = ['$http'];

export default ItemsService;