myApp.controller('adminController', ['$scope', '$http', '$location', '$uibModal', 'loggedinFactory', function($scope, $http, $location, $uibModal, loggedinFactory) {

    loggedinFactory.isLoggedIn().then(function(response) {
        console.log('The person logged in:', response);
        console.log('the type of the person logged in:', response.user_type)
            // $scope.user = response;
        if (response.user_type !== 'admin') {
            console.log('send home');
            $location.path('/home');
        }
    });

    // console.log("Admin is running");
    $scope.myFunction = function() {
            window.print();
        }
        //Assuming this is the controller for the data viewing, below is the code needed for the accordions

    $scope.oneAtATime = true;
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    //End accordion code

    $scope.showFedData = false;
    $scope.showCountyData = false;
    $scope.dateStart = "";
    $scope.dateEnd = "";
    $scope.total = {};

    function updateScroll() {
        window.scrollBy(0, -9000);
    }

    //federalObjectArray will send parameters to the server side queries; table = column name, text/textSpecial = query text
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
        text: "Native American",
        textSpecial: "native_american"
    }, {
        table: "victim_ethnicity",
        text: "Asian",
        textSpecial: "asian"
    }, {
        table: "victim_ethnicity",
        text: "African American/Black",
        textSpecial: "african_american_black"
    }, {
        table: "victim_ethnicity",
        text: "Chican@/Latin@",
        textSpecial: "chicano_latino"
    }, {
        table: "victim_ethnicity",
        text: "Native Hawaiian/Pacific Islander",
        textSpecial: "hawaiian_pacific_islander"
    }, {
        table: "victim_ethnicity",
        text: "White Non-Latino or Caucasian",
        textSpecial: "white"
    }, {
        table: "victim_ethnicity",
        text: "Other",
        textSpecial: "other"
    }, {
        table: "victim_ethnicity",
        text: "Multi-Racial",
        textSpecial: "multi-racial"
    }, {
        table: "victim_ethnicity",
        text: null,
        textSpecial: "unknown"
    }, {
        table: "victim_ethnicity_total",
        textSpecial: "(victim_ethnicity iLike 'Native American' OR victim_ethnicity iLike 'Asian' OR victim_ethnicity iLike 'African American/Black' OR victim_ethnicity iLike 'Chican@/Latin@' OR victim_ethnicity iLike 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLike 'White Non-Latino or Caucasian' OR victim_ethnicity iLike 'Other' OR victim_ethnicity iLike 'Multi-Racial' OR victim_ethnicity is null)"
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
        text: null
    }, {
        table: "victim_gender_total",
        textSpecial: "(victim_gender iLike 'Male' OR victim_gender iLike 'Female' OR victim_gender iLike 'Non-binary' OR victim_gender iLike 'other' OR victim_gender is null)"
    }, {
        //Question 5C
        table: "victim_age",
        text: "012",
        textSpecial: "(victim_age >= 0 AND victim_age <= 12)"
    }, {
        table: "victim_age",
        text: "1317",
        textSpecial: "(victim_age >= 13 AND victim_age <= 17)"
    }, {
        table: "victim_age",
        text: "1824",
        textSpecial: "(victim_age >= 18 AND victim_age <= 24)"
    }, {
        table: "victim_age",
        text: "2559",
        textSpecial: "(victim_age >= 25 AND victim_age <= 59)"
    }, {
        table: "victim_age",
        text: "60",
        textSpecial: "(victim_age >= 60)"
    }, {
        table: "victim_age",
        text: null,
        textSpecial: null
    }, {
        table: "victim_age",
        text: "total",
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
        text: null
    }, {
        //Question 6B
        table: "victim_multiple",
        text: "true"
    }, {
        table: "exception_disability",
        text: "true"
    }, {
        table: "disability_deaf",
        text: "true"
    }, {
        table: "disability_total_unique",
        text: "(disability_physical is true OR disability_mental is true OR disability_developmental is true OR disability_other is true OR disability_blind is true)"

    }, {
        table: "victim_sexual_orientation_total",
        textSpecial: "(victim_sexual_orientation iLike 'lesbian' OR victim_sexual_orientation iLike 'gay' OR victim_sexual_orientation iLike 'bi-sexual' OR victim_sexual_orientation iLike 'other')"
    }, {
        table: "homeless",
        text: "true"
    }, {
        table: "victim_immigrant_total",
        textSpecial: "(victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East' OR victim_immigrant iLike 'Other' OR victim_immigrant is null)"
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
        table: "exception_compensation_unique",
        text: "(emergency_financial is true OR reparations_claims is true)"
    }, {
        //Question 8/9A0=9A4
        table: "information_referral",
        text: "true"
    }, {
        table: "criminal_justice",
        text: "true"
    }, {
        table: "criminal_justice_unique",
        text: "(information_criminal_justice is true OR legal_law_enforcement_interview is true OR legal_prosecution_related is true OR legal_court_advocacy is true)"
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
        table: "personal_advocacy_unique",
        text: "(medical_accompaniment_medical is true OR medical_accompaniment_dental is true OR medical_exam_support is true or legal_law_enforcement_interview is true OR legal_immigration is true OR legal_intervention is true OR transportation is true)"
    }, {
        table: "medical_advocacy",
        text: "true"
    }, {
        table: "medical_advocacy_unique",
        text: "(medical_accompaniment_medical is true OR medical_accompaniment_dental is true)"
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
        table: "transportation",
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
        table: "criminal_civic_unique",
        text: "(legal_law_enforcement_interview is true OR legal_prosecution_related is true OR legal_court_advocacy is true OR legal_oft_hro is true OR legal_immigration is true OR legal_intervention is true)"
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

    //special queries that will combine multiple columns;
    var disabilityStatusTotal = ["disability_physical", "disability_mental", "disability_developmental", "disability_other", "disability_blind"];
    var victimCompensationTotal = ["emergency_financial", "reparations_claims"];
    var criminalJusticProcessTotal = ["information_criminal_justice", "legal_law_enforcement_interview", "legal_prosecution_related", "legal_court_advocacy"];
    var personalAdvocacyTotal = ["medical_accompaniment_medical", "medical_accompaniment_dental", "medical_exam_support", "legal_law_enforcement_interview", "legal_immigration", "legal_intervention", "transportation"];
    var medicalAdvocacyTotal = ["medical_accompaniment_medical", "medical_accompaniment_dental"];
    var criminalCivicTotal = ["legal_law_enforcement_interview", "legal_prosecution_related", "legal_court_advocacy", "legal_oft_hro", "legal_immigration", "legal_intervention"];

    //countyObjectArray will send parameters to the server side queries; table = column name, text/textSpecial = query text;
    $scope.countyInfo = {};
    var countyObjectArray = [{
        table: "total_overall",
        text: "TOTAL"
    }, {
        table: "total_new",
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
        table: "victim_zipcode_other",
        text: "Other"
    }, {
        table: "victim_zipcode_unknown",
        text: ""
    }, {
        table: "victim_zipcode_total",
        text: ""
    }, {
        table: "victim_ethnicity",
        text: "Native American",
        textSpecial: "native_american"
    }, {
        table: "victim_ethnicity",
        text: "Asian",
        textSpecial: "asian"
    }, {
        table: "victim_ethnicity",
        text: "African American/Black",
        textSpecial: "african_american_black"
    }, {
        table: "victim_ethnicity",
        text: "Chican@/Latin@",
        textSpecial: "chicano_latino"
    }, {
        table: "victim_ethnicity",
        text: "Native Hawaiian/Pacific Islander",
        textSpecial: "hawaiian_pacific_islander"
    }, {
        table: "victim_ethnicity",
        text: "White Non-Latino or Caucasian",
        textSpecial: "white"
    }, {
        table: "victim_ethnicity",
        text: "Other",
        textSpecial: "other"
    }, {
        table: "victim_ethnicity",
        text: "Multi-Racial",
        textSpecial: "multi-racial"
    }, {
        table: "victim_ethnicity",
        text: null,
        textSpecial: "unknown"
    }, {
        table: "victim_ethnicity_total",
        text: "total",
        textSpecial: "(victim_ethnicity iLike 'Native American' OR victim_ethnicity iLike 'Asian' OR victim_ethnicity iLike 'African American/Black' OR victim_ethnicity iLike 'Chican@/Latin@' OR victim_ethnicity iLike 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLike 'White Non-Latino or Caucasian' OR victim_ethnicity iLike 'Other' OR victim_ethnicity iLike 'Multi-Racial' OR victim_ethnicity is null)"
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
        text: null
    }, {
        table: "victim_gender_total",
        text: "total",
        textSpecial: "victim_gender iLike 'Male' OR victim_gender iLike 'Female' OR victim_gender iLike 'Non-binary' OR victim_gender iLike 'other' OR victim_gender is null"
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
        text: null
    }, {
        table: "victim_immigrant",
        text: "No"
    }, {
        table: "victim_immigrant_total",
        text: "total",
        textSpecial: "(victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East' OR victim_immigrant iLike 'Other' OR victim_immigrant is null)"
    }, {
        table: "victim_age",
        text: "018",
        textSpecial: "(victim_age >= 0 AND victim_age <= 18)"
    }, {
        table: "victim_age",
        text: "1950",
        textSpecial: "(victim_age >= 19 AND victim_age <= 50)"
    }, {
        table: "victim_age",
        text: "50",
        textSpecial: "(victim_age >= 50)"
    }, {
        table: "victim_age_unknown",
        text: "",
        textSpecial: "victim_age is null"
    }, {
        table: "victim_age",
        text: "total",
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
        text: null
    }, {
        table: "victim_multiple",
        text: "true"
    }, {
        table: "crisis_counseling_individual",
        text: "true"
    }, {
        table: "crisis_counseling_group",
        text: "true"
    }, {
        table: "victim_type",
        text: "adultPrimaryVictim"
    }, {
        table: "victim_type",
        text: "adultSecondaryVictim"
    }, {
        table: "victim_type",
        text: "youthPrimaryVictim"
    }, {
        table: "victim_type",
        text: "youthSecondaryVictim"
    }];

    //function to get county information;
    $scope.getStuffCounty = function() {
        //requirement to set date;
        if ($scope.dateStart == "" || $scope.dateEnd == "") {
            $scope.showMessage = true;
            $scope.message = "Please enter a start and end date before proceeding";
            updateScroll();
        } else {
            if ((Date.parse($scope.dateEnd)) < (Date.parse($scope.dateStart))) {
                var swapToStart = $scope.dateEnd;
                var swapToEnd = $scope.dateStart;
                // console.log(swapToStart);
                // console.log(swapToEnd);
                $scope.dateStart = swapToStart;
                $scope.dateEnd = swapToEnd;
            }
            $scope.showCountyData = true;
            countyObjectArray.forEach(function(query, index) {
                var data = {};

                data.start = $scope.dateStart;
                data.end = $scope.dateEnd;
                data.text = query.text;
                data.textSpecial = query.textSpecial;
                // console.log('clientside data to query:', data);

                $http({
                    method: "POST",
                    url: '/reportRoute/county/' + query.table,
                    data: data
                }).then(function(response) {
                    // console.log("Get Success");
                    // console.log(response);
                    // console.log(query.table);
                    var objectParam = query.table;

                    //adds text to columns that have input values;
                    switch (objectParam) {
                        case "victim_gender":
                            objectParam += '_' + query.text;
                            // console.log('new gender OP:', objectParam);
                            break;
                        case "victim_age":
                            objectParam += '_' + query.text;
                            // console.log('new age OP:', objectParam);
                            break;
                        case "victim_zipcode":
                            objectParam += '_' + query.text;
                            // console.log('new zip OP:', objectParam);
                            break;
                        case "victim_ethnicity":
                            objectParam += '_' + query.textSpecial;
                            // console.log('new ethnicity OP:', objectParam);
                            break;
                        case "victim_type":
                            objectParam += '_' + query.text;
                            // console.log('new ethnicity OP:', objectParam);
                            break;
                    };

                    //assigns count value;
                    $scope.countyInfo[objectParam] = parseInt(response.data[0].count);
                    console.log($scope.countyInfo);
                    // console.log(response.data[0]);
                    // console.log($scope.countyInfo);
                }, function() {
                    // console.log("Get Error");
                });
            });
            // console.log($scope.countyInfo);

            //displays actual locations, unduplicated that services are provided (text);
            var location = {}

            location.table = "locations";
            location.text = "true";
            location.start = $scope.dateStart;
            location.end = $scope.dateEnd;
            // console.log('location query:', location);

            $http({
                method: "POST",
                url: '/reportRoute/county/locations',
                data: location
            }).then(function(response) {
                // console.log("Get Success");
                // console.log(response);
                $scope.locations = response;
                // console.log($scope.locations);
            }, function() {
                // console.log("Get Error");
            });
        }
    };

    //function to get federal information;
    $scope.getStuffFederal = function() {
        //requirement to set date;
        if ($scope.dateStart == "" || $scope.dateEnd == "") {
            $scope.showMessage = true;
            $scope.message = "Please enter a date range before proceeding";
            updateScroll();
        } else {
            if ((Date.parse($scope.dateEnd)) < (Date.parse($scope.dateStart))) {
                var swapToStart = $scope.dateEnd;
                var swapToEnd = $scope.dateStart;
                // console.log(swapToStart);
                // console.log(swapToEnd);
                $scope.dateStart = swapToStart;
                $scope.dateEnd = swapToEnd;
            }
            // console.log($scope.endDate);
            $scope.showFedData = true;
            federalObjectArray.forEach(function(query, index) {
                var data = {};

                data.start = $scope.dateStart;
                data.end = $scope.dateEnd;
                data.text = query.text;
                data.textSpecial = query.textSpecial;

                //special counts that add multiple columns;
                $scope.federalInfo.criminalCivic = 0;
                $scope.federalInfo.disabilityTotal = 0;
                $scope.federalInfo.victimCompensation = 0;
                $scope.federalInfo.criminalJusticeProcess = 0;
                $scope.federalInfo.personalAdvocacy = 0;
                $scope.federalInfo.medicalAdvocacy = 0;
                // console.log('clientside data to query:', data);

                if (query.table == "exception_disability") {
                    disabilityStatusTotal.forEach(function(table) {
                        $http({
                            method: "POST",
                            url: '/reportRoute/federal/' + table,
                            data: data
                        }).then(function(response) {
                            // console.log("Get Success");
                            // console.log(response);
                            $scope.federalInfo.disabilityTotal += parseInt(response.data[0].count);
                        }, function() {
                            // console.log("Get Error");
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
                            $scope.federalInfo.victimCompensation += parseInt(response.data[0].count);
                        }, function() {
                            // console.log("Get Error");
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
                            $scope.federalInfo.criminalJusticeProcess += parseInt(response.data[0].count);
                        }, function() {
                            // console.log("Get Error");
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
                            $scope.federalInfo.personalAdvocacy += parseInt(response.data[0].count);
                        }, function() {
                            // console.log("Get Error");
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
                            $scope.federalInfo.medicalAdvocacy += parseInt(response.data[0].count);
                        }, function() {
                            // console.log("Get Error");
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
                            $scope.federalInfo.criminalCivic += parseInt(response.data[0].count);
                        }, function() {
                            // console.log("Get Error");
                        });
                    });
                } else {
                    $http({
                        method: "POST",
                        url: '/reportRoute/federal/' + query.table,
                        data: data
                    }).then(function(response) {
                        // console.log("Get Success");
                        // console.log('response:', response);
                        // console.log('query table:', query.table);
                        var objectParam = query.table;

                        //adds text to columns that have input values;
                        switch (objectParam) {
                            case "victim_ethnicity":
                                objectParam += '_' + query.textSpecial;
                                // console.log('new ethnicity OP:', objectParam);
                                break;
                            case "victim_gender":
                                objectParam += '_' + query.text;
                                // console.log('new gender OP:', objectParam);
                                break;
                            case "victim_age":
                                objectParam += '_' + query.text;
                                // console.log('new age OP:', objectParam);
                                break;
                            case "contact_type":
                                objectParam += '_' + query.text;
                                // console.log('new age OP:', objectParam);
                                break;
                        };

                        //assigns count value;
                        $scope.federalInfo[objectParam] = parseInt(response.data[0].count);
                    }, function() {
                        // console.log("Get Error");
                    });
                }
            });
            // console.log($scope.federalInfo);
        }
    };

    //Where the Playground dropdowns code starts
    $scope.newSearch = true;
    $scope.playground = {};
    $scope.selectedCategories;
    $scope.checkSelection = function() {
        makeFalse();
        $scope.selectedCategories.forEach(function(category) {
            switch (category) {
                case "individualsServiced":
                    $scope.individualsServiced = true;
                    break;
                case "ethnicity":
                    $scope.ethnicity = true;
                    break;
                case "genderIdentity":
                    $scope.genderIdentity = true;
                    break;
                case "age":
                    $scope.age = true;
                    break;
                case "victimizationTypes":
                    $scope.victimizationTypes = true;
                    break;
                case "victimizationTypesSpecial":
                    $scope.victimizationTypesSpecial = true;
                    break;
                case "victimCompensation":
                    $scope.victimCompensation = true;
                    break;
                case "servicesReceived":
                    $scope.servicesReceived = true;
                    break;
                case "infoAndReferral":
                    $scope.infoAndReferral = true;
                    break;
                case "personalAdvocacy":
                    $scope.personalAdvocacy = true;
                    break;
                case "emotionalSupport":
                    $scope.emotionalSupport = true;
                    break;
                case 'justiceSystemAssistance':
                    $scope.justiceSystemAssistance = true;
                    break;
                case 'showCounties':
                    $scope.showCounties = true;
                    break;
                case 'immigrantStatus':
                    $scope.immigrantStatus = true;
                    break;
                case 'typeOfServiceNew':
                    $scope.typeOfServiceNew = true;
                    break;
                case 'clientServicesNewAndRepeat':
                    $scope.clientServicesNewAndRepeat = true;
                    break;
                case 'disability':
                    $scope.disability = true;
                    break;
                case 'inPersonCrisis':
                    $scope.inPersonCrisis = true;
                    break;
                case 'inPersonLegalCriminal':
                    $scope.inPersonLegalCriminal = true;
                    break;
                case 'inPersonLegalCivil':
                    $scope.inPersonLegalCivil = true;
                    break;
                case 'inPersonMedical':
                    $scope.inPersonMedical = true;
                    break;
                case 'inPersonOther':
                    $scope.inPersonOther = true;
                    break;
                case 'typeOfVictim':
                    $scope.typeOfVictim = true;
                    break;
                case 'transgender':
                    $scope.transgender = true;
                    break;
                case 'phoneServicesProvided':
                    $scope.phoneServicesProvided = true;
                    break;
                case 'supportedOnCall':
                    $scope.supportedOnCall = true;
                    break;
                case 'contactType':
                    $scope.contactType = true;
                    break;
                case 'nonVictimAdvocacy':
                    $scope.nonVictimAdvocacy = true;
                    break;
            }
        });
    }

    function makeFalse() {
        $scope.individualsServiced = false;
        $scope.newIndividualsServiced = false;
        $scope.ethnicity = false;
        $scope.genderIdentity = false;
        $scope.age = false;
        $scope.victimizationTypes = false;
        $scope.victimizationTypesSpecial = false;
        $scope.victimCompensation = false;
        $scope.servicesReceived = false;
        $scope.infoAndReferral = false;
        $scope.personalAdvocacy = false;
        $scope.emotionalSupport = false;
        $scope.justiceSystemAssistance = false;
        $scope.showCounties = false;
        $scope.immigrantStatus = false;
        $scope.typeOfServiceNew = false;
        $scope.clientServicesNewAndRepeat = false;
        $scope.disability = false;
        $scope.inPersonCrisis = false;
        $scope.inPersonLegalCriminal = false;
        $scope.inPersonLegalCivil = false;
        $scope.inPersonMedical = false;
        $scope.inPersonOther = false;
        $scope.transgender = false;
        $scope.typeOfVictim = false;
        $scope.phoneServicesProvided = false;
        $scope.supportedOnCall = false;
        $scope.contactType = false;
        $scope.nonVictimAdvocacy = false;
    };

    $scope.submitting = function() {
        if ($scope.playground.startDate == undefined || $scope.playground.endDate == undefined) {
            $scope.showMessage = true;
            $scope.message = "Please enter in a Date before Proceeding";
            updateScroll();
        } else {
            if ((Date.parse($scope.playground.endDate)) < (Date.parse($scope.playground.startDate))) {
                var swapToStart = $scope.playground.endDate;
                var swapToEnd = $scope.playground.startDate;
                // console.log(swapToStart);
                // console.log(swapToEnd);
                $scope.playground.startDate = swapToStart;
                $scope.playground.endDate = swapToEnd;
            }
            $scope.showMessage = false;
            $scope.playgroundInfo = {};
            $scope.showFields = true;
            $scope.newSearch = false;
            // console.log(parameterArray);
            // console.log($scope.playground);
            var parameterArray = Object.getOwnPropertyNames($scope.playground);
            // console.log(parameterArray);
            parameterArray.forEach(function(parameter) {
                $scope[parameter] = true;
                playgroundObjectArray.forEach(function(object) {
                    // console.log(object);
                    if (object.bound !== parameter) {
                        return;
                    } else {
                        // console.log(object);

                        var data = {};

                        data.text = object.text;
                        data.tableInfo = object.infoTable;
                        data.textSpecial = object.textSpecial;
                        data.table = object.table;
                        data.startDate = $scope.playground.startDate;
                        data.endDate = $scope.playground.endDate;
                        if (object.bound == 'age') {
                            data.start = $scope.playground.age.start;
                            data.end = $scope.playground.age.end;
                            $scope.begin = $scope.playground.age.start;
                            $scope.end = $scope.playground.age.end;
                        }
                        // console.log('data to send to server:', data);
                        $http({
                            method: "POST",
                            url: '/reportRoute/playground/victim/' + object.table,
                            data: data
                        }).then(function(response) {
                            // console.log("Get Success");
                            // console.log('response:', response);
                            var playgroundInfo = {};
                            var aPrime = 0;
                            var aSecond = 0;
                            var yPrime = 0;
                            var ySecond = 0;
                            var noValue = 0;
                            response.data.forEach(function(spot) {
                                //incredemnts variable with each case of victim type;
                                switch (spot.victim_type) {
                                    case 'youthPrimaryVictim':
                                        yPrime++;
                                        break;
                                    case 'youthSecondaryVictim':
                                        ySecond++;
                                        break;
                                    case 'adultPrimaryVictim':
                                        aPrime++;
                                        break;
                                    case 'adultSecondaryVictim':
                                        aSecond++;
                                        break;
                                    case null:
                                        noValue++;
                                        break;
                                }
                            });

                            var objectParam = object.table;
                            var noVictimTypes = false;

                            //adds text to columns that have input values;
                            switch (object.table) {
                                case "victim_ethnicity":
                                    objectParam += '_' + object.textSpecial;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "victim_gender":
                                    objectParam += '_' + object.textSpecial;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "victim_zipcode":
                                    // console.log("victim zipcode Running");
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "victim_immigrant":
                                    objectParam += '_' + object.textSpecial;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "victim_trans":
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "contact_type":
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "supported_on_call":
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "information_referral":
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "emergency_financial":
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "reparations_claims":
                                    objectParam += '_' + object.text;
                                    playgroundInfo = nameSpecialTable(objectParam, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo);
                                    break;
                                case "medical_request":
                                    objectParam = object.table;
                                    $scope.playgroundInfo[objectParam] = response.data[0].count;
                                    // console.log($scope.playgroundInfo[objectParam]);
                                    noVictimTypes = true;
                                    noVictimTypes = true;
                                    break;
                                case "advocacy_request":
                                    objectParam = object.table;
                                    $scope.playgroundInfo[objectParam] = response.data[0].count;
                                    // console.log($scope.playgroundInfo[objectParam]);
                                    noVictimTypes = true;
                                    break;
                                default:
                                    playgroundInfo[object.table] = {};
                                    playgroundInfo[object.table].yPrime = yPrime;
                                    playgroundInfo[object.table].ySecond = ySecond;
                                    playgroundInfo[object.table].aPrime = aPrime;
                                    playgroundInfo[object.table].aSecond = aSecond;
                                    playgroundInfo[object.table].noValue = noValue;
                            }

                            if (noVictimTypes == true) {

                            } else {
                                $scope.playgroundInfo[objectParam] = playgroundInfo[objectParam];
                                // console.log('hello', $scope.playgroundInfo);
                                $scope.total[objectParam] = ($scope.playgroundInfo[objectParam].yPrime + $scope.playgroundInfo[objectParam].ySecond + $scope.playgroundInfo[objectParam].aPrime + $scope.playgroundInfo[objectParam].aSecond + $scope.playgroundInfo[objectParam].noValue);
                                // console.log('total', $scope.total);
                            }

                        }, function() {
                            // console.log("Get Error");
                        });
                    }
                });
            });
        };
    }

    function nameSpecialTable(tableAddition, yPrime, ySecond, aPrime, aSecond, noValue, playgroundInfo) {
        playgroundInfo[tableAddition] = {};
        playgroundInfo[tableAddition].yPrime = yPrime;
        playgroundInfo[tableAddition].ySecond = ySecond;
        playgroundInfo[tableAddition].aPrime = aPrime;
        playgroundInfo[tableAddition].aSecond = aSecond;
        playgroundInfo[tableAddition].noValue = noValue;
        return playgroundInfo;
    };
    $scope.resetSearch = function() {
        $scope.showFields = false;
        $scope.newSearch = true;
        feebleAttempt = [];
        makeFalse();
        var objectParam = Object.getOwnPropertyNames($scope.playground);
        objectParam.forEach(function(param) {
            $scope[param] = false;
        });
        $scope.playground = {};
    }
    $scope.blackHole = function() {
        if ($scope.playground.startDate == undefined || $scope.playground.endDate == undefined) {
            $scope.showMessage = true;
            $scope.message = "Please enter in a Date before Proceeding";
            updateScroll();
        } else {
            if ((Date.parse($scope.playground.endDate)) < (Date.parse($scope.playground.startDate))) {
                var swapToStart = $scope.playground.endDate;
                var swapToEnd = $scope.playground.startDate;
                // console.log(swapToStart);
                // console.log(swapToEnd);
                $scope.playground.startDate = swapToStart;
                $scope.playground.endDate = swapToEnd;
            }
            // $scope.showMessage = true;
            //   $scope.message = "Your PDF Download will begin shortly";
            $scope.showFields = true;
            // $scope.newSearch = false;
            $scope.showTotalVictim = true;
            var data = {};
            data.start = $scope.playground.startDate;
            data.end = $scope.playground.endDate;
            $http({
                method: "POST",
                url: '/reportRoute/playground/victim',
                data: data
            }).then(function(response) {
                // console.log("Get Success");
                // console.log('response:', response);
                $scope.victimObject = response.data;
                // console.log($scope.victimObject);
                // console.log(response.data[0]);
                $scope.victimParameters = Object.getOwnPropertyNames(response.data[0]);
                // console.log($scope.victimParameters);
                getNonVictim(data);
            }, function() {
                // console.log("Get Error");
            });
        }
    }

    function getNonVictim(data) {
        $scope.showTotalNonVictim = true;
        $http({
            method: "POST",
            url: '/reportRoute/playground/nonVictim',
            data: data
        }).then(function(response) {
            // console.log("Get Success");
            // console.log('response:', response);
            $scope.nonVictimObject = response.data;
            // console.log($scope.nonVictimObject);
            $scope.nonVictimParameters = Object.getOwnPropertyNames(response.data[0]);
            $scope.makePDF();
        }, function() {
            // console.log("Get Error");
        });
    }
    var feebleAttempt = [];

    function populatePDFArrays() {
        var victimHeader = $scope.victimParameters;
        victimHeader.unshift("Victim");
        // console.log(victimHeader);
        feebleAttempt.push(victimHeader);
        // console.log(feebleAttempt);
        $scope.victimObject.forEach(function(arrayObject, index) {
            var objectNumber = index;
            var standin = [""];
            $scope.victimParameters.forEach(function(parameter) {
                if ($scope.victimObject[objectNumber][parameter] == null) {
                    $scope.victimObject[objectNumber][parameter] = "-";
                }
                // console.log(arrayObject[parameter].toString());
                if (arrayObject[parameter].toString() == "") {
                    arrayObject[parameter] = "null";
                }
                var objectThing = arrayObject[parameter].toString();
                // console.log(objectThing);
                standin.push(objectThing);
                // console.log(standin);
            });
            feebleAttempt.push(standin);
            // console.log(feebleAttempt);
        });
        var nonVictimHeader = $scope.nonVictimParameters;
        nonVictimHeader.unshift("Non-Victim");
        // console.log(nonVictimHeader);
        feebleAttempt.push(nonVictimHeader);

        $scope.nonVictimObject.forEach(function(arrayObject, index) {
            var objectNumber = index;
            var standin = [""];
            $scope.nonVictimParameters.forEach(function(parameter, index) {
                if ($scope.nonVictimObject[objectNumber][parameter] == null) {
                    $scope.nonVictimObject[objectNumber][parameter] = "-";
                }
                // console.log(arrayObject[parameter].toString());
                if (arrayObject[parameter].toString() == "") {
                    arrayObject[parameter] = "null";
                }
                var objectThing = arrayObject[parameter].toString();
                // console.log(objectThing);
                standin.push(objectThing);
                // console.log(standin);
            });
            feebleAttempt.push(standin);
            // console.log(feebleAttempt);
        });
        // console.log(feebleAttempt.length);
        var widthTotal = (feebleAttempt.length * 200);
        // console.log(widthTotal);

        var docDefinition = {
            pageSize: {
                width: widthTotal,
                height: 1300
            },
            content: [{
                table: {
                    width: "auto",
                    headerRows: 1,
                    body: [feebleAttempt]
                }
            }]
        };
        pdfMake.createPdf(docDefinition).download('getAllReports.pdf');
        $scope.resetSearch();
        // $scope.open($scope.confirmation);
    }

    $scope.makePDF = function() {
            populatePDFArrays();
        }
        // $scope.open = function(_confirmation) {

    //     var modalInstance = $uibModal.open({
    //         controller: "ModalInstanceCtrl",
    //         templateUrl: 'myModalContent.html',
    //         resolve: {
    //             confirmation: function() {
    //                 return _confirmation;
    //             }
    //         }
    //     });
    // }

    //End code for Playground dropdowns

    //query information for custom reports;
    var playgroundObjectArray = [{
        //Question 1
        bound: "showIndividual",
        table: "total_overall",
        infoTable: "victim",
        text: "TOTAL",
    }, {
        //Question 4
        bound: "showNewIndividual",
        table: "total_new",
        infoTable: "victim",
        text: "NEW",
    }, {
        //Question 5A
        bound: "showAIndian",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "Native American",
        textSpecial: "native_american",
    }, {
        bound: "showAsian",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "Asian",
        textSpecial: "asian",
    }, {
        bound: "showBlack",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "African American/Black",
        textSpecial: "african_american_black",
    }, {
        bound: "showLatino",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "Chican@/Latin@",
        textSpecial: "chicano_latino",
    }, {
        bound: "showPacificIslander",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "Native Hawaiian/Pacific Islander",
        textSpecial: "hawaiian_pacific_islander",
    }, {
        bound: "showCaucassian",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "White Non-Latino or Caucasian",
        textSpecial: "white",

    }, {
        bound: "showOtherRace",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "Other",
        textSpecial: "other",

    }, {
        bound: "showMultipleRaces",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: "Multi-Racial",
        textSpecial: "multi-racial",

    }, {
        bound: "showNotReportedRace",
        table: "victim_ethnicity",
        infoTable: "victim",
        text: null,
        textSpecial: "unknown",

    }, {
        bound: "showEthnicityTotal",
        table: "victim_ethnicity_total",
        infoTable: "victim",
        textSpecial: "(victim_ethnicity iLike 'Native American' OR victim_ethnicity iLike 'Asian' OR victim_ethnicity iLike 'African American/Black' OR victim_ethnicity iLike 'Chican@/Latin@' OR victim_ethnicity iLike 'Native Hawaiian/Pacific Islander' OR victim_ethnicity iLike 'White Non-Latino or Caucasian' OR victim_ethnicity iLike 'Other' OR victim_ethnicity iLike 'Multi-Racial' OR victim_ethnicity is null)",

    }, {
        bound: "immigrantAfrica",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "Africa",
        textSpecial: "africa",

    }, {
        bound: "immigrantAsia",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "Asia",
        textSpecial: "asia",

    }, {
        bound: "immigrantEurope",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "Europe",
        textSpecial: "europe",

    }, {
        bound: "immigrantSAmerica",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "Mex/Cen/So America",
        textSpecial: "central_south",

    }, {
        bound: "immigrantMiddleEast",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "Middle East",
        textSpecial: "middle_east",

    }, {
        bound: "immigrantOther",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "Other",
        textSpecial: "other",

    }, {
        bound: "immigrantUnknown",
        table: "victim_immigrant",
        infoTable: "victim",
        text: null,
        textSpecial: "unknown",

    }, {
        bound: "immigrantNot",
        table: "victim_immigrant",
        infoTable: "victim",
        text: "No",
        textSpecial: "no",

    }, {
        bound: "immigrantTotal",
        table: "victim_immigrant_total",
        infoTable: "victim",
        textSpecial: "total",
        text: "(victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East' OR victim_immigrant iLike 'Other' OR victim_immigrant is null)",
    }, {
        //Question 5B
        //     bound: "showMale",
        //     table: "victim_gender",
        //     infoTable: "victim",
        //     text: "Male",
        //     textSpecial: "Male",

        // }, {
        //     bound: "showFemale",
        //     table: "victim_gender",
        //     infoTable: "victim",
        //     text: "Female",
        //     textSpecial: "Female",

        // }, {
        //     bound: "showNonBinary",
        //     table: "victim_gender",
        //     infoTable: "victim",
        //     text: "Non-Binary",
        //     textSpecial: "nonbinary",

        // }, {
        //     bound: "showOtherGender",
        //     table: "victim_gender",
        //     infoTable: "victim",
        //     text: "Other",
        //     textSpecial: "Other",

        // }, {
        //     bound: "showGenderNotReported",
        //     table: "victim_gender",
        //     infoTable: "victim",
        //     text: null,
        //     textSpecial: null,

        // }, {
        //Question 6A
        bound: "violenceAdultSexual",
        table: "violence_adult_sexual",
        infoTable: "victim",
        text: "true",
    }, {
        bound: "violenceAdultAbuseFamily",
        table: "violence_adult_child_family",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceAdultAbuseOther",
        table: "violence_adult_child_other",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceBullying",
        table: "violence_bullying",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceChildPornography",
        table: "violence_child_pornography",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceDomestic",
        table: "violence_domestic",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceElderAbuse",
        table: "violence_elder",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceStalkingExposing",
        table: "violence_exposing",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceStalkingInternet",
        table: "violence_internet",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceChildAbuseFamily",
        table: "violence_minor_family",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceChildAbuseOther",
        table: "violence_minor_other",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceStalkingPhone",
        table: "violence_phone",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceSex",
        table: "violence_exploitation",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceStalkingHarassment",
        table: "violence_harassment",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceStalking",
        table: "violence_stalking",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceTeenDating",
        table: "violence_teen_dating",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceOther",
        table: "violence_other",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "violenceUnknown",
        table: "violence_unknown",
        infoTable: "victim",
        text: "true",

    }, {
        //Question 6B
        bound: "victimSpecialMultiple",
        table: "victim_multiple",
        infoTable: "victim",
        text: "true",

    }, {
        //
        bound: "age",
        table: "victim_age",
        infoTable: "victim",

    }, {
        bound: "county55111",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55111",

    }, {
        bound: "county55305",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55305",

    }, {
        bound: "county55311",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55311",

    }, {
        bound: "county55316",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55316",

    }, {
        bound: "county55317",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55317",

    }, {
        bound: "county55327",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55327",

    }, {
        bound: "county55328",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55328",

    }, {
        bound: "county55331",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55331",

    }, {
        bound: "county55340",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55340",

    }, {
        bound: "county55341",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55341",

    }, {
        bound: "county55343",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55343",

    }, {
        bound: "county55344",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55344",

    }, {
        bound: "county55345",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55345",

    }, {
        bound: "county55346",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55346",

    }, {
        bound: "county55347",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55347",

    }, {
        bound: "county55356",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55356",

    }, {
        bound: "county55357",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55357",

    }, {
        bound: "county55359",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55359",

    }, {
        bound: "county55361",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55361",

    }, {
        bound: "county55364",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55364",

    }, {
        bound: "county55369",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55369",

    }, {
        bound: "county55373",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55373",

    }, {
        bound: "county55374",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55374",

    }, {
        bound: "county55375",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55375",

    }, {
        bound: "county55384",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55384",

    }, {
        bound: "county55387",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55387",

    }, {
        bound: "county55388",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55388",

    }, {
        bound: "county55391",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55391",

    }, {
        bound: "county55392",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55392",

    }, {
        bound: "county55401",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55401",

    }, {
        bound: "county55402",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55402",

    }, {
        bound: "county55403",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55403",

    }, {
        bound: "county55404",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55404",

    }, {
        bound: "county55405",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55405",

    }, {
        bound: "county55406",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55406",

    }, {
        bound: "county55407",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55407",

    }, {
        bound: "county55408",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55408",

    }, {
        bound: "county55409",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55409",

    }, {
        bound: "county55410",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55410",

    }, {
        bound: "county55411",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55411",

    }, {
        bound: "county55412",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55412",

    }, {
        bound: "county55413",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55413",

    }, {
        bound: "county55414",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55414",

    }, {
        bound: "county55415",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55415",

    }, {
        bound: "county55416",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55416",
    }, {
        bound: "county55417",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55417",

    }, {
        bound: "county55418",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55418",

    }, {
        bound: "county55419",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55419",

    }, {
        bound: "county55420",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55420",

    }, {
        bound: "county55422",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55422",

    }, {
        bound: "county55423",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55423",

    }, {
        bound: "county55424",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55424",

    }, {
        bound: "county55425",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55425",

    }, {
        bound: "county55426",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55426",

    }, {
        bound: "county55427",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55427",

    }, {
        bound: "county55428",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55428",

    }, {
        bound: "county55429",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55429",

    }, {
        bound: "county55430",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55430",

    }, {
        bound: "county55431",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55431",

    }, {
        bound: "county55435",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55435",

    }, {
        bound: "county55436",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55436",

    }, {
        bound: "county55437",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55437",

    }, {
        bound: "county55438",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55438",

    }, {
        bound: "county55439",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55439",

    }, {
        bound: "county55441",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55441",

    }, {
        bound: "county55442",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55442",

    }, {
        bound: "county55443",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55443",

    }, {
        bound: "county55444",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55444",

    }, {
        bound: "county55445",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55445",

    }, {
        bound: "county55446",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55446",

    }, {
        bound: "county55447",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55447",

    }, {
        bound: "county55450",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55450",

    }, {
        bound: "county55454",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55454",

    }, {
        bound: "county55455",
        table: "victim_zipcode",
        infoTable: "victim",
        text: "55455",

    }, {
        bound: "countyOther",
        table: "victim_zipcode_other",
        infoTable: "victim",
        text: "other",
    }, {
        bound: "countyUnknown",
        table: "victim_zipcode_unknown",
        infoTable: "victim",
        text: "unknown",
    }, {
        bound: "countyTotal",
        table: "victim_zipcode_total",
        infoTable: "victim",
        text: "total",
    }, {
        bound: "showMale",
        table: "victim_gender",
        infoTable: "victim",
        text: "Male",
        textSpecial: "Male",

    }, {
        bound: "showFemale",
        table: "victim_gender",
        infoTable: "victim",
        text: "Female",
        textSpecial: "Female",

    }, {
        bound: "showNonBinary",
        table: "victim_gender",
        infoTable: "victim",
        text: "Non-Binary",
        textSpecial: "nonbinary",

    }, {
        bound: "showOtherGender",
        table: "victim_gender",
        infoTable: "victim",
        text: "Other",
        textSpecial: "Other",

    }, {
        bound: "showGenderNotReported",
        table: "victim_gender",
        infoTable: "victim",
        text: null,
        textSpecial: null,
    }, {
        bound: "showGenderTotal",
        table: "victim_gender_total",
        infoTable: "victim",
        text: "victim_gender iLike 'Male' OR victim_gender iLike 'Female' OR victim_gender iLike 'Non-binary' OR victim_gender iLike 'other' OR victim_gender is null",
        textSpecial: "total",

    }, {
        bound: "disabilityBlind",
        infoTable: "victim",
        table: "disability_blind",
        text: "true"
    }, {
        bound: "disabilityPhysical",
        infoTable: "victim",
        table: "disability_physical",
        text: "true"
    }, {
        bound: "disabilityMental",
        infoTable: "victim",
        table: "disability_mental",
        text: "true"
    }, {
        bound: "disabilityDeaf",
        infoTable: "victim",
        table: "disability_deaf",
        text: "true"
    }, {
        bound: "disabilityIntellectual",
        infoTable: "victim",
        table: "disability_developmental",
        text: "true"
    }, {
        bound: "disabilityNone",
        infoTable: "victim",
        table: "disability_none",
        text: "true"
    }, {
        bound: "disabilityOther",
        infoTable: "victim",
        table: "disability_other",
        text: "true"
    }, {
        bound: "disabilityUnknown",
        infoTable: "victim",
        table: "disability_unknown",
        text: "true"
    }, {
        bound: "individualCounseling",
        table: "crisis_counseling_individual",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "groupCounseling",
        table: "crisis_counseling_group",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "lawEnforcement",
        table: "legal_law_enforcement_interview",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "prosecutionAdvocacy",
        table: "legal_prosecution_related",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "courtAdvocacy",
        table: "legal_court_advocacy",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "obtainingAssistance",
        table: "legal_oft_hro",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "immigrationSupport",
        table: "legal_immigration",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "intervention",
        table: "legal_intervention",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "forensicExam",
        table: "medical_exam_support",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "accompanimentMedical",
        table: "medical_accompaniment_medical",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "accompanimentDental",
        table: "medical_accompaniment_dental",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "informationReferral",
        table: "information_referral",
        infoTable: "victim",
        text: "inperson",
        textSpecial: " AND contact_type iLIKE 'in-person'",

    }, {
        bound: "safeAtHome",
        table: "safe_at_home",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "emergencyFinancial",
        table: "emergency_financial",
        infoTable: "victim",
        text: "inperson",
        textSpecial: " AND contact_type iLIKE 'in-person'",

    }, {
        bound: "reparationsClaims",
        table: "reparations_claims",
        infoTable: "victim",
        text: "inperson",
        textSpecial: " AND contact_type iLIKE 'in-person'",

    }, {
        bound: "yesTrans",
        table: "victim_trans",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "noTrans",
        table: "victim_trans",
        infoTable: "victim",
        text: "false",

    }, {
        bound: "unknownTrans",
        table: "victim_trans",
        infoTable: "victim",
        text: null,

    }, {
        bound: "phoneCrisis",
        table: "crisis_counseling",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "phoneInformation",
        table: "information_referral",
        infoTable: "victim",
        text: "phone",
        textSpecial: " AND contact_type iLIKE 'phone'",

    }, {
        bound: "phoneCriminalJustice",
        table: "information_criminal_justice",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "phoneJusticeRelated",
        table: "other_emergency_justice",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "phoneEmergencyFinancial",
        table: "emergency_financial",
        infoTable: "victim",
        text: "phone",
        textSpecial: " AND contact_type iLIKE 'phone'",

    }, {
        bound: "phoneEmergencyClaims",
        table: "reparations_claims",
        infoTable: "victim",
        text: "phone",
        textSpecial: " AND contact_type iLIKE 'phone'",

    }, {
        bound: "supported",
        table: "supported_on_call",
        infoTable: "victim",
        text: "true",

    }, {
        bound: "notSupported",
        table: "supported_on_call",
        infoTable: "victim",
        text: "false",
    }, {
        bound: "unknownSupported",
        table: "supported_on_call",
        infoTable: "victim",
        text: null,
    }, {
        bound: "inPersonContact",
        table: "contact_type",
        infoTable: "victim",
        text: "in-person"
    }, {
        bound: "phoneContact",
        table: "contact_type",
        infoTable: "victim",
        text: "Phone",

    }, {
        bound: "nonVictimMedical",
        table: "medical_request",
        infoTable: "nonvictim",
        text: ""
    }, {
        bound: "nonVictimTotal",
        table: "advocacy_request",
        infoTable: "nonvictim",
        text: ""
    }, {
        bound: "victimSpecialHomeless",
        table: "homeless",
        infoTable: "victim",
        text: "true"
    }, {
        bound: "victimSpecialImmigrants",
        table: "victim_immigrant_total",
        infoTable: "victim",
        textSpecial: "total",
        text: "(victim_immigrant iLike 'Africa' OR victim_immigrant iLike 'Asia' OR victim_immigrant iLike 'Europe' OR victim_immigrant iLike 'Mex/Cen/So America' OR victim_immigrant iLike 'Middle East' OR victim_immigrant iLike 'Other' OR victim_immigrant is null)",
    }, {
        bound: "victimSpecialLGBTQ",
        table: "victim_sexual_orientation_total",
        infoTable: "victim",
        text: "true",
        textSpecial: "(victim_sexual_orientation iLike 'lesbian' OR victim_sexual_orientation iLike 'gay' OR victim_sexual_orientation iLike 'bi-sexual' OR victim_sexual_orientation iLike 'other')"
    }, {
        bound: "victimSpecialVeterans",
        table: "veteran",
        infoTable: "victim",
        text: "true"
    }, {
        bound: "victimSpecialLimitedEnglish",
        table: "limited_english",
        infoTable: "victim",
        text: "true"
    }];
    ///**********END OF CONTROLLER***************************************///////
}]);
