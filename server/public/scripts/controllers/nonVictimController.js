myApp.controller('nonVictimController', ['$scope', '$http', '$location', function($scope, $http, $location){


  $scope.print = function() {
      window.print();
  }

$scope.nonVictimInfo = {};

  $scope.form = {
        counselor: null,
        date: null,
        sTime: null,
        eTime: null,
        callerName: null,
        callerPhone: null,
        callerZip: null,
        county: null,
        callerType:null,
        svcSource: null,
        medical: null,
        school: null,
        govtSocial: null,
        communityMember: null,
        lawEnforcer: null,
        legalSystem: null,
        citySocial: null,
        otherOraganization: null,
        medicalReferral: null,
        schoolReferral: null,
        govtSocialReferral: null,
        communityMemberReferral: null,
        lawEnforcerReferral: null,
        legalSystemReferral: null,
        citySocialReferral: null,
        otherOraganizationReferral: null,
        advacacyLocation: null,
        dispatched: null,
        responded: null,
        reason: null,
      };
//POST non-victim infromation
      $scope.submitNonVictimForm = function () {
        var data = $scope.form;
        console.log(data);
        console.log('sending to server non vict data', data);
        $http.post('dataRoute/nonvictim', data).then(function(response){
          console.log('success');
        },
        function(response){
          console.log('error');
          $scope.message = "Please try again.";

      });

      }


  $scope.form = {
      counselor: '',
      date: '',
      sTime: '',
      eTime: '',
      callerName: '',
      callerPhone: '',
      callerZip: '',
      county: '',
      svcSource: '',
      medical: '',
      school: '',
      govtSocial: '',
      communityMember: '',
      lawEnforcer: '',
      legalSystem: '',
      citySocial: '',
      otherOraganization: '',
      medicalReferral: '',
      schoolReferral: '',
      govtSocialReferral: '',
      communityMemberReferral: '',
      lawEnforcerReferral: '',
      legalSystemReferral: '',
      citySocialReferral: '',
      otherOraganizationReferral: '',
      advacacyLocation: '',
      dispatched: '',
      responded: '',
      reason: '',
    };


///**********END OF CONTROLLER***************************************///////
}]);
