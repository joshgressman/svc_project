myApp.controller('userController', ['$scope', '$http', '$location', '$uibModal', function($scope, $http, $location, $uibModal) {
  console.log("userController is running");

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
            $scope.confirmation = 26;
            $scope.open($scope.confirmation);
          $location.path('/admin');
          },
          function(response) {
            console.log('error');
          });
      }
    }
    $scope.open = function (_confirmation) {

        var modalInstance = $uibModal.open({
          controller: "ModalInstanceCtrl",
          templateUrl: 'myModalContent.html',
            resolve: {
                confirmation: function()
                {
                    return _confirmation;
                }
            }
             });

    };
}]);
