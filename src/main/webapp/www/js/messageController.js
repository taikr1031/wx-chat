angular.module('wechat.messageController', [])

    .controller('messageCtrl', function ($scope, $state, $ionicPopup, localStorageService, messageService) {
      // $scope.messages = messageService.getAllMessages();
      // console.log($scope.messages);
      $scope.onSwipeLeft = function () {
        $state.go("tab.friends");
      };
      $scope.popupMessageOpthins = function (message) {
        $scope.popup.index = $scope.messages.indexOf(message);
        $scope.popup.optionsPopup = $ionicPopup.show({
          templateUrl: "templates/popup.html",
          scope: $scope,
        });
        $scope.popup.isPopup = true;
      };
      $scope.markMessage = function () {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.showHints) {
          message.showHints = false;
          message.noReadMessages = 0;
        } else {
          message.showHints = true;
          message.noReadMessages = 1;
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
      };
      $scope.deleteMessage = function () {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        $scope.messages.splice(index, 1);
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.deleteMessageId(message.id);
        messageService.clearMessage(message);
      };
      $scope.topMessage = function () {
        var index = $scope.popup.index;
        var message = $scope.messages[index];
        if (message.isTop) {
          message.isTop = 0;
        } else {
          message.isTop = new Date().getTime();
        }
        $scope.popup.optionsPopup.close();
        $scope.popup.isPopup = false;
        messageService.updateMessage(message);
      };
      $scope.messageDetils = function (message) {
        $state.go("messageDetail", {
          "messageId": message.id
        });
      };
      $scope.$on("$ionicView.beforeEnter", function () {
        // console.log($scope.messages);
        $scope.messages = messageService.getAllMessages();
        $scope.popup = {
          isPopup: false,
          index: 0
        };
      });
    })
