myApp.controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    //Assuming this is the controller for the data viewing, below is the code needed for the accordions

    $scope.oneAtATime = true;
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    //End accordion code

    $scope.dateStart = "";
    $scope.dateEnd = "";

    //POST will need to send an object with the dates over. Can utilize Req.params to get info from the url (Table name most likely)
    //still need [0].(object named thing) for result.rows
    //only need to get counts for reports;
    //table actually equals the column the thing is in;
    //text equals the query criteria;
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
    }, {
        table: "victim_ethnicity",
        text: "Hispanic or Latino"
    }, {
        table: "victim_ethnicity",
        text: "Native Hawaiian or Other Pacific Islander"
    }, {
        table: "victim_ethnicity",
        text: "White Non-Latino or Caucasian"
    }, {
        table: "victim_ethnicity",
        text: "Some Other Race"
    }, {
        table: "victim_ethnicity",
        text: "Multiple Races"
    }, {
        table: "victim_ethnicity",
        text: "unknwon"
    }, {
        table: "victim_ethnicity",
        text: "Not Tracked"
    }, {
      //fix: not boolean totals
        table: "victim_ethnicity",
        text: "Race/Ethnicity Total"
    }, {
        table: "victim_gender",
        text: "Male"
    }, {
        table: "victim_gender",
        text: "Female"
    }, {
        table: "victim_gender",
        text: "Other"
    }, {
        table: "victim_gender",
        text: "unknown"
    }, {
        table: "victim_gender",
        text: "Not Tracked"
    }, {
      //fix: not boolean totals
        table: "victim_gender",
        text: "Total"
    }, {
        table: "victim_age",
        text: "(victim_age <= 0 AND victim_age >= 12)"
    }, {
        table: "victim_age",
        text: "(victim_age <= 13 AND victim_age >= 17)"
    }, {
        table: "victim_age",
        text: "(victim_age <= 18 AND victim_age >= 24)"
    }, {
        table: "victim_age",
        text: "(victim_age <= 25 AND victim_age >= 59)"
    }, {
        table: "victim_age",
        text: "(victim_age <= 60)"
    }, {
        table: "victim_age",
        text: "iLIKE 'unknown'"
    }, {
        table: "victim_age",
        text: "Not Tracked"
    }, {
      //fix: not boolean totals
        table: "victim_age",
        text: "Total"
    }, {
        table: "violence_adult_sexual",
        text: "true"
    }, {
        table: "violence_adult_child_family",
        text: "true"
    }, {
        table: "violence_adult_child_other",
        text: "true"
    }, {
        table: "violence_bullying",
        text: "true"
    }, {
        table: "violence_child_pornography",
        text: "true"
    }, {
        table: "violence_domestic",
        text: "true"
    }, {
        table: "violence_elder",
        text: "true"
    }, {
        table: "violence_exposing",
        text: "true"
    }, {
        table: "violence_internet",
        text: "true"
    }, {
        table: "violence_minor_family",
        text: "true"
    }, {
        table: "violence_minor_other",
        text: "true"
    }, {
        table: "violence_phone",
        text: "true"
    }, {
        table: "violence_exploitation",
        text: "true"
    }, {
        table: "violence_harassment",
        text: "true"
    }, {
        table: "violence_stalking",
        text: "true"
    }, {
        table: "violence_teen_dating",
        text: "true"
    }, {
        table: "violence_other",
        text: "true"
    }, {
        table: "violence_unknown",
        text: "true"
    }, {
        table: "disability_deaf",
        text: "true"
    }, {
        table: "exception_disability",
        text: "true"
    }, {
      //total: make others like this?
        table: "victim_sexual_orientation",
        text: "(victim_sexual_orientation iLike 'lesbian' OR victim_sexual_orientation iLike 'gay' OR victim_sexual_orientation iLike 'bi-sexual' OR victim_sexual_orientation iLike 'other')"
    }, {
        table: "homeless",
        text: "true"
    }, {
      //fix: not boolean totals
        table: "victim_immigrant",
        text: "true"
    }, {
        table: "veteran",
        text: "true"
    }, {
        table: "limited_english",
        text: "true"
    }, {
        table: "information_referral",
        text: "true"
    }, {
        table: "criminal_justice",
        text: "true"
    }, {
      //continue here Q9-A2
        table: "",
        text: ""
    }, {
        table: "",
        text: ""
    }, {
        table: "",
        text: ""
    }, {
        table: "",
        text: ""
    }, {
        table: "",
        text: ""
    }];

    var disabilityStatusTotal = ["disability_physical", "disability_mental", "disability_developmental", "disability_other", "disability_blind"];
    var victimCompensationTotal = ["emergency_financial", "reparations_claims"];
    var criminalJusticProcessTotal = ["information_criminal_justice", "legal_law_enforcement_interview", "legal_prosecution_related", "legal_court_advocacy"];

    $scope.getStuff = function() {
      console.log('getting stuff');
        federalObjectArray.forEach(function(query, index) {
            var data = {};

            //converts date to workable format
            var start = $scope.dateStart;
            var convertedStart = start.toISOString().slice(0,10);
            var end = $scope.dateEnd;
            var convertedEnd = end.toISOString().slice(0,10);

            data.start = convertedStart;
            data.end = convertedEnd;
            data.text = query.text;
            console.log(data);
            if (query.table == "exception_disability") {
                disabilityStatusTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.disabilityTotal += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "exception_compensation") {
                victimCompensationTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.victimCompensation += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "criminal_justice") {
                criminalJusticProcessTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.criminalJusticeProcess += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else {
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
            }
        });
    }



    ///**********END OF CONTROLLER***************************************///////
}]);
