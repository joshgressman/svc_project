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
    $scope.federalInfo = {};
    var federalObjectArray = [{
      //Question 1
        table: "total_overall",
        text: "TOTAL"
    }, {
      //Question 4
        table: "total_new",
        text: "NEW"
    }, {
      //Question 5A
        table: "victim_ethnicity",
        text: "Native American"
    }, {
        table: "victim_ethnicity",
        text: "Asian"
    }, {
        table: "victim_ethnicity",
        text: "African American/Black"
    }, {
        table: "victim_ethnicity",
        text: "Chican@/Latin@"
    }, {
        table: "victim_ethnicity",
        text: "Native Hawaiian/Pacific Islander"
    }, {
        table: "victim_ethnicity",
        text: "White Non-Latino or Caucasian"
    }, {
        table: "victim_ethnicity",
        text: "Other"
    }, {
        table: "victim_ethnicity",
        text: "Multi-Racial"
    }, {
        table: "victim_ethnicity",
        text: "unknown"
    }, {
        table: "victim_ethnicity",
        text: "Not Tracked"
    }, {
        table: "victim_ethnicity_total",
        textSpecial: "(victim_ethnicity iLike 'Native American' OR victim_ethnicity iLike 'Asian' OR victim_ethnicity iLike 'African American/Black' OR victim_ethnicity iLike 'Chican@/Latin@' OR victim_ethnicity iLike 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLike 'White Non-Latino or Caucasian' OR victim_ethnicity iLike 'Other' OR victim_ethnicity iLike 'Multi-Racial' OR victim_ethnicity iLike 'unknown')"
    }, {
      //Question 5B
        table: "victim_gender",
        text: "Male"
    }, {
        table: "victim_gender",
        text: "Female"
    }, {
        table: "victim_gender",
        text: "Non-binary"
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
        table: "victim_gender_total",
        textSpecial: "victim_gender iLike 'Male' OR victim_gender iLike 'Female' OR victim_gender iLike 'Non-binary' OR victim_gender iLike 'other' OR victim_gender iLike 'unknown'"
    }, {
      //Question 5C
        table: "victim_age",
        textSpecial: "(victim_age >= 0 AND victim_age <= 12)"
    }, {
        table: "victim_age",
        textSpecial: "(victim_age >= 13 AND victim_age <= 17)"
    }, {
        table: "victim_age",
        textSpecial: "(victim_age >= 18 AND victim_age <= 24)"
    }, {
        table: "victim_age",
        textSpecial: "(victim_age >= 25 AND victim_age <= 59)"
    }, {
        table: "victim_age",
        textSpecial: "(victim_age >= 60)"
    }, {
        table: "victim_age",
        textSpecial: "victim_age is null"
    }, {
        table: "victim_age",
        textSpecial: "(victim_age >= 0 OR victim_age is null)"
    }, {
      //Question 6A
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
      //Question 6B
        table: "victim_victimization_count",
        textSpecial: "victim_victimization_count >= 2"
    }, {
      //Question 6C
        table: "disability_deaf",
        text: "true"
    }, {
        table: "exception_disability",
        text: "true"
    }, {
        table: "victim_sexual_orientation_total",
        textSpecial: "(victim_sexual_orientation iLike 'lesbian' OR victim_sexual_orientation iLike 'gay' OR victim_sexual_orientation iLike 'bi-sexual' OR victim_sexual_orientation iLike 'other')"
    }, {
        table: "homeless",
        text: "true"
    }, {
        table: "victim_immigrant_total",
        textSpecial: "victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East' OR victim_immigrant iLike 'Other'"
    }, {
        table: "veteran",
        text: "true"
    }, {
        table: "limited_english",
        text: "true"
    }, {
      //Question 7
        table: "exception_compensation",
        text: "true"
    }, {
      //Question 8/9A0=9A4
        table: "information_referral",
        text: "true"
    }, {
        table: "criminal_justice",
        text: "true"
    }, {
        table: "contact_type",
        text: "in-person"
    }, {
        table: "referral_agency",
        text: "not null"
    }, {
        table: "referral_other",
        text: "not null"
    }, {
      //Question 8/9B0-9B9
        table: "personal_advocacy",
        text: "true"
    }, {
        table: "medical_advocacy",
        text: "true"
    }, {
        table: "medical_exam_support",
        text: "true"
    }, {
        table: "legal_law_enforcement_interview",
        text: "true"
    }, {
        table: "legal_immigration",
        text: "true"
    }, {
        table: "legal_intervention",
        text: "true"
    }, {
      //Question 9C0-9C7 9C0: unduplicated totals; 9C1: totals
        table: "contact_type",
        text: "phone"
    }, {
        table: "crisis_counseling_individual",
        text: "true"
    }, {
        table: "crisis_counseling_group",
        text: "true"
    }, {
        table: "emergency_financial",
        text: "true"
    }, {
      //Question 9E0-9E10
        table: "criminal_civic",
        text: "true"
    }, {
        table: "legal_oft_hro",
        text: "true"
    }, {
        table: "other_emergency_justice",
        text: "true"
    }, {
        table: "legal_immigration",
        text: "true"
    }, {
        table: "legal_prosecution_related",
        text: "true"
    }, {
        table: "legal_law_enforcement_interview",
        text: "true"
    }, {
        table: "legal_court_advocacy",
        text: "true"
    }];

    var disabilityStatusTotal = ["disability_physical", "disability_mental", "disability_developmental", "disability_other", "disability_blind"];
    var victimCompensationTotal = ["emergency_financial", "reparations_claims"];
    var criminalJusticProcessTotal = ["information_criminal_justice", "legal_law_enforcement_interview", "legal_prosecution_related", "legal_court_advocacy"];
    var personalAdvocacyTotal = ["medical_accompaniment_medical", "medical_accompaniment_dental", "medical_exam_support", "legal_law_enforcement_interview", "legal_immigration", "legal_intervention", "transportation"];
    var medicalAdvocacyTotal = ["medical_accompaniment_medical", "medical_accompaniment_dental"];
    var criminalCivicTotal = ["legal_law_enforcement_interview", "legal_prosecution_related", "legal_court_advocacy", "legal_oft_hro", "legal_immigration", "legal_intervention"];
    var individualCounselingTotal = ["crisis_counseling_individual", ];

    $scope.countyInfo = {};
    var countyObjectArray = [{
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
            text: "Native American"
        }, {
            table: "victim_ethnicity",
            text: "Asian"
        }, {
            table: "victim_ethnicity",
            text: "African American/Black"
        }, {
            table: "victim_ethnicity",
            text: "Chican@/Latin@"
        }, {
            table: "victim_ethnicity",
            text: "Native Hawaiian/Pacific Islander"
        }, {
            table: "victim_ethnicity",
            text: "White Non-Latino or Caucasian"
        }, {
            table: "victim_ethnicity",
            text: "Other"
        }, {
            table: "victim_ethnicity",
            text: "Multi-Racial"
        }, {
            table: "victim_ethnicity",
            text: "unknown"
        }, {
            table: "victim_ethnicity",
            text: "Not Tracked"
        }, {
            table: "victim_ethnicity_total",
            textSpecial: "(victim_ethnicity iLike 'Native American' OR victim_ethnicity iLike 'Asian' OR victim_ethnicity iLike 'African American/Black' OR victim_ethnicity iLike 'Chican@/Latin@' OR victim_ethnicity iLike 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLike 'White Non-Latino or Caucasian' OR victim_ethnicity iLike 'Other' OR victim_ethnicity iLike 'Multi-Racial' OR victim_ethnicity iLike 'unknown')"
        }, {
            table: "victim_gender",
            text: "Male"
        }, {
            table: "victim_gender",
            text: "Female"
        }, {
            table: "victim_gender",
            text: "Non-binary"
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
            table: "victim_gender_total",
            textSpecial: "victim_gender iLike 'Male' OR victim_gender iLike 'Female' OR victim_gender iLike 'Non-binary' OR victim_gender iLike 'other' OR victim_gender iLike 'unknown'"
        }, {
            table: "victim_trans",
            text: "true"
        }, {
            table: "victim_immigrant",
            text: "Africa"
        }, {
            table: "victim_immigrant",
            text: "Asia"
        }, {
            table: "victim_immigrant",
            text: "Europe"
        }, {
            table: "victim_immigrant",
            text: "Mex/Cen/So America"
        }, {
            table: "victim_immigrant",
            text: "Middle East"
        }, {
            table: "victim_immigrant",
            text: "Other"
        }, {
            table: "victim_immigrant",
            text: "Unknown"
        }, {
            table: "victim_immigrant",
            text: "No"
        }, {
            table: "victim_immigrant_total",
            textSpecial: "victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East' OR victim_immigrant iLike 'Other'"
        }, {
            table: "victim_age",
            textSpecial: "(victim_age >= 0 AND victim_age <= 17)"
        }, {
            table: "victim_age",
            textSpecial: "(victim_age >= 18 AND victim_age <= 29)"
        }, {
            table: "victim_age",
            textSpecial: "(victim_age >= 30 AND victim_age <= 44)"
        }, {
            table: "victim_age",
            textSpecial: "(victim_age >= 45 AND victim_age <= 65)"
        }, {
            table: "victim_age",
            textSpecial: "(victim_age >= 66)"
        }, {
            table: "victim_age",
            textSpecial: "victim_age is null"
        }, {
            table: "victim_age",
            textSpecial: "(victim_age >= 0 OR victim_age is null)"
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
            table: "victim_victimization_count",
            textSpecial: "victim_victimization_count >= 2"
        }, {
            table: "counseling_individual_totals",
            text: "true"
        }, {
            table: "crisis_counseling_group",
            textSpecial: "true"
        }];

    $scope.getStuffCounty = function() {
      console.log('getting stuff');
        countyObjectArray.forEach(function(query, index) {
            var data = {};

            //converts date to workable format
            var start = $scope.dateStart;
            var convertedStart = start.toISOString().slice(0,10);
            var end = $scope.dateEnd;
            var convertedEnd = end.toISOString().slice(0,10);

            data.start = convertedStart;
            data.end = convertedEnd;
            data.text = query.text;
            data.textSpecial = query.textSpecial;
            console.log('clientside data to query:', data);

            if (query.table == "counseling_individual_totals") {
                individualCounselingTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/county' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.countyInfo.individualTotal += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else {
                $http({
                    method: "POST",
                    url: '/reportRoute/county/' + query.table,
                    data: data
                }).then(function(response) {
                    console.log("Get Success");
                    // console.log(response);
                    // console.log(query.table);
                    var objectParam = query.table;
                    $scope.countyInfo.objectParam = response.data[0];
                    // console.log(response.data[0]);
                }, function() {
                    console.log("Get Error");
                });
            }
        });
    };

    $scope.getStuffFederal = function() {
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
            data.textSpecial = query.textSpecial;
            console.log('clientside data to query:', data);

            if (query.table == "exception_disability") {
                disabilityStatusTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.federalInfo.disabilityTotal += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "exception_compensation") {
                victimCompensationTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.federalInfo.victimCompensation += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "criminal_justice") {
                criminalJusticProcessTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.federalInfo.criminalJusticeProcess += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "personal_advocacy") {
                personalAdvocacyTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.federalInfo.personalAdvocacy += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "medical_advocacy") {
                medicalAdvocacyTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.federalInfo.medicalAdvocacy += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "criminal_civic") {
                criminalCivicTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log(response);
                        $scope.federalInfo.criminalCivic += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else {
                $http({
                    method: "POST",
                    url: '/reportRoute/federal/' + query.table,
                    data: data
                }).then(function(response) {
                    console.log("Get Success");
                    console.log('response:', response);
                    console.log('query table:', query.table);
                    var objectParam = query.table;
                    $scope.federalInfo[objectParam] = response.data[0];
                    console.log(response.data[0]);
                }, function() {
                    console.log("Get Error");
                });
            }
            console.log($scope.federalInfo);
        });
    };




