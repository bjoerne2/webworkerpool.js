/**
 * @license webworkerpool.js 1.0.1
 * Created by http://www.bjoerne.com
 * License: GPLv3 (http://www.gnu.org/licenses/gpl-3.0.html)
 */
(function() {
	var module = angular.module('webWorkerPool', ['ng']);

	module.service('webWorkerPoolFactory', ['$q',
	function($q) {
		return new WebWorkerPoolFactory($q);
	}]);

	module.provider('webWorkerPool', function() {
		this.$get = ['$q',
		function($q) {
			return new WebWorkerPool($q, this.workerUrl, this.capacity);
		}];
		this.workerUrl = function(workerUrl) {
			this.workerUrl = workerUrl;
		};
		this.capacity = function(capacity) {
			this.capacity = capacity;
		};
	});
})();
