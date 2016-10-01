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
      //Question 1
        table: undefined,
        text: "TOTAL"
    }, {
      //Question 4
        table: undefined,
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
        textSpecial: "(victim_ethnicity iLike 'Native American' OR victim_ethnicity iLike 'Asian' OR victim_ethnicity iLike 'African American/Black' OR victim_ethnicity iLike 'Chican@/Latin@' OR victim_ethnicity iLike 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLike 'White Non-Latino or Caucasian' OR victim_ethnicity iLike 'Other' OR victim_ethnicity iLike 'Multi-Racial' OR victim_ethnicity iLike 'unknown' or victim_ethnicity iLike 'Not Tracked')"
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
        textSpecial: "iLIKE 'unknown'"
    }, {
        table: "victim_age",
        text: "Not Tracked"
    }, {
        table: "victim_age",
        textSpecial: "(victim_age >= 0 AND victim_age iLIke 'unknown')"
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
        table: "violence_more_than_one",
        text: "true"
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
        text: "victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East'"
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
        text: "true"
    }, {
        table: "referral_other",
        text: "true"
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
        table: "hotline_crisis",
        text: "contact_type iLike 'phone'"
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
            data.textSpecial = query.textSpecial;
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
            } else if (query.table == "personal_advocacy") {
                personalAdvocacyTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.personalAdvocacy += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "medical_advocacy") {
                medicalAdvocacyTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.medicalAdvocacy += parseInt(response.data[0]);
                    }, function() {
                        console.log("Get Error");
                    });
                });
            } else if (query.table == "criminal_civic") {
                criminalCivicTotal.forEach(function(table) {
                    $http({
                        method: "POST",
                        url: '/reportRoute/' + table,
                        data: data
                    }).then(function(response) {
                        console.log("Get Success");
                        console.log(response);
                        $scope.federalInfo.criminalCivic += parseInt(response.data[0]);
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
