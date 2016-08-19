'use strict';

angular.module('app.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'profileCtrl'
  });
}])

.controller('profileCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.editDisplay = false
  $scope.editUser = function () {
    $scope.editDisplay = true
    console.log($scope.editDisplay)
  }
  $scope.saveUser = function () {
    $http({
      method: 'PATCH',
      // url: 'http://localhost:3000/profile',
      url: 'https://aoimpact.herokuapp.com/profile',
      headers: {
        'Auth-Token': window.localStorage.auth_token
      },
      data: {
        name: $scope.formData.name,
        email: $scope.formData.email,
        password: $scope.formData.password
      }
    })
    .success(function (response) {
      $location.path('/')
      console.log(response)
      // location.reload()
    })
  }
}])
