(function() {

  'use strict';

  angular
    .module('myApp')
    .run(function(authService) {

      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      authService.registerAuthenticationListener();
    });

})();
