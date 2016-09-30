myApp.controller('dataEntryController', ['$scope', '$http', '$location', function($scope, $http, $location) {



  $scope.form = {
    counselor: '',
    date: '',
    sTime: '',
    eTime: '',
    location: '',
    county: '',
    county_other_specify: '',
    clientNumber: '',
    zipCode: '',
    victimType: '',
    svcPrompt: '',
    previousContact: '',
    previousVisit: '',
    transportation: '',
    counseling: '',
    supportGroup: '',
    lawEnforcementInterview: '',
    prosecutionRelatedAdvocacy: '',
    courtAdvocacy: '',
    assistOFP_HRO: '',
    immigrationSupport: '',
    interventionWithOthers: '',
    forensicExamSupport: '',
    accompanyMedicalAppt:'',
    accompanyDentalAppt: '',
    crisis_counseling: '',
    infoAndReferral: '',
    info_crimjustice: '',
    safeAtHome: '',
    emergencyFinancialAsst: '',
    reparationsClaimAsst: '',
    svcServices: '',
    otherAgencyReferral: '',
    otherServicesReferral: '',
    adultSexAssault: '',
    adultAbusedAsChild_family: '',
    adultAbusedAsChild_other: '',
    exposing: '',
    minorCSA_family: '',
    minorCSA_other: '',
    obscenePhoneCall: '',
    exploitation_trafficking: '',
    sexualHarassment: '',
    stalking: '',
    internetRelated: '',
    unknownViolence: '',
    bullying: '',
    childPorn: '',
    domesticViolence: '',
    elderAbuse: '',
    teenDating: '',
    sexualViolenceOther: '',
    sexualViolenceOther_specify: '',
    age: '',
    gender: '',
    trans: '',
    orientation: '',
    blind_visImpair: '',
    physDisabled: '',
    mentDisabled: '',
    deafHardHearing: '',
    devDisabled: '',
    notDisabled: '',
    unknownDisabled: '',
    otherDisabled: '',
    otherDisabled_specify: '',
    ethnicBackground: '',
    immigrantStatus: '',
    homeless: '',
    limitedEnglish: '',
    veteran: '',
    supported: ''
  }

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
