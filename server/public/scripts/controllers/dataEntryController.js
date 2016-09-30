myApp.controller('dataEntryController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.searchForm = {};

    $scope.searchUpdate = function() {
        var data = $scope.searchForm;
        console.log('data', data);
        // $http.post('dataRoute', data)
        // .then(function(response){
        //   if(response.status == 201){
        //     $scope
        //   }
        // })
        $scope.searchForm = ""
    }
    $scope.dateStart = "2016-09-20";
    $scope.dateEnd = "2016-09-22";

    $scope.federalInfo = {};
    var federalObjectArray = [{
            table: undefined,
            text: "TOTAL"
        }, {
            table: undefined,
            text: "NEW"
        }, {
            table: "victim_ethnicity",
            text: "American Indian or Alaskan Native"
        }, {
            table: "victim_ethnicity",
            text: "Asian"
        }, {
            table: "victim_ethnicity",
            text: "Black or African American"
        }
    ];

    $scope.getStuff = function(){
      federalObjectArray.forEach(function(query, index){
        var data = {};
        data.start = $scope.dateStart;
        data.end = $scope.dateEnd;
        data.text = query.text;
        console.log(data);
        $http({
            method: "POST",
            url: '/reportRoute/' + query.table,
            data: data
        }).then(function(response) {
            console.log("Get Success");
            console.log(response);
            console.log(query.table);
            var objectParam = query.table;
            $scope.federalInfo.objectParam = response.data[0];
        }, function() {
            console.log("Get Error");
        });
      });
    }



    ///**********END OF CONTROLLER***************************************///////
}]);
