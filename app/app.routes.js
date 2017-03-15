"use strict";

console.log("app.routes is in");

let isAuth = (AuthFactory, $location) => new Promise ((resolve, reject) => {
    console.log('isAuth is running');
    AuthFactory.isAuth()
    .then ((user) => {
        if (user) {
            console.log("You are Authenticated ", user);
            resolve();
        } else {
            console.log("You are not Authenticated");
            $location.path("/login");
            reject();
        }
    });
});	

app.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'app/components/login/login.tpl.html',
            controller: 'LoginCtrl'
    	})
    	.when('/home', {
    		templateUrl: 'app/components/home/home.tpl.html',
    		controller: 'HomeCtrl',
    		resolve: {isAuth}
    	})
    	.when('/find', {
    		templateUrl: 'app/components/find/find.tpl.html',
    		controller: 'FindCtrl',
    		resolve: {isAuth}
    	})
    	.when('/make', {
    		templateUrl: 'app/components/make/make.tpl.html',
    		controller: 'MakeCtrl',
    		resolve: {isAuth}
    	})
    	.otherwise('/');

    });