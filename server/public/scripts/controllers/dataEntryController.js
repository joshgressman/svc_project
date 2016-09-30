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
    $scope.dateStart = "";
    $scope.dateEnd = "";

    //POST will need to send an object with the dates over. Can utilize Req.params to get info from the url (Table name most likely)
    //still need [0].(object named thing) for result.rows
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
            url: '/dataRoute/' + query.table,
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
        //Other Specify doesn't need a count
    }




    // SELECT COUNT (*) FROM victim WHERE victim_ethnicity iLIKE 'Native American' AND victim_new is null AND victim_prior_oct is true AND contact_date >= " + "'" +  dateRange.start + "'" + " AND contact_date < " + "'" + dateRange.end + "'"



    ///**********END OF CONTROLLER***************************************///////
}]);
