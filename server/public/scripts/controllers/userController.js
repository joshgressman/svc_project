myApp.controller('userController', ['$scope', '$http', '$location', 'loggedinFactory', function($scope, $http, $location, loggedinFactory) {

  loggedinFactory.isLoggedIn().then(function(response) {
      console.log('The person logged in:', response);
      console.log('the type of the person logged in:', response.user_type)
      // $scope.user = response;
      if (response.user_type !== 'admin') {
          console.log('send home');
          $location.path('/home');
      }
  });

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
          $location.path('/users');
          $scope.getUser();
          },
          function(response) {
            console.log('error');
          });
      }
  }

  $scope.getUser = function() {
      console.log('called getUser');
      $http.get('/getUser').then(function(response) {
        console.log(response.data);
        $scope.users = response.data;
      });
  }

  $scope.deleteUser = function(userID){
        console.log(userID);
        $http.delete('/deleteUser/' + userID).then(function(){
          console.log('delete went through');
          $scope.getUser();
        });
      }

}]);
