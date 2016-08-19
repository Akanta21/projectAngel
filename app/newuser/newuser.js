'use strict'

angular.module('app.newuser', ['ngRoute', 'ngMaterial', 'ngMessages'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/newuser', {
    templateUrl: 'newuser/newuser.html',
    controller: 'newUserCtrl'
  })
}])

.controller('newUserCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.message
  $scope.signup = function () {
    var data = {
      name: $scope.formData.name,
      email: $scope.formData.email,
      password: $scope.formData.password
    }
    console.log(data)
    $http({
      method: 'POST',
      // url: 'https://localhost:3000/signin',
      url: 'https://aoimpact.herokuapp.com/signup',
      data: data
    })
    .success(function (data) {
      console.log(data)
      window.localStorage.name = data.user.name
      window.localStorage.user_email = data.user.email
      window.localStorage.auth_token = data.user.auth_token
      $location.path('/')
      location.reload()
    })
    .error(function(response) {
      console.log(response)
      $scope.message = response.error
    })
  }
}])
