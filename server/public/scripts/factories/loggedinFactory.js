myApp.factory('loggedinFactory', ['$http', function($http) {
  console.log('loggedin factory running');

var user = '';

  var isLoggedIn = function() {
      console.log('called isLoggedIn in factory')
      var promise = $http.get('/user').then(function(response) {
        if(response.data.username) {
          // user has a curret session on the server
          user = response.data;
          console.log('User Data: ', user);
          return user;
        }
      });
    return promise;
  };

return {
  user: user,
  isLoggedIn: function() {
    return isLoggedIn();
  }
}
}]);
