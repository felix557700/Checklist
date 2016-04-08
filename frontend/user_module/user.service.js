class UserService {
	constructor($http) {
		this.http = $http;
	}

	loginUser(user, rememberMe) {
		let {name, password} = user;
		return this.http.put('./api/users/login', {name, password, rememberMe});
	}

	registerUser(name, password) {
		return this.http.post('./api/users/register', {name, password});
	}
}

UserService.$inject = ['$http'];

export default UserService;