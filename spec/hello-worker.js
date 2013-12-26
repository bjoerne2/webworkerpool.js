(function() {
	this.onmessage = function(event) {
		postMessage('Hello, ' + event.data + '!');
	};
})();
