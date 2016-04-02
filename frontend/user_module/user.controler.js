class UserController {
	constructor($scope, $state, UserService) {
		this.user = $scope.user;
		this.state = $state;
		this.UserService = UserService;
	}

	login() {
		return this.UserService
			.loginUser(this.user.name, this.user.password)
			.then(result => {
				localStorage.setItem('token', result.data.token);
				this.state.go('checklist');
			})
			.catch(error => {
				// TODO filip(01/04/2016): display error
				console.log('login failed');
			});
	}

	register() {
		return this.UserService
			.registerUser(this.user.name, this.user.password)
			.then(result => {
				this.user.name = result.data.name;
				this.user.password = '';
				console.log('register succeed');
			})
			.catch(error => {
				// TODO filip(01/04/2016): display error
				console.log('register failed');
			});
	}
}

UserController.$inject = ['$scope', '$state', 'UserService'];

export default UserController;