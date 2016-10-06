myApp.controller('dataEntryController', ['$scope', '$http', '$location', function($scope, $http, $location) {


  $scope.myFunction = function() {
      window.print();
  }

  $scope.form = {
    counselor: null,
    date: null,
    sTime: null,
    eTime: null,
    location: null,
    county: null,
    clientNumber: null,
    zipCode: null,
    victimType: null,
    svcPrompt: null,
    previousContact: null,
    previousVisit: null,
    transportation: null,
    counseling: null,
    supportGroup: null,
    lawEnforcementInterview: null,
    prosecutionRelatedAdvocacy: null,
    courtAdvocacy: null,
    assistOFP_HRO: null,
    immigrationSupport: null,
    interventionWithOthers: null,
    forensicExamSupport: null,
    accompanyMedicalAppt: null,
    accompanyDentalAppt: null,
    crisis_counseling: null,
    infoAndReferral: null,
    info_crimjustice: null,
    other_emergency_justice: null,
    safeAtHome: null,
    emergencyFinancialAsst: null,
    reparationsClaimAsst: null,
    svcServices: null,
    otherAgencyReferral: null,
    otherServicesReferral: null,
    adultSexAssault: null,
    adultAbusedAsChild_family: null,
    adultAbusedAsChild_other: null,
    exposing: null,
    minorCSA_family: null,
    minorCSA_other: null,
    obscenePhoneCall: null,
    exploitation_trafficking: null,
    sexualHarassment: null,
    stalking: null,
    internetRelated: null,
    unknownViolence: null,
    bullying: null,
    childPorn: null,
    domesticViolence: null,
    elderAbuse: null,
    teenDating: null,
    sexualViolenceOther: null,
    sexualViolenceOther_specify: null,
    age: null,
    gender: null,
    trans: null,
    orientation: null,
    blind_visImpair: null,
    physDisabled: null,
    mentDisabled: null,
    deafHardHearing: null,
    devDisabled: null,
    notDisabled: null,
    unknownDisabled: null,
    otherDisabled: null,
    otherDisabled_specify: null,
    ethnicBackground: null,
    immigrantStatus: null,
    homeless: null,
    limitedEnglish: null,
    veteran: null,
    supported: null,
    advocacyType: null,
    multiple: null,
    formId: null,
    other_ethnicBackground: null,
    other_immigrantStatus: null
  }

  // var victimizationCount = [];


  $scope.submitVictimForm = function() {
      var data = $scope.form;
      // var count = victimizationCount.length;
      // console.log(count);
      //formats input date into workable format;
      data.date_entered = new Date();

      console.log('sending to server...', data);
      $http.post('/dataRoute/victim', data).then(function(response) {
        console.log('success');

        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
///Search & update victim and non victim form
      $scope.table = {};
      $scope.update = {}

      $scope.searchUpdate = function (){
        var data = {};
        var id = $scope.formId;
        var info = Object.getOwnPropertyNames($scope.table);
        $scope[info[0]]= true;
        if(info[0] == "phone"){
          info[0] = "victim";
        } 
        data.table = info[0];
        data.number = parseInt($scope.formId);
        console.log(data.number);
        $http({
            method: "POST",
            url: '/reportRoute/county/edit',
            data: data
        }).then(function(response) {
            console.log("Get Success");
            console.log(response);
              $scope.update = response.data[0];
              console.log($scope.update);
      });
    }

    ///**********END OF CONTROLLER***************************************///////
}]);
