app.controller("myController", function($scope, $http) {

  $scope.getAllUsers = function() {
		$http.get("http://localhost:8081/api/listUsers").then(
				function(response){
					$scope.users = response.data;
				}
		);
	}

  $scope.getAllUsers();

  $scope.addUser = function() {
    var dataObject = {
      "name" : $scope.name,
	    "age" : $scope.age,
	    "address" : $scope.address
    };

    $http.post("http://localhost:8081/api/addUser" , dataObject).then(
      function() {
        alert("successfully added");
        $scope.reset();
      }
    );
  }

  $scope.reset = function() {
    $scope.userId = "";
    $scope.name = "";
    $scope.age = "";
    $scope.address = "";
  }
});
