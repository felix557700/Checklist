class AuthenticationController {
	constructor($scope, AuthenticationService) {
		$scope.loginMessage = 'hi ctrl';
		this.AuthenticationService = AuthenticationService;
	}

	login() {
		console.log(this.AuthenticationService.sendCredentials());
	}
}

AuthenticationController.$inject = ['$scope', 'AuthenticationService'];

export default AuthenticationController;