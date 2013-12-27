webworkerpool.js
================

webworkerpool.js is a JavaScript library that can be used to manage a pool of web workers. It requires q.js or AngularJS.
If you want to use this library in an AngularJS application, a module with injectable services is provided.

Motivation
----------
In order to use multiple threads while running JavaScript in a web browser you need to rely on web workers as the only available option. 
Multiple threads are useful to execute JavaScript code in parallel or to separate the main thread (responsible for the UI) from some
heavy-weight calculations (e.g. encryption procedures). With this separation you can be sure that your 
UI behaves properly no matter what goes on in the background.

Examples
-------
To create a WebWorkerPool a web worker url resp. path is needed (here: hello-worker.js) and the capacity of the pool (number of workers, here: 8).

### Create a WebWorkerPool with q.js

Create a **WebWorkerPool** directly:

    webWorkerPool = new WebWorkerPool(Q, 'hello-worker.js', 8);

Or create a **WebWorkerPoolFactory** first and then create the pool:

    webWorkerPoolFactory = new WebWorkerPoolFactory(Q);
    webWorkerPool = webWorkerPoolFactory.createPool('hello-worker.js', 8);

### Create a WebWorkerPool with AngularJS

Declare the **webWorkerPool** module as a module dependency:

    myApp = angular.module('myApp', ['webWorkerPool']);

Then just inject either **$webWorkerPoolFactory** or **$webWorkerPool**. The AngularJS **$q** is injected automatically and you don't have to care about it.

With AngularJS you can configure default values for the worker url and the capacity of the pool by declaring constants for the module. If you inject a WebWorkerPool it will already be set up with these values.

   	webWorkerPoolModule = angular.module('webWorkerPool');
   	webWorkerPoolModule.constant('WEB_WORKER_POOL_WORKER_URL', 'hello-worker.js');
   	webWorkerPoolModule.constant('WEB_WORKER_POOL_CAPACITY', 8);


### Use the WebWorkerPool

Once you have a web worker pool you can post messages, get a promise and register a then-callback like this:

    this.webWorkerPool.postMessage("Bob").then(function(event) {
        console.log(event.data);
    });

Installation
------------
Use one of the files in the dist folder for your project. There are uncompressed and compressed versions of the files. Use **webworkerpool-core.js** if you want to use webworkerpool.js with q.js. If you want to use webworkerpool.js in an AngularJS application use **webworkerpool-angular.js** or the combinded file **webworkerpool-core-angular.js**.

Jasmine specs
-------------
The are some jasmine specs in the spec folder. Put the files on a webserver and invoke the index.html file. The specs should run successfully.

Build
-----
There is a UNIX shell script in the build folder if you want to build the dist files yourself. [uglifyjs](https://github.com/mishoo/UglifyJS2) is required for the JavaScript compression.