let AuthInterceptor = ($rootScope, $q, $window) => {
	return {
		request: function (config) {
			config.headers = config.headers || {};
			if ($window.localStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
			}
			console.log($window.localStorage.token);
			console.log(localStorage.token);
			return config;
		},
		response: function (response) {
			let token = response.config.headers.authorization;
			if (response.status === 401 && !token) {
				// go to state login
				$state.go('login');
			}
			return response || $q.when(response);
		}
	}
};

AuthInterceptor.$inject = ['$rootScope', '$q', '$window'];

export default AuthInterceptor;