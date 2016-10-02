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
            table: "victim_zipcode",
            text: "55111"
        }, {
            table: "victim_zipcode",
            text: "55305"
        }, {
            table: "victim_zipcode",
            text: "55311"
        }, {
            table: "victim_zipcode",
            text: "55316"
        }, {
            table: "victim_zipcode",
            text: "55317"
        }, {
            table: "victim_zipcode",
            text: "55327"
        }, {
            table: "victim_zipcode",
            text: "55328"
        }, {
            table: "victim_zipcode",
            text: "55331"
        }, {
            table: "victim_zipcode",
            text: "55340"
        }, {
            table: "victim_zipcode",
            text: "55341"
        }, {
            table: "victim_zipcode",
            text: "55343"
        }, {
            table: "victim_zipcode",
            text: "55344"
        }, {
            table: "victim_zipcode",
            text: "55345"
        }, {
            table: "victim_zipcode",
            text: "55346"
        }, {
            table: "victim_zipcode",
            text: "55347"
        }, {
            table: "victim_zipcode",
            text: "55356"
        }, {
            table: "victim_zipcode",
            text: "55357"
        }, {
            table: "victim_zipcode",
            text: "55359"
        }, {
            table: "victim_zipcode",
            text: "55361"
        }, {
            table: "victim_zipcode",
            text: "55364"
        }, {
            table: "victim_zipcode",
            text: "55369"
        }, {
            table: "victim_zipcode",
            text: "55373"
        }, {
            table: "victim_zipcode",
            text: "55374"
        }, {
            table: "victim_zipcode",
            text: "55375"
        }, {
            table: "victim_zipcode",
            text: "55384"
        }, {
            table: "victim_zipcode",
            text: "55387"
        }, {
            table: "victim_zipcode",
            text: "55388"
        }, {
            table: "victim_zipcode",
            text: "55391"
        }, {
            table: "victim_zipcode",
            text: "55392"
        }, {
            table: "victim_zipcode",
            text: "55401"
        }, {
            table: "victim_zipcode",
            text: "55402"
        }, {
            table: "victim_zipcode",
            text: "55403"
        }, {
            table: "victim_zipcode",
            text: "55404"
        }, {
            table: "victim_zipcode",
            text: "55405"
        }, {
            table: "victim_zipcode",
            text: "55406"
        }, {
            table: "victim_zipcode",
            text: "55407"
        }, {
            table: "victim_zipcode",
            text: "55408"
        }, {
            table: "victim_zipcode",
            text: "55409"
        }, {
            table: "victim_zipcode",
            text: "55410"
        }, {
            table: "victim_zipcode",
            text: "55411"
        }, {
            table: "victim_zipcode",
            text: "55412"
        }, {
            table: "victim_zipcode",
            text: "55413"
        }, {
            table: "victim_zipcode",
            text: "55414"
        }, {
            table: "victim_zipcode",
            text: "55415"
        }, {
            table: "victim_zipcode",
            text: "55416"
        }, {
            table: "victim_zipcode",
            text: "55417"
        }, {
            table: "victim_zipcode",
            text: "55418"
        }, {
            table: "victim_zipcode",
            text: "55419"
        }, {
            table: "victim_zipcode",
            text: "55420"
        }, {
            table: "victim_zipcode",
            text: "55422"
        }, {
            table: "victim_zipcode",
            text: "55423"
        }, {
            table: "victim_zipcode",
            text: "55424"
        }, {
            table: "victim_zipcode",
            text: "55425"
        }, {
            table: "victim_zipcode",
            text: "55426"
        }, {
            table: "victim_zipcode",
            text: "55427"
        }, {
            table: "victim_zipcode",
            text: "55428"
        }, {
            table: "victim_zipcode",
            text: "55429"
        }, {
            table: "victim_zipcode",
            text: "55430"
        }, {
            table: "victim_zipcode",
            text: "55431"
        }, {
            table: "victim_zipcode",
            text: "55435"
        }, {
            table: "victim_zipcode",
            text: "55436"
        }, {
            table: "victim_zipcode",
            text: "55437"
        }, {
            table: "victim_zipcode",
            text: "55438"
        }, {
            table: "victim_zipcode",
            text: "55439"
        }, {
            table: "victim_zipcode",
            text: "55441"
        }, {
            table: "victim_zipcode",
            text: "55442"
        }, {
            table: "victim_zipcode",
            text: "55443"
        }, {
            table: "victim_zipcode",
            text: "55444"
        }, {
            table: "victim_zipcode",
            text: "55445"
        }, {
            table: "victim_zipcode",
            text: "55446"
        }, {
            table: "victim_zipcode",
            text: "55447"
        }, {
            table: "victim_zipcode",
            text: "55450"
        }, {
            table: "victim_zipcode",
            text: "55454"
        }, {
            table: "victim_zipcode",
            text: "55455"
        }, {
            table: "victim_zipcode",
            text: "Other"
        }, {
            table: "victim_zipcode",
            text: "Unknown"
        }, {
            table: "victim_zipcode",
            text: "Total"
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
            table: "victim_immigrant",
            text: "Africa"
        }, {
            table: "victim_immigrant",
            text: "Asia"
        }, {
            table: "victim_immigrant",
            text: "Europ"
        }, {
            table: "victim_immigrant",
            text: "Mex/Cen/South America"
        }, {
            table: "victim_immigrant",
            text: "Middle East"
        }, {
            table: "victim_immigrant",
            text: "Other"
        }, {
            table: "victim_immigrant",
            text: "Unknown/Pass"
        }, {
            table: "victim_immigrant",
            text: "No"
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
            text: "null"
            //Not Reported
        }, {
            table: "victim_age",
            text: "Not Tracked"
            //Revisiting later?
        }, {
            table: "victim_age",
            text: "Total"
        }, {
            table: "disability_blind",
            text: "true"
        }, {
            table: "disability_physical",
            text: "true"
        }, {
            table: "disability_mental",
            text: "true"
        }, {
            table: "disability_deaf",
            text: "true"
        }, {
            table: "disability_developmental",
            text: "true"
        }, {
            table: "disability_none",
            text: "true"
        }, {
            table: "disability_other",
            text: "true"
        }, {
            table: "disability_unknown",
            text: "true"
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
        },

    ];
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




