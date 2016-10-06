myApp.controller('dataEntryController', ['$scope', '$http', '$location', 'loggedinFactory', function($scope, $http, $location, loggedinFactory) {

  $scope.check = false;
  $scope.loggedinFactory = loggedinFactory;

  $scope.isLoggedIn = function() {
    loggedinFactory.isLoggedIn().then(function(response) {
      console.log('The person logged in:', response);
      console.log('the type of the person logged in:', response.user_type)
      $scope.user = response;
      if (response.user_type == 'admin') {
        $scope.check = true;
      }
    });
  }
      $scope.oneAtATime = true;
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

// $scope.formId = 12;

$scope.formIdCount = function () {
  $scope.formId++;
}

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

      $scope.table = {};

      $scope.searchUpdate = function (){
        var data = {};
        var id = $scope.formId;
        var info = Object.getOwnPropertyNames($scope.table);
        $scope[info[0]]= true;
        data.table = info[0];
        data.number = $scope.formId;
        $http({
            method: "POST",
            url: '/reportRoute/county/edit',
            data: data
        }).then(function(response) {
            console.log("Get Success");
            console.log(response);
      });
    }

    ///**********END OF CONTROLLER***************************************///////
}]);
