angular.module('starter.User', ['ngStorage'])

.factory('User', function($http, $localStorage) {

	var User = {

		checkToken: function() {

			if ($localStorage.hasOwnProperty("token") && $localStorage.hasOwnProperty("user_id")) {
				return $http.post('http://162.243.252.98:8080/api/checklogin', {
					user_id: $localStorage.user_id, 
					token: $localStorage.token 
				}).then(function(result) {
					return true;
				}).catch(function onError(sailsResponse) {
					delete $localStorage.user_id;
					delete $localStorage.token;
					return false;
				});
			}
			else {
				return false;
			}
		}
	};

	return User;

});