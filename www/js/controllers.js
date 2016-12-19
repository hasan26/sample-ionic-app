angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $scope.dataMeja = {};
  $http.get('http://localhost:8000/api/meja').then(function (res){
    $scope.dataMeja = res.data;
  });


})

.controller('ChatsCtrl', function($scope, Chats) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
  .controller('LoginCtrl', function($scope, $http, $ionicPopup, $state) {

    $scope.login = function(data) {
      $http.post('http://localhost:8000/api/login',data).then(function (res){
        console.log(res.data.status);
        if(res.data.status){
            $state.go('tab.dash');
        }else{
          $scope.showAlert();
        }
      });
    };

    $scope.showAlert = function() {
      $ionicPopup.alert({
        title: 'Login Failed !',
        template: 'username or password not match'
      });
    };

  })

  .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
