let AuthInterceptor = ($window, $q, $injector) => {
	return {
		request: function (request) {
			request.headers = request.headers || {};
			if ($window.localStorage.token) {
				request.headers.Authorization = 'Bearer ' + $window.localStorage.token;
			}
			return request;
		},
		responseError: function (rejection) {
			if (rejection.status === 401) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');

				let stateService = $injector.get('$state');
				stateService.go('authentication');
			}
			return new Promise((resolve, reject) => reject(rejection));
		}
	}
};

AuthInterceptor.$inject = ['$window', '$q', '$injector'];

export default AuthInterceptor;