//Where the Playground dropdowns code starts
      $scope.playground = {};
      $scope.dropdownTracker = [{dropdown: true}]
      var dropdownNum = 0;
      $scope.selected = "";
      $scope.selectedOne = "";
      $scope.checkSelection = function(){
        console.log("$scope.selected", $scope.selected);
        switch($scope.selected){
          case "violenceTypeSelected":
          $scope.violenceTypeSelected = true;
          $scope.disabilityStatusSelected = false;
          break;
          case "disabilityStatusSelected":
          $scope.disabilityStatusSelected = true;
          $scope.violenceTypeSelected = false;
        }
      };
      $scope.checkSelectionOne = function(){
        console.log("$scope.selectedOne", $scope.selectedOne);
        switch($scope.selectedOne){
          case undefined:
          $scope.violenceTypeSelected = false;
          $scope.disabilityStatusSelected = false;
          break;
          case "violenceTypeSelectedOne":
          $scope.violenceTypeSelected = true;
          $scope.disabilityStatusSelected = false;
          break;
          case "disabilityStatusSelectedOne":
          $scope.disabilityStatusSelected = true;
          $scope.violenceTypeSelected = false;
        }
      };
      $scope.showFields = false;
      $scope.typeOViolence = "";
      $scope.typeODisability = "";
      $scope.typeOEthnicity = "";
      $scope.typeOVictim = "";
      $scope.getTest = function(){
        console.log("$scope.typeOViolence", $scope.typeOViolence);
        console.log("$scope.typeODisability", $scope.typeODisability);
        console.log("$scope.typeOEthnicity", $scope.typeOEthnicity);
        console.log("$scope.typeOVictim", $scope.typeOVictim);
        console.log("$scope.playground.violence_adult_sexual", $scope.playground.violence_adult_sexual);
        console.log("$scope.playground.violence_bullying", $scope.playground.violence_bullying);
        console.log("$scope.playground.violence_child_pornography", $scope.playground.violence_child_pornography);
        console.log("$scope.playground.disability_blind", $scope.playground.disability_blind);
        console.log("$scope.playground.disability_physical", $scope.playground.disability_physical);
        console.log("$scope.playground.disability_mental", $scope.playground.disability_mental);
      }
      $scope.nextDropdown = function(){
        dropdownNum++;
        $scope.dropdownTracker.push({dropdown: true});
        console.log("$scope.dropdownTracker", $scope.dropdownTracker);
      }
//End code for Playground dropdowns

    ///**********END OF CONTROLLER***************************************///////
}]);
