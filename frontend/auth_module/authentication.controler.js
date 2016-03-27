class AuthenticationController {
	constructor($scope){
		$scope.loginMessage = 'hi login';
	}

	login(){}

	logout(){}

	register(){}
}

AuthenticationController.$inject = ['$scope'];

export default AuthenticationController;