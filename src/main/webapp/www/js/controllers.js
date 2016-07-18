angular.module('wechat.controllers', [])

    .controller('settingCtrl', function ($scope, $state) {
      $scope.onSwipeRight = function () {
        $state.go("tab.find");
      };
    })

    .controller('friendsCtrl', function ($scope, $state) {
      $scope.onSwipeLeft = function () {
        $state.go("tab.find");
      };
      $scope.onSwipeRight = function () {
        $state.go("tab.message");
      };
      $scope.contacts_right_bar_swipe = function (e) {
        console.log(e);
      };
    })

    .controller('findCtrl', function ($scope, $state) {
      $scope.onSwipeLeft = function () {
        $state.go("tab.setting");
      };
      $scope.onSwipeRight = function () {
        $state.go("tab.friends");
      };
    })