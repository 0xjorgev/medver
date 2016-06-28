function get(url) {
	// Return a new promise.
	return new Promise(function(resolve, reject) {
		// Do the usual XHR stuff
		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
				// Resolve the promise with the response text
				resolve(req.response);
			}
			else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = function() {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
}



var a = function(){
	return new Promise(function(resolve, reject){
		var b = 2 + 2
		resolve('hula')
	})
}

var b = function(data){
	return new Promise(function(resolve, reject){
		console.log(data)
		resolve(data + '!')
	})
}

a().then(function(r){
	console.log('>>>>>',r)
	return (r + '!')
}).then(function(r){
	console.log('>>>>>', r)
})

// console.log(a)

var promise = new Promise(function(resolve, reject) {
  resolve();
});

promise.then(function(val) {
	console.log(val); // 1
	jhgjhgjh
	return val + 2;
}).then(function(val) {
	console.log(val); // 3
	return val * 2;
}).then(function(val){
	console.log(val)
	return {asd:1, bvc:2}
}).catch(function(){
	console.log('--------- errror --------')
}).then(function(val){
	console.log(val)
})
