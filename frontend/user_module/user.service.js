class UserService {
	constructor($http) {
		this.http = $http;
	}

	loginUser(name, password) {
		return this.http.put('./api/users/login', {name, password});
	}

	registerUser(name, password) {
		return this.http.post('./api/users/register', {name, password});
	}
}

UserService.$inject = ['$http'];

export default UserService;