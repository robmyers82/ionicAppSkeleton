angular.module('starter.controllers', ['ngStorage'])

.controller('DashCtrl', function($scope, $state, $http, $localStorage, isLoggedIn) {

  // $scope.localStorage = {};
  // $scope.localStorage.user_id = $localStorage.user_id;
  // $scope.localStorage.token = $localStorage.token;

  $scope.loginData = {};
  $scope.loggedIn = isLoggedIn;
  if ($scope.loggedIn) {
    $state.go('tab.chats');
  }

  console.log("The current login status is: "+$scope.loggedIn);

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $http.post("http://162.243.252.98:8080/api/login", { email: $scope.loginData.username, password: $scope.loginData.password }).then(function(result) {
        if (result.data.status == "success") {

            // successful login, in our example, we will just send an alert message
            $localStorage.user_id = result.data.userid;
            $localStorage.token = result.data.token;
            $scope.loggedIn = true;
            alert("Congrats, you logged in with user ID "+result.data.userid);
            $state.go('tab.chats');
           
        }
        else {
            // unsuccessful login.  In our example, we are just sending an alert message
            alert("Login unsuccessful: "+result.data.message);
        }
    }, function(error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
        alert(JSON.stringify(error));
    });
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  
  // Form data for the login modal
  $scope.loginData = {};
  $scope.loggedIn = isLoggedIn;

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $http.post("http://162.243.252.98:8080/api/login", { email: $scope.loginData.username, password: $scope.loginData.password }).then(function(result) {
        if (result.data.loginstatus == "success") {
            // successful login, in our example, we will just send an alert message
            // $localStorage.user_id = result.data.userid;
            // $localStorage.token = result.data.token;
            $scope.loggedIn = true;
            alert("Congrats, you logged in with user ID "+result.data.userid);
        }
        else {
            // unsuccessful login.  In our example, we are just sending an alert message
            alert(result.data.message);
        }
    }, function(error) {
        alert("There was a problem getting your profile.  Check the logs for details.");
        alert(JSON.stringify(error));
    });
  };


});
