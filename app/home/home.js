'use strict'

angular.module('app.home', ['ngRoute', 'slick'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  })
}])

.controller('homeCtrl', ['$scope', function ($scope) {

}])
