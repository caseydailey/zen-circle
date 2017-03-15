"use strict";

app.controller("LoginCtrl", function($scope, $location, $window, AuthFactory) {

	$scope.login = function() {
		console.log("logging in");
		AuthFactory.authWithProvider()
		.then(function(){
			console.log("this is when href should change");
			let currentUserObj = AuthFactory.getUserObj();
			console.log('currentUserObj:', currentUserObj);
			$window.location.href = "#!/home";
		});
		
	};

	let logout = () => {
		console.log("logging out");
		AuthFactory.logoutUser()
		.then(function(data){
			console.log("logged out");
			$window.location.url = "#!/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

	//when first loaded, make sure no one is logged in
	if(AuthFactory.isAuth()){
		logout();
	}

	

});


