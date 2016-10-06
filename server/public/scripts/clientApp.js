var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/partials/home.html',
            controller: "homeController"
        })
        .when('/data', {
            templateUrl: '/views/partials/data.html',
            controller: "dataEntryController"
        })
        .when('/phone', {
            templateUrl: '/views/partials/phone.html',
            controller: "dataEntryController"
        })
        .when('/inperson', {
            templateUrl: '/views/partials/inperson.html',
            controller: "dataEntryController"
        })
        .when('/nonvictim', {
            templateUrl: '/views/partials/nonvictim.html',
            controller: "nonVictimController"
        })
        .when('/admin', {
            templateUrl: '/views/partials/admin.html',
            controller: "adminController"
        })
        .when('/reports', {
            templateUrl: '/views/partials/formData/fedData.html',
            controller: "adminController"
        })
        .when('/countyReport', {
            templateUrl: '/views/partials/formData/countyData.html',
            controller: "adminController"
        })
        .when('/summaryReport', {
            templateUrl: '/views/partials/formData/summaryData.html',
            controller: "adminController"
        })
        .when('/search', {
            templateUrl: '/views/partials/search.html',
            controller: "dataEntryController"
        })
        .when('/playground', {
            templateUrl: '/views/partials/dataplayground.html',
            controller: "adminController"
        })
        .when('/users', {
            templateUrl: '/views/partials/user.html',
            controller: 'userController'
        .when('/federalPrint', {
            templateUrl: '/views/federalRep.html',
            controller: "adminController"
        })
        .otherwise({
            redirectTo: '/home'
        })

}]);
