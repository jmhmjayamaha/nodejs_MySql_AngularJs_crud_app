var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
	  $routeProvider
	//   .when("/", {
	// 	templateUrl : "index.html"
	// })
	.when("/save", {
		templateUrl : "pages/save.html"
	})
	.when("/update", {
		templateUrl : "pages/update.html"
	})
	.when("/search", {
		templateUrl : "pages/search.html"
	});
});
