export default class AuthenticationService {
	constructor() {
		this.http = $http;
	}

	sendCredentials(){
		return 'hi service';
		//this.http.post('./api/auth', {})
		//	.then(() => console.log('register'))
		//	.catch(() => console.log('failed register'));
	}
}

AuthenticationService.$inject = ['$http'];