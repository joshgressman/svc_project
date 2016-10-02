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

  $scope.submitVictimForm = function() {
      var data = $scope.form;

      // //formats input date into workable format;
      // var unformatedInput = new Date();
      // var dateEntered = unformatedInput.toISOString().slice(0,10);
      // data.date_entered = dateEntered;

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
