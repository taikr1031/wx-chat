angular.module('wechat.messageDetailController', [])

    .controller('messageDetailCtrl', ['$scope', '$stateParams',
      'messageService', '$ionicScrollDelegate', '$ionicActionSheet', '$timeout', '$ionicLoading',
      function ($scope, $stateParams, messageService, $ionicScrollDelegate, $ionicActionSheet, $timeout, $ionicLoading) {
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        var beginDate;
        $('#voiceBtn').bind('touchstart', function () {
          console.log('touchstart');
          beginDate = new Date();
          wxjs.run(function () {
            console.log('startRecord');
            wx.startRecord();
          });
        }).bind('touchend', function () {
          console.log('touchend');
          var endDate = new Date();
          wxjs.run(function () {
            wx.stopRecord({
              success: function (res) {
                var localId = res.localId;
                $scope.localId = localId;
                $scope.msg = localId;
                var intervalNum = Math.round((endDate.getTime() - beginDate.getTime()) / 1000);
                sendVoice(localId, intervalNum);
              }
            });
          });
        });

        $scope.isInputText = true;
        $scope.msg = "";
        // console.log("enter");
        $scope.doRefresh = function () {
          // console.log("ok");
          $scope.messageNum += 5;
          $timeout(function () {
            $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum,
                $stateParams.messageId);
            $scope.$broadcast('scroll.refreshComplete');
          }, 200);
        };

        $scope.$on("$ionicView.beforeEnter", function () {
          $scope.message = messageService.getMessageById($stateParams.messageId);
          $scope.message.noReadMessages = 0;
          $scope.message.showHints = false;
          messageService.updateMessage($scope.message);
          $scope.messageNum = 10;
          $scope.messageDetils = messageService.getAmountMessageById($scope.messageNum, $stateParams.messageId);
          $timeout(function () {
            viewScroll.scrollBottom();
          }, 0);
        });

        /* LOCATION*/
        var location = {
          latitude: 0, longitude: 0, speed: 0,accuracy: 0
        };

        var getLocation = function() {
          wxjs.run(function() {
            wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                location.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                location.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                location.speed = res.speed; // 速度，以米/每秒计
                location.accuracy = res.accuracy; // 位置精度
                openLocation();
              },
              cancel: function() {
                alert('用户拒绝授权获取地理位置');
              }
            });
          })
        };

        var openLocation = function() {
          alert('东经：' + parseFloat(location.longitude) + '， 北纬：' + parseFloat(location.latitude));
          console.log(parseFloat(location.longitude));
          console.log(parseFloat(location.latitude));
          wx.openLocation({
            latitude: parseFloat(location.latitude), // 纬度，浮点数，范围为90 ~ -90
            longitude: parseFloat(location.longitude), // 经度，浮点数，范围为180 ~ -180。
            name: '楚烟', // 位置名
            address: '武汉市硚口区1号', // 地址详情说明
            scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: 'http://www.whcyit.com/whcyit/index.xhtml' // 在查看位置界面底部显示的超链接,可点击跳转
          });
        };
        /* LOCATION*/

        /* IMAGE */
        var images = {
          localId: [],
          serverId: [],
          downloadId: []
        };
        var uploadedCount = 0;

        var chooseImage = function () {
          images.localId.length = 0;
          images.serverId.length = 0;
          images.downloadId.length = 0;
          uploadedCount = 0;

          wxjs.run(function () {
            wx.chooseImage({
              count: 2, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                images.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                uploadImage(images.localId);
              }
            });
          });
        };

        var uploadImage = function(localIds) {
          $('body,html').animate({scrollTop: 0}, 500);
          $ionicLoading.show({
            template: '图片上传中  ...'
          });
          var localIdsClone = localIds.slice();
          var localId = localIdsClone.pop();
          wx.uploadImage({
            localId: localId,
            isShowProgressTips: 0,
            success: function(res) {
              $ionicLoading.show({
                template: '图片上传中 ' + (uploadedCount + 1) + '/' + localIds.length + ' ...'
              });
              images.serverId.push(res.serverId);
              uploadedCount++;
              if(localIdsClone.length > 0) {
                uploadImage(localIdsClone);
              } else {
                images.downloadId = downloadImage(images.serverId);
                $timeout(function() {
                  for(var i = 0; i < images.serverId.length; i++) {
                    sendImages(images.serverId[i], images.downloadId[i]);
                  }
                }, 100);
              }
              $ionicLoading.hide();
            }, fail: function(res) {
              $ionicLoading.hide();
              alert('uploadImage error: ' + JSON.stringify(res));
            }
          })
        };

        var downloadImage = function(serverIds) {
          var serverIdsClone = serverIds.slice();
          var serverId = serverIdsClone.pop();
          wx.downloadImage({
            serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
            isShowProgressTips: 0, // 默认为1，显示进度提示
            success: function (res) {
              images.downloadId.push(res.localId); // 返回图片下载后的本地ID
              if(serverIdsClone.length > 0) {
                downloadImage(serverIdsClone);
              }
            }, fail: function(res) {
              alert('downloadImage error: ' + JSON.stringify(res));
            }
          });
          return images.downloadId;
        };

        var sendImages = function (serverId, downloadId) {
          messageService.sendImage($scope.message.openid, serverId);
          var data = {};
          data.content = downloadId;
          data.isFromeMe = true;
          data.time = new Date();
          data.type = 'IMAGE';
          data.mediaId = serverId;
          $scope.messageDetils.push(data);
          $scope.msg = '';
          $timeout(function() {
            document.getElementById(downloadId).src = downloadId;
            viewScroll.scrollBottom();
          }, 0);
        };

        $scope.previewImage = function(downloadId) {
          wxjs.run(function() {
            wx.previewImage({
              current: downloadId,
              urls: images.downloadId
            });
          });
        };
        /* IMAGE */


        /* VOICE */
        $scope.palyAudio = function (mediaId) {
          wxjs.run(function () {
            wx.playVoice({
              localId: mediaId// 需要播放的音频的本地ID，由stopRecord接口获得
            });
          });
        };

        sendVoice = function (mediaId, intervalNum) {
          var data = {};
          data.content = ' ' + intervalNum + '秒';
          data.isFromeMe = true;
          data.time = new Date();
          data.type = 'VOICE';
          data.mediaId = mediaId;
          $scope.messageDetils.push(data);
          messageService.sendVoice($scope.message.openid, mediaId);
          $scope.msg = '';
          viewScroll.scrollBottom();
        };
        /* VOICE */

        /* TEXT */
        $scope.sendText = function () {
          var data = {};
          data.content = $scope.msg;
          data.isFromeMe = true;
          data.time = new Date();
          data.type = 'TEXT';
          $scope.messageDetils.push(data);
          messageService.sendText($scope.message.openid, $scope.msg);
          $scope.msg = '';
          viewScroll.scrollBottom();
        };

        $scope.toggleInput = function (isInputText) {
          $scope.isInputText = !isInputText;
        };
        /* TEXT */

        $scope.show = function () {
          // Show the action sheet
          var hideSheet = $ionicActionSheet.show({
            buttons: [
              {text: '<i class="ion-ios-camera icon-button icon-action" ></i>    <span class="tab-action"></span>     <i class="text-action">照片</i> '},
              {text: '<i class="ion-social-instagram icon-button icon-action" ></i>   <span class="tab-action"></span>        <i class="text-width">小视频</i> '},
              {text: '<i class="ion-ios-videocam icon-button icon-action" ></i>   <span class="tab-action"></span>        <i class="text-width">视频聊天</i> '},
              {text: '<i class="ion-ios-location icon-button icon-action" ></i>    <span class="tab-action"></span>        <i class="text-width">位置</i> '},
              {text: '<i class="ion-ios-eye icon-button icon-action" ></i>    <span class="tab-action"></span>        <i class="text-width">收藏</i> '},
              //{ text: '<i class="ion-more icon-button icon-action" ></i>               <span class="tab-action"></span>        <i class="text-width">More</i> ' },
            ],
            //destructiveText: 'Delete',
            //titleText: 'Modify your album',
            //cssClass: 'social-actionsheet',
            //cancelText: 'Cancel',
            //cancel: function() {
            //},
            buttonClicked: function (index) {
              if(index == '0') {
                chooseImage();
              } else if(index == '3') {
                getLocation();
              }
              return true;
            }
          });
          // For example's sake, hide the sheet after two seconds
          //me.$timeout(function() {
          //  hideSheet();
          //}, 2000);
        };

        window.addEventListener("native.keyboardshow", function (e) {
          viewScroll.scrollBottom();
        });
      }
    ])
