var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider){
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
          controller: "phoneController"
        })
  .when('/inperson', {
          templateUrl: '/views/partials/inperson.html',
          controller: "phoneController"
        })
  .when('/nonvictim', {
          templateUrl: '/views/partials/nonvictim.html',
          controller: "nonVictimController"
        })
  .when('/admin', {
          templateUrl: '/views/partials/admin.html',
          controller: "adminController"
              })
    .otherwise({
      redirectTo: '/home'
    })

}]);
