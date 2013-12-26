describe('WebWorkerPool', function() {
	beforeEach(function() {
		var injector = angular.injector(['webWorkerPool']);
		this.webWorkerPool = injector.get('$webWorkerPool');
	});

	it("should work with default values", function() {
		var helloMsg;
		this.webWorkerPool.postMessage("Bob").then(function(event) {
			helloMsg = event.data;
		});
		waitsFor(function() {
			return helloMsg;
		});
		runs(function() {
			expect(helloMsg).toBe('Hello, Bob!');
		});
	});
});
describe('WebWorkerPoolFactory', function() {
	beforeEach(function() {
		var injector = angular.injector(['webWorkerPool']);
		this.webWorkerPoolFactory = injector.get('$webWorkerPoolFactory');
	});

	it("should queue web worker request when pool has no capacity", function() {
		var webWorkerPool = this.webWorkerPoolFactory.createPool('hello-worker.js', 0);
		webWorkerPool.postMessage("Bob");
		expect(webWorkerPool.queue.length).toBe(1);
	});
	it("should reject requests when queue is cleared", function() {
		var webWorkerPool = this.webWorkerPoolFactory.createPool('hello-worker.js', 0);
		var rejected;
		webWorkerPool.postMessage("Bob").catch(function() {
			rejected = true;
		})
		waitsFor(function() {
			return webWorkerPool.queue.length == 1;
		}, 'request has been queued')
		runs(function() {
			webWorkerPool.clearQueue();
		});
		waitsFor(function() {
			return rejected;
		});
		runs(function() {
			expect(rejected).toBeTruthy();
		});
	});
	it("shouldn't queue web worker request when pool has capacity", function() {
		var webWorkerPool = this.webWorkerPoolFactory.createPool('hello-worker.js', 1);
		webWorkerPool.postMessage("Sam");
		expect(webWorkerPool.queue.length).toBe(0);
	});
	it("should execute web worker request immediately when pool has capacity", function() {
		var helloMsg;
		var webWorkerPool = this.webWorkerPoolFactory.createPool('hello-worker.js', 1);
		webWorkerPool.postMessage('Max').then(function(event) {
			helloMsg = event.data;
		});
		waitsFor(function() {
			return helloMsg;
		});
		runs(function() {
			expect(helloMsg).toBe('Hello, Max!');
		});
	});
	it("should queue web worker request and execute it later when pool has capacity", function() {
		var numOfResponses = 0;
		var webWorkerPool = this.webWorkerPoolFactory.createPool('timeout-worker.js', 1);
		for (var i = 0; i < 2; i++) {
			webWorkerPool.postMessage(1000).then(function(event) {
				numOfResponses++;
			});
		}
		waits(500);
		runs(function() {
			expect(numOfResponses).toBe(0, 'no response should be back after 500 ms');
		}, 0);
		waitsFor(function() {
			return numOfResponses == 1;
		}, '1 response to be back', 10000);
		waits(500);
		runs(function() {
			expect(numOfResponses).toBe(1, '1 response should be back after 1500 ms');
		});
		waitsFor(function() {
			return numOfResponses == 2;
		}, '2 responses to be back', 1000);
	});
	it("should execute queued requests in the order of creation", function() {
		var webWorkerPool = this.webWorkerPoolFactory.createPool('timeout-worker.js', 1);
		var responses = [];
		for (var i = 0; i < 3; i++) {
			webWorkerPool.postMessage(100).then((function(i) {
				return function(event) {
					responses.push(i);
				};
			})(i));
		}
		waitsFor(function() {
			return responses.length == 3;
		}, '3 responses to be back');
		runs(function() {
			for (var i = 0; i < responses.length; i++) {
				expect(responses[i]).toBe(i);
			}
		});
	});
});

(function() {
	var webWorkerPoolModule = angular.module('webWorkerPool');
	webWorkerPoolModule.constant('WEB_WORKER_POOL_WORKER_URL', 'hello-worker.js');
	webWorkerPoolModule.constant('WEB_WORKER_POOL_CAPACITY', 1);
})();
