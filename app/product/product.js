/* include global angular location */
'use strict'

angular.module('app.product', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/product', {
    templateUrl: 'product/product.html',
    controller: 'productCtrl'
  })
}])

.controller('productCtrl', ['$scope', '$http', '$location', '$mdMedia', '$mdDialog', function ($scope, $http, $location, $mdMedia, $mdDialog) {
  var url = 'https://aoimpact.herokuapp.com/products'
  var itemsArray = []
  var priceArray = []
  var totalPrice = 0

  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm')

  $http.get(url).then(function (response) {
    // console.log(response)
    $scope.topics = response.data
    $scope.id = response.data._id
  })
  $scope.delete = function (id) {
    console.log(id)
    $http({
      method: 'DELETE',
      url: 'https://aoimpact.herokuapp.com/product/' + id,
      headers: {
        'User-Email': window.localStorage.user_email
      }
    })
    .success(function () {
      console.log('deleted')
      location.reload()
    })
  }
  $scope.addToCart = function(price) {
    if(!window.localStorage.auth_token) {
      $mdDialog.cancel();
      $location.path("/newuser")
    }
    else {
      totalPrice += price
      window.localStorage.totalPrice = totalPrice
      console.log(totalPrice)
      $mdDialog.cancel()
    }
  };
  $scope.addToHistory = function (item) {
    console.log(item)
    $http({
      method: 'PATCH',
      url: 'https://aoimpact.herokuapp.com/addpurchase',
      headers: {
        'Auth-Token': window.localStorage.auth_token
      },
      data: {
        purchase_history: item
      }
    })
    .success(function () {
      console.log('added to purchase history')
      $location.path('/product')
      location.reload()
    })
  }
  // $scope.addToCart = function (item, price) {
  //   itemsArray.push(item)
  //   priceArray.push(price)
  //   totalPrice += price
  //   console.log(itemsArray)
  //   console.log(priceArray)
  //   console.log(totalPrice)
  // }
  $scope.individual = "random"
  $scope.showAdvanced = (ev, itemObject) => {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen
    $scope.individual = itemObject
    console.log($scope.individual)
    // console.log(this)
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'individualproduct.html',
      locals: {
        item: $scope.individual
      },
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".'
    }, function() {
      $scope.status = 'You cancelled the dialog.'
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm')
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true)
    })
    function DialogController($scope, $mdDialog,$location, item) {
      $scope.item = item
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  };
}])
