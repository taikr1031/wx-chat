<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title></title>
  <link href="css/ionic.app.css" rel="stylesheet">
  <script src="js/jquery.min.js"></script>
  <!-- ionic/angularjs js -->
  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  <script src="/www/lib/ionic/js/ionic.bundle.js"></script>
  <!-- cordova script (this will be a 404 during development) -->
  <script src="cordova.js"></script>
  <!-- your app's js -->
  <script src="/www/js/app.js"></script>
  <script src="/www/js/controllers.js"></script>
  <script src="/www/js/messageController.js"></script>
  <script src="/www/js/messageDetailController.js"></script>
  <script src="/www/js/routes.js"></script>
  <script src="/www/js/services.js"></script>
  <script src="/www/js/directives.js"></script>
  <script src="/www/js/elastic.js"></script>
</head>

<body ng-app="wechat">
  <%@ include file="/jsp/Wxjsapi.jsp" %>
  <ion-nav-view animation="slide-left-right">
  </ion-nav-view>
</body>

</html>
