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
        $scope.getAllUsers();
        $scope.reset();
      }
    );
  }

  $scope.updateUser = function() {
    var dataObject = {
      "id": $scope.userId,
      "name" : $scope.name,
	    "age" : $scope.age,
	    "address" : $scope.address
    };

    $http.put("http://localhost:8081/api/updateUser" , dataObject).then(
      function() {
        alert("successfully updated");
        $scope.getAllUsers();
        $scope.reset();
      }
    );
  }

  $scope.deleteUserById = function(userId) {
		$http.delete("http://localhost:8081/api/deleteUser" , {params:{"id": userId}}).then(
			function() {
				alert("successfully deleted");
				$scope.getAllUsers();
			} ,
			function() {
				alert("No such User")
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
