myApp.controller('dataEntryController', ['$scope', '$http', '$location', '$uibModal', 'loggedinFactory', function($scope, $http, $location, $uibModal, loggedinFactory) {
    $scope.check = false;
    $scope.loggedinFactory = loggedinFactory;
    $scope.thing = {};

    $scope.isLoggedIn = function() {
        loggedinFactory.isLoggedIn().then(function(response) {
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

    $scope.myFunction = function() {
        window.print();
    }

    function myFunction() {
        location.reload();
    };

    // MODAL WINDOW
    $scope.open = function(_confirmation) {
        var modalInstance = $uibModal.open({
            controller: "ModalInstanceCtrl",
            templateUrl: 'myModalContent.html',
            resolve: {
                confirmation: function() {
                    return _confirmation;
                }
            }
        });

    };
    //End MODAL WINDOW
    $scope.form = {
        counselor: null,
        date: null,
        sTime: null,
        eTime: null,
        location: null,
        county: null,
        clientNumber: null,
        zipCode: null,
        victimType: '',
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
            if ($scope.form.date == null) {
                $scope.showMessage = true
                $scope.message = "Please enter a date before submitting your request.";
            } else {
                $scope.showMessage = false
                var standinObject = $scope.thing;
                var thingArray = Object.getOwnPropertyNames(standinObject);
                var potato = {};
                thingArray.forEach(function(propertyName) {
                    potato[propertyName] = standinObject[propertyName];
                });
                var formArray = Object.getOwnPropertyNames(potato);
                formArray.forEach(function(parameter) {
                    var parameterName = potato[parameter];
                    $scope.form[parameterName] = true;
                });
                var data = $scope.form;
                data.date_entered = new Date();

                $http.post('/dataRoute/victim', data).then(function(response) {
                        $scope.form = {
                            counselor: null,
                            date: null,
                            sTime: null,
                            eTime: null,
                            location: null,
                            county: null,
                            clientNumber: null,
                            zipCode: null,
                            victimType: '',
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
                        $http.get('/dataRoute/presentation_victim').then(function(response) {
                                var formSubmittedId = response.data.length - 1;
                                $scope.confirmation = formSubmittedId;
                                $scope.open($scope.confirmation);
                                $scope.message = "Form Submited."
                                    // $scope.showMessage = true;
                                    // $scope.message = "Form " + response.data[formSubmittedId].id + " Submitted.";
                            },
                            function(response) {
                                $scope.showMessage = true;
                                $scope.message = "Please try again.";
                            });
                    },
                    function(response) {
                        $scope.showMessage = true;
                        $scope.message = "Please try again.";
                    });
            }
        }
        ///Search & update victim and non victim form
    $scope.table = {};
    $scope.update = {}

    $scope.searchUpdate = function() {
        if ($scope.formId == null) {
            $scope.showMessage = true
            $scope.message = "Please enter a date before submitting your request.";
        } else {
            // console.log($scope.formId);
            $scope.showMessage = false
            var data = {};
            var id = $scope.formId;
            var info = Object.getOwnPropertyNames($scope.table);
            $scope[info[0]] = true;
            if (info[0] == "phone") {
                info[0] = "victim";
            }
            data.table = info[0];
            data.number = parseInt($scope.formId);
            $http({
                method: "POST",
                url: '/reportRoute/county/edit',
                data: data
            }).then(function(response) {
                $scope.update = response.data[0];
            });
        }
    }

    ////////////UPDATE FORM /////////////////////////
    $scope.updateForm = function() {
        var data = {}
        var route = '/dataRoute/victim/';
        console.log('type', $scope.table);
        if ($scope.table.nonvictim == true) {
            route = '/dataRoute/nonvictim/';
        }
        console.log('route', route);
        // var info = Object.getOwnPropertyNames($scope.table);
        var id = parseInt($scope.update.id);
        data = $scope.update;
        console.log("update id", id);
        console.log("update data", data);
        $http({
            method: "PUT",
            url: route + id,
            data: data
        }).then(function(response) {
            console.log("PUT Success");
            console.log(response);
            $scope.confirmation = 26;
            $scope.open($scope.confirmation);
        });
    }

    ////////////UPDATE FORM /////////////////////////
    $scope.updateForm = function() {
            var data = {}
            var route = '/dataRoute/victim/';
            console.log('type', $scope.table);
            if ($scope.table.nonvictim == true) {
                route = '/dataRoute/nonvictim/';
            }
            console.log('route', route);
            // var info = Object.getOwnPropertyNames($scope.table);
            var id = parseInt($scope.update.id);
            data = $scope.update;
            console.log("update id", id);
            console.log("update data", data);
            $http({
                method: "PUT",
                url: route + id,
                data: data
            }).then(function(response) {
                console.log("PUT Success");
                console.log(response);
                // $scope.update = response.data[0];
                // console.log($scope.update);
            });
        }
        ///////////DELETE FORM////////////////////////////
    $scope.deleteForm = function() {
        var data = {}
        var id = parseInt($scope.update.id);
        var route = '/dataRoute/victim/';
        if ($scope.table.nonvictim == true) {
            route = '/dataRoute/nonvictim/';
        }
        console.log('id', id);
        $http({
            method: "DELETE",
            url: route + id,
        }).then(function(response) {
            confirm('Are you sure you want to delete this entry?');
            myFunction();
            console.log("DELETE Success");
            console.log(response);
            // $scope.update = response.data[0];
            // console.log($scope.update);
        });
    }

    ///**********END OF CONTROLLER***************************************///////
}]);
