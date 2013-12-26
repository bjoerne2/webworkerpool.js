(function() {
	this.onmessage = function(event) {
		var timeout = event.data;
		setTimeout(function() {
			postMessage('Response of worker');
		}, timeout);
	};
})();
