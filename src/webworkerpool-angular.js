(function() {
	var module = angular.module('webWorkerPool', ['ng']);

	module.service('$webWorkerPool', ['$q', 'WEB_WORKER_POOL_WORKER_URL', 'WEB_WORKER_POOL_CAPACITY',
	function($q, workerUrl, capacity) {
		return new WebWorkerPool($q, workerUrl, capacity);
	}]);

	module.service('$webWorkerPoolFactory', ['$q',
	function($q) {
		return new WebWorkerPoolFactory($q);
	}]);
})();
