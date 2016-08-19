'use strict'

angular.module('app.allusers', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/allusers', {
    templateUrl: 'allusers/allusers.html',
    controller: 'allUsersCtrl'
  })
}])

.controller('allUsersCtrl', ['$scope', '$http', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'https://aoimpact.herokuapp.com/allusers/',
    headers: {
      'User-Email': window.localStorage.user_email
    }
  })
  .success(function (users) {
    console.log(users)
    $scope.users = users
  })
  $scope.deleteUser = function (userId) {
    $http({
      method: 'DELETE',
      url: 'https://aoimpact.herokuapp.com/user/' + userId,
      headers: {
        'User-Email': window.localStorage.user_email
      }
    })
    .success(function (res) {
      console.log(res)
      $scope.message = res
      location.reload()
    })
    .error(function (res) {
      console.log(res)
      $scope.message = res
    })
  }
}])
