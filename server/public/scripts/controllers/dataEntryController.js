myApp.controller('dataEntryController', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.form = {
    counselor: null,
    date: null,
    sTime: null,
    eTime: null,
    location: null,
    county: null,
    county_other_specify: null,
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
    supported: null
  }

  $scope.submitVictimForm = function() {
      var data = $scope.form;

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

    ///**********END OF CONTROLLER***************************************///////
}]);
