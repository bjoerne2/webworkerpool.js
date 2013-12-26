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

	var WebWorkerPoolFactory = function($q) {
		this.$q = $q;
	};
	WebWorkerPoolFactory.prototype.createPool = function(workerUrl, capacity) {
		return new WebWorkerPool(this.$q, workerUrl, capacity);
	};

	var WebWorkerPool = function($q, workerUrl, capacity) {
		this.$q = $q;
		this.workerUrl = workerUrl;
		this.capacity = capacity;
		this.availableWorkers = capacity;
		this.workers = [];
		this.queue = [];
	};
	WebWorkerPool.prototype.postMessage = function(msg) {
		var deferred = this.$q.defer(), worker;
		if (this.availableWorkers == 0) {
			this._queue(deferred, msg);
		} else {
			this._execute(deferred, msg);
		}
		return deferred.promise;
	};

	WebWorkerPool.prototype._execute = function(deferred, msg) {
		var that = this, worker = this._getWorker();
		this.availableWorkers--;
		worker.onmessage = function(event) {
			that._releaseWorker(worker);
			that._next();
			deferred.resolve(event);
		};
		worker.postMessage(msg);
	};

	WebWorkerPool.prototype._getWorker = function() {
		var worker;
		if (this.workers.length == 0) {
			worker = new Worker(this.workerUrl);
			return worker;
		} else {
			return this.workers.pop();
		}
	};

	WebWorkerPool.prototype._releaseWorker = function(worker) {
		worker.onmessage = null;
		this.workers.push(worker);
		this.availableWorkers++;
	};

	WebWorkerPool.prototype._queue = function(deferred, msg) {
		deferred.msg = msg;
		this.queue.push(deferred);
	},

	WebWorkerPool.prototype._next = function() {
		if (this.queue.length == 0) {
			return;
		}
		var deferred = this.queue.shift();
		this._execute(deferred, deferred.msg);
	};

	WebWorkerPool.prototype.clearQueue = function() {
		for (var i = 0; i < this.queue.length; i++) {
			this.queue[i].reject('Web worker queue has been cleared');
		}
		this.queue = [];
		this.availableWorkers = this.capacity;
	};
})();
