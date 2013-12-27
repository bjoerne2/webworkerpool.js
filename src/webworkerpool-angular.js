/**
 * @license webworkerpool.js 1.0.0
 * Created by http://www.bjoerne.com
 * License: GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
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
