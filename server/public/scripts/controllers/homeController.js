myApp.controller('homeController', ['$scope', '$http', '$location', 'loggedinFactory', function($scope, $http, $location, loggedinFactory){

  // $scope.check = false;
  // $scope.loggedinFactory = loggedinFactory;
  //
  // $scope.isLoggedIn = function() {
  //   loggedinFactory.isLoggedIn().then(function(response) {
  //     console.log('The person logged in:', response);
  //     console.log('the type of the person logged in:', response.user_type)
  //
  //     if (response.user_type == !null) {
  //       $scope.check = true;
  //     }
  //   });
  // }

    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "You must enter a username and password.";
      } else {
        // console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            // console.log('success: ', response.data.user_type);
            // location works with SPA (ng-route)
            // console.log('redirecting to' + response.data.user_type + ' page');
            if (response.data.user_type == 'admin') {
              $location.path('/admin');
            } else if (response.data.user_type == 'standard') {
              $location.path('/data');
            }
          } else {
            // console.log('failure: ', response);
            $scope.message = "Incorrect login information.";
          }
        });
      }
    }

    $scope.logout = function() {
      $http.get('/user/logout').then(function(response) {
        // console.log('logged out');
        $location.path("/home");
      });
    }


///**********END OF CONTROLLER***************************************///////
}]);
