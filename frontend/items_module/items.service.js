class ItemsService {
	constructor($http) {
		this.http = $http;
	}

	getChecklist(user, checklistName) {
		let {name} = user;
		return this.http.get(`./api/${name}/checklists/${checklistName}`);
	}

	addItem(user, checklistName, newItem) {
		let {name} = user;
		return this.http.post(`./api/${name}/checklists/${checklistName}/items`, newItem);
	}

	deleteItem(user, checklistName, itemToDelete) {
		let {name} = user,
			{itemId} = itemToDelete;

		return this.http.delete(`./api/${name}/checklists/${checklistName}/items/${itemId}`);
	}

	toggleItem(user, checklistName, item) {
		let {name} = user;
		let {itemId, checked} = item;

		if (checked) {
			return this.http.put(`./api/${name}/checklists/${checklistName}/items/${itemId}/check`);
		} else {
			return this.http.put(`./api/${name}/checklists/${checklistName}/items/${itemId}/uncheck`);
		}
	}
}

ItemsService.$inject = ['$http'];

export default ItemsService;