class UserController {
	constructor($rootScope, $scope, $state, $timeout, UserService) {
		this.rootScope = $rootScope;
		this.user = $scope.user;
		this.state = $state;
		this.timeout = $timeout;
		this.UserService = UserService;
		this.passwordType = 'password';
	}

	login() {
		if (!this.user || !this.user.name || !this.user.password) {
			this.showError();
			return;
		}

		this.UserService
			.loginUser(this.user, this.rememberMe)
			.then(result => {
				this.rootScope.user = result.data.user;
				localStorage.setItem('token', result.data.token);
				this.hideError();
				this.state.go('checklist');
			})
			.catch(error => this.showError());
	}

	togglePasswordType() {
		if (this.passwordType === 'password') {
			this.passwordType = 'text';
		} else {
			this.passwordType = 'password';
		}
	}

	showError() {
		this.isError = true;
		this.activateLoginShake();
		this.timeout(() => this.deactivateLoginShake(), 500);
	}

	hideError() {
		this.isError = false;
	}

	activateLoginShake() {
		this.shakeLogin = true;
	}

	deactivateLoginShake() {
		this.shakeLogin = false;
	}

	//--------------------- Register ---------------------//
	register() {
		if (!this.user || !this.user.name || !this.user.password) {
			this.showRegisterError();
			return;
		}

		if (this.user.password === this.user.repeatedPassword) {
			this.UserService
				.registerUser(this.user.name, this.user.password)
				.then(result => {
					this.user.name = result.data.name;
					this.user.password = '';
					this.hideError();
					this.closeRegistration();
				})
				.catch(error => {
					this.error = error;
					this.showRegisterError();
				});
		} else {
			// TODO filip(07/04/2016): error password and repeated are not matching
		}
	}

	openRegistration() {
		this.openRegister = true;
	}

	closeRegistration() {
		this.openRegister = false;
	}

	showRegisterError() {
		this.isError = true;
		this.activateRegisterShake();
		this.timeout(() => this.deactivateRegisterShake(), 500);
	}

	activateRegisterShake() {
		this.shakeRegister = true;
	}

	deactivateRegisterShake() {
		this.shakeRegister = false;
	}

	doesUserExist() {
		if (!this.error || !this.error.status) {
			return false;
		}
		else {
			return this.error.status === 409;
		}
	}
}

UserController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'UserService'];

export default UserController;