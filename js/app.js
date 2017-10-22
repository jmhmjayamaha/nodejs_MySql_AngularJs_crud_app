var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
	  $routeProvider
	//   .when("/", {
	// 	templateUrl : "index.html"
	// })
	.when("/save", {
		templateUrl : "pages/save.html",
		controller: "addController"
	})
	.when("/update", {
		templateUrl : "pages/update.html",
		controller : "updateUser"
	})
	.when("/search", {
		templateUrl : "pages/search.html",
		controller : "deleteUser"
	});
});
