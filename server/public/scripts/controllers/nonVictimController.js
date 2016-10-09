myApp.controller('nonVictimController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    console.log("nonVictimController Running FOOL");

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
            $scope.message = "Please enter a Date before submitting the form";
        } else {
            var data = $scope.form;
            console.log(data);

            data.date_entered = new Date();

            console.log('sending to server non vict data', data);
            $http.post('/dataRoute/nonvictim', data).then(function(response) {
                    console.log('success');
                    // $scope.formId ++;
                },
                function(response) {
                    console.log('error');
                    $scope.message = "Please try again.";
                });
        }
    }







    ///**********END OF CONTROLLER***************************************///////
}]);
