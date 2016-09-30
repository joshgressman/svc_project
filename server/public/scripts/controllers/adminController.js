myApp.controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    //Assuming this is the controller for the data viewing, below is the code needed for the accordions

    $scope.oneAtATime = true;
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    //End accordion code

    $scope.dateStart = "2016-09-20";
    $scope.dateEnd = "2016-09-22";

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
        text: "Not Reported"
    }, {
        table: "victim_ethnicity",
        text: "Not Tracked"
    }, {
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
        text: "Not Reported"
    }, {
        table: "victim_gender",
        text: "Not Tracked"
    }, {
        table: "victim_gender",
        text: "Total"
    }, {
        table: "victim_age",
        text: "0 - 12"
    }, {
        table: "victim_age",
        text: "13 - 17"
    }, {
        table: "victim_age",
        text: "18 - 24"
    }, {
        table: "victim_age",
        text: "25 - 59"
    }, {
        table: "victim_age",
        text: "60 and Older"
    }, {
        table: "victim_age",
        text: "Not Reported"
    }, {
        table: "victim_age",
        text: "Not Tracked"
    }, {
        table: "victim_age",
        text: "Total"
    }, {
        table: "victim_type",
        text: "Adult Physical Assault"
    }, {
        table: "victim_type",
        text: "Adult Sexual Assault"
    }, {
        table: "victim_type",
        text: "Adults Sexual Abuse/Assault"
    }, {
        table: "victim_type",
        text: "Arson"
    }, {
        table: "victim_type",
        text: "Bullying"
    }, {
        table: "victim_type",
        text: "Burglary"
    }, {
        table: "victim_type",
        text: "Child Physical Abuse or Neglect"
    }, {
        table: "victim_type",
        text: "Child Pornography"
    }, {
        table: "victim_type",
        text: "Child Sexual Abuse or Neglect"
    }, {
        table: "victim_type",
        text: "Domestic And/Or Family Violence"
    }, {
        table: "victim_type",
        text: "DUI/DWI Incidents"
    }, {
        table: "victim_type",
        text: "Elder Abuse or Neglect"
    }, {
        table: "victim_type",
        text: "Hate Crime"
    }, {
        table: "victim_type",
        text: "Human Trafficking: Labor"
    }, {
        table: "victim_type",
        text: "Human Trafficking: Sex"
    }, {
        table: "victim_type",
        text: "Identity theft"
    }, {
        table: "victim_type",
        text: "Kidnapping"
    }, {
        table: "victim_type",
        text: "Mass Violence"
    }, {
        table: "victim_type",
        text: "Other Vehicular Victimization"
    }, {
        table: "victim_type",
        text: "Robbery"
    }, {
        table: "victim_type",
        text: "Stalking/Harassment"
    }, {
        table: "victim_type",
        text: "Survivors of Homicide Victims"
    }, {
        table: "victim_type",
        text: "Teen Dating Victimization"
    }, {
        table: "victim_type",
        text: "Terrorism"
    }, {
        table: "victim_type",
        text: "Other"
    }, {
        table: "disability_deaf",
        text: "Deaf/Hard of Hearing"
    }, {
        table: "exception_disability",
        text: "Cognitive/Physical/Mental Disabilities"
    }, {
        table: "victim_sexual_orientation",
        text: "LGBTQ"
    }, {
        table: "disability_deaf",
        text: "Deaf/Hard of Hearing"
    }
];
    var disabilityStatusTotal = ['disability_physical', 'disability_mental', 'disability_developmental', 'disability_other'];
    $scope.getStuff = function() {
        federalObjectArray.forEach(function(query, index) {
            var data = {};
            data.start = $scope.dateStart;
            data.end = $scope.dateEnd;
            data.text = query.text;
            console.log(data);
            if (query.table == "exception_disability") {
                disabilityStatusTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + query.table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.disabilityTotal += parseInt(response.data[0]);
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
