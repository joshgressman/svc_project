myApp.controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location){

//Assuming this is the controller for the data viewing, below is the code needed for the accordions

$scope.oneAtATime = true;
$scope.people = 1;
$scope.newPeople = 11;
$scope.primary = 5;
$scope.secondary = 10;
$scope.status = {
  isCustomHeaderOpen: false,
  isFirstOpen: true,
  isFirstDisabled: false
};
$scope.type = 13;
$scope.number = 26;
//End accordion code




///**********END OF CONTROLLER***************************************///////
}]);
