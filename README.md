webworkerpool.js
================

Javascript library to handle a pool of web workers. Needs q.js or AngularJS. It can be used as an AngularJS module with provided services you can inject.

Motivation
----------
Web workers are the only way to have multiple threads for you javascript in the web browser. That makes sense if you have some heavy javascript routines,
but also if you want to split your main thread (responsible for the UI) from some calculations. WIth this separation you can be sure that your 
UI responses in a proper way no matter what goes up in the background.

Create a WebWorkerPool with q.js
------------------------------

Create a **WebWorkerPool** directly:

    webWorkerPool = new WebWorkerPool(Q, 'hello-worker.js', 8);

Or create a **WebWorkerPoolFactory** first and the create the pool:

    webWorkerPoolFactory = new WebWorkerPoolFactory(Q);
    webWorkerPool = webWorkerPoolFactory.createPool(Q, 'hello-worker.js', 8);

Create a WebWorkerPool with AngularJS
-----------------------------------
Declare the **webWorkerPool** module as a module dependency:

    myApp = angular.module('myApp', ['webWorkerPool']);

Then just inject either **$webWorkerPoolFactory** or **$webWorkerPool**. The AngularJS **$q** is injected into them automatically and you don't have to care about it.

With AngularJS you can configure default values for the worker url and the capacity of the pool by declaring constants for the module. If you inject a WebWorkerPool it will already be set up with these values.

   	webWorkerPoolModule = angular.module('webWorkerPool');
   	webWorkerPoolModule.constant('WEB_WORKER_POOL_WORKER_URL', 'hello-worker.js');
   	webWorkerPoolModule.constant('WEB_WORKER_POOL_CAPACITY', 1);


Use the WebWorkerPool
---------------------
Once you have a web worker pool you post messages, get a promise and register a then-callback like this:


    this.webWorkerPool.postMessage("Bob").then(function(event) {
        console.log(event.data);
    });

Installation
------------
Use one of the files in the dist folder for your project. There are uncompressed and compressed versions of the files. Use **webworkerpool-core.js** if you want to use webworkerpool.js with q.js. If you want to use webworkerpool.js in an AngularJS application use **webworkerpool-angular.js** or the combinded file **webworkerpool-core-angular.js**.

Jasmine specs
-------------
The are some jasmine spaces in the spec folder. Put the files into a webserver and invoke the index.html file. The specs should run successfully.

Build
-----
There is a UNIX shell script in the build folder if you want to build the dist files by your own. [uglifyjs](https://github.com/mishoo/UglifyJS2) is required for the javascript compression.