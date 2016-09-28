myApp.controller('dataEntryController', ['$scope', '$http', '$location', function($scope, $http, $location){

$scope.searchForm = {};

$scope.searchUpdate = function () {
  var data = $scope.searchForm;
  console.log('data', data);
  // $http.post('dataRoute', data)
  // .then(function(response){
  //   if(response.status == 201){
  //     $scope
  //   }
  // })
  $scope.searchForm=""
}



///**********END OF CONTROLLER***************************************///////
}]);
