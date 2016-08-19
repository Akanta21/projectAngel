'use strict'

angular.module('app.logout', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/logout', {
    template: '<button ng-click="logout()">logout<button>',
    controller: 'logoutCtrl'
  })
}])

.controller('logoutCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  $scope.logout = function () {
    window.localStorage.removeItem('user_email')
    window.localStorage.removeItem('auth_token')
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('totalPrice')
    $location.path('/')
    location.reload()
  }
}])
