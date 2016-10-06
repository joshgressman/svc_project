myApp.controller('userController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.user = {
    username: '',
    password: '',
    type: ''
  }

  $scope.message = '';

  $scope.addUser = function() {
      var data = $scope.user;

        if($scope.user.username == '' || $scope.user.password == '') {
          $scope.message = "You must enter a username and password to create a new user.";
        } else {
          console.log('sending to server...', data);
          $http.post('/register', data).then(function(response) {
          console.log('success');
          $scope.user = {
              username: '',
              password: ''
            };
          $location.path('/admin');
          },
          function(response) {
            console.log('error');
          });
      }
    }
}]);
