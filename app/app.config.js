'use strict'

angular.module('angelApp')
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!')

  $routeProvider.otherwise('/')
}])
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('orange', {
    'default': '400', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '200', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '500', // use shade 600 for the <code>md-hue-2</code> class
    'hue-3': '800' // use shade A100 for the <code>md-hue-3</code> class
  })
  // If you specify less than all of the keys, it will inherit from the
  // default shades
  .accentPalette('blue', {
    'default': '300' // use shade 300 for default, and keep all other shades the same
  })
  .warnPalette('red')
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark()
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark()
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark()
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark()
})
.controller('mainController', function ($scope, $http) {
  $scope.currentUserSignedIn = false
  if (window.localStorage.auth_token && window.localStorage.user_email) {
    $scope.currentUserSignedIn = true
    $scope.name = window.localStorage.name
    $scope.user_email = window.localStorage.user_email
  }
  $scope.isAdmin = false
  if(window.localStorage.user_email === 'admin@gmail.com'){
    $scope.isAdmin = true
  }
  $scope.totalPrice = window.localStorage.totalPrice
})
