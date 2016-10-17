myApp.controller('nonVictimController', ['$scope', '$http', '$location', '$uibModal', function($scope, $http, $location, $uibModal) {
  console.log("nonVictimController is running");

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
        callerType: null,
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
        advocacyLocation: null,
        request: null,
        dispatched: null,
        responded: null,
        reason: null,
        medicalAdvocacyRequest: null,
    };
    //POST non-victim infromation
    $scope.submitNonVictimForm = function() {
        if ($scope.form.date == null) {
          $scope.showMessage = true;
            $scope.message = "Please enter a Date before submitting the form";
        } else {
            var data = $scope.form;
            console.log(data);

            data.date_entered = new Date();

            console.log('sending to server non vict data', data);
            $http.post('/dataRoute/nonvictim', data).then(function(response) {
                    console.log('success');
                    $scope.form = {
                        counselor: null,
                        date: null,
                        sTime: null,
                        eTime: null,
                        callerName: null,
                        callerPhone: null,
                        callerZip: null,
                        county: null,
                        callerType: null,
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
                        advocacyLocation: null,
                        request: null,
                        dispatched: null,
                        responded: null,
                        reason: null,
                        medicalAdvocacyRequest: null,
                    };
                    $http.get('/dataRoute/presentation_nonvictim').then(function(response) {
                      var formSubmittedId = response.data.length -1;
                      console.log(formSubmittedId);
                      var number = response.data[formSubmittedId].id;

                      console.log(response.data);
                      console.log(number);
                      $scope.confirmation = number;
                      $scope.open($scope.confirmation);
                      $scope.message = "Form Submited."
                          // $scope.showMessage = true;
                          // $scope.message = "Form " + response.data[formSubmittedId].id + " Submitted.";
                  },
                  function(response) {
                      $scope.showMessage = true;
                      $scope.message = "Please try again.";
                  });
          // },
            },


                function(response) {
                    console.log('error');
                    $scope.form = {
                        counselor: null,
                        date: null,
                        sTime: null,
                        eTime: null,
                        callerName: null,
                        callerPhone: null,
                        callerZip: null,
                        county: null,
                        callerType: null,
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
                        advocacyLocation: null,
                        request: null,
                        dispatched: null,
                        responded: null,
                        reason: null,
                        medicalAdvocacyRequest: null,
                    };
                });
        }
    }
    $scope.open = function (_confirmation) {

        var modalInstance = $uibModal.open({
          controller: "ModalInstanceCtrl",
          templateUrl: 'myModalContent.html',
            resolve: {
                confirmation: function()
                {
                    return _confirmation;
                }
            }
             });

    };







    ///**********END OF CONTROLLER***************************************///////
}]);