//Where the Playground dropdowns code starts
      // $scope.playground = {};
      // $scope.dropdownTracker = [{dropdown: true}]
      // var dropdownNum = 0;
      // $scope.selected = "";
      // $scope.selectedOne = "";
      // $scope.checkSelection = function(){
      //   console.log("$scope.selected", $scope.selected);
      //   switch($scope.selected){
      //     case "violenceTypeSelected":
      //     $scope.violenceTypeSelected = true;
      //     $scope.disabilityStatusSelected = false;
      //     break;
      //     case "disabilityStatusSelected":
      //     $scope.disabilityStatusSelected = true;
      //     $scope.violenceTypeSelected = false;
      //   }
      // };
      // $scope.checkSelectionOne = function(){
      //   console.log("$scope.selectedOne", $scope.selectedOne);
      //   switch($scope.selectedOne){
      //     case undefined:
      //     $scope.violenceTypeSelected = false;
      //     $scope.disabilityStatusSelected = false;
      //     break;
      //     case "violenceTypeSelectedOne":
      //     $scope.violenceTypeSelected = true;
      //     $scope.disabilityStatusSelected = false;
      //     break;
      //     case "disabilityStatusSelectedOne":
      //     $scope.disabilityStatusSelected = true;
      //     $scope.violenceTypeSelected = false;
      //   }
      // };
      // $scope.showFields = false;
      // $scope.typeOViolence = "";
      // $scope.typeODisability = "";
      // $scope.typeOEthnicity = "";
      // $scope.typeOVictim = "";
      // $scope.getTest = function(){
      //   console.log("$scope.typeOViolence", $scope.typeOViolence);
      //   console.log("$scope.typeODisability", $scope.typeODisability);
      //   console.log("$scope.typeOEthnicity", $scope.typeOEthnicity);
      //   console.log("$scope.typeOVictim", $scope.typeOVictim);
      //   console.log("$scope.playground.violence_adult_sexual", $scope.playground.violence_adult_sexual);
      //   console.log("$scope.playground.violence_bullying", $scope.playground.violence_bullying);
      //   console.log("$scope.playground.violence_child_pornography", $scope.playground.violence_child_pornography);
      //   console.log("$scope.playground.disability_blind", $scope.playground.disability_blind);
      //   console.log("$scope.playground.disability_physical", $scope.playground.disability_physical);
      //   console.log("$scope.playground.disability_mental", $scope.playground.disability_mental);
      // }
      // $scope.nextDropdown = function(){
      //   dropdownNum++;
      //   $scope.dropdownTracker.push({dropdown: true});
      //   console.log("$scope.dropdownTracker", $scope.dropdownTracker);
      // }
//End code for Playground dropdowns

    ///**********END OF CONTROLLER***************************************///////
}]);
