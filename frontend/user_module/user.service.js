class UserService {
	constructor($http) {
		this.http = $http;
	}

	loginUser(user) {
		let {name, password, rememberMe} = user;
		return this.http.put('./api/users/login', {name, password, rememberMe});
	}

	registerUser(user) {
		let {name, password} = user;
		return this.http.post('./api/users/register', {name, password});
	}
}

UserService.$inject = ['$http'];

export default UserService;