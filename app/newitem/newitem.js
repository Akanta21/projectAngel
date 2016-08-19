'use strict'

angular.module('app.newitem', ['ngRoute', 'ngMaterial', 'ngMessages'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/newitem', {
    templateUrl: 'newitem/newitem.html',
    controller: 'newItemCtrl'
  })
}])

.controller('newItemCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
  var url = 'https://aoimpact.herokuapp.com/api'
  $http.get(url).then(function (response) {
    console.log(response)
    $scope.topics = response.data
  })
  $scope.picture = ''
  $scope.test = function() {
    console.log($scope.picture)
  }
  $scope.add = function () {
    var data = {
      title: $scope.formData.title,
      price: $scope.formData.price,
      description: $scope.formData.description,
      picture: $scope.picture,
      stock: $scope.formData.stock,
      categories: $scope.formData.categories
    }
    // console.log(data)
    $http({
      method: 'POST',
      url: 'https://aoimpact.herokuapp.com/newproduct/',
      headers: {
        'User-Email': window.localStorage.user_email
      },
      data: data
    })
    .success(function (data) {
      console.log(data)
      $location.path('/product')
      location.reload()
    })
  }
}])
