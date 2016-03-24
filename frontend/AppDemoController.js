export default class AppDemoController {
	constructor($scope) {
		$scope.a = '1';
		$scope.b = '2';
	}
}
AppDemoController.$inject = ['$scope'];
