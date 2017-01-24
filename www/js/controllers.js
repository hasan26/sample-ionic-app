angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http,$ionicPopup) {
  $scope.orderField = {};
  $http.get('http://localhost:8000/api/menu/food').then(function (res){
    var row = 0;
    angular.forEach(res.data,function(val, key){
      res.data[key].qty   = 0 ;
      res.data[key].noRow =row;
      row++;
    });
    $scope.foods = res.data;
  });
  $http.get('http://localhost:8000/api/menu/drink').then(function (res2){
    var row = 0;
    angular.forEach(res2.data,function(val, key){
      res2.data[key].qty = 0 ;
      res2.data[key].noRow =row;
      row++;
    });
    $scope.drinks = res2.data;
  });

  $scope.addFoodMenu = function(id) {
    $scope.foods[id].qty = $scope.foods[id].qty+1;
  };

  $scope.removeFoodMenu = function(id) {
    $scope.foods[id].qty = $scope.foods[id].qty-1;
  };

  $scope.addDrinkMenu = function(id) {
    $scope.drinks[id].qty = $scope.drinks[id].qty+1;
  };

  $scope.removeDrinkMenu = function(id) {
    $scope.drinks[id].qty = $scope.drinks[id].qty-1;
  };

  $scope.placeOrder = function () {
    var menu=[];
    var id = 1;

    if (!$scope.orderField.meja || $scope.orderField.meja ==''){
      $scope.showAlert('Table was empty');
      return true;
    }
    angular.forEach($scope.foods,function(val, key){
      if ($scope.foods[key].qty>0){
        var model  = {};
        model.id   = id;
        model.qty  = $scope.foods[key].qty;
        model.menu = $scope.foods[key].id;
        menu.push(model);
        id++;
      }
     });

    angular.forEach($scope.drinks,function(val, key){
      if ($scope.drinks[key].qty>0){
        var model  = {};
        model.id   = id;
        model.qty  = $scope.drinks[key].qty;
        model.menu = $scope.drinks[key].id;
        menu.push(model);
        id++;
      }
    });
    if (menu.length < 1){
      $scope.showAlert('No one Item Selected');
      return true;
    }

    $scope.orderField.menu = menu;
    console.log($scope.orderField);

    $http.post('http://localhost:8000/api/order', $scope.orderField).success(function (data) {
      $scope.showAlert('Order Success');
      $scope.orderField = {};
      $scope.resetQty();
      console.log(data);

    }).error(function (data) {
      $scope.showAlert('Opps Server Is Down Plss Try Again');
      console.log(data);

    });

  };

  $scope.resetQty = function () {

    angular.forEach($scope.foods,function(val, key){
        $scope.foods[key].qty = 0;
    });

    angular.forEach($scope.drinks,function(val, key){
      $scope.drinks[key].qty = 0;
    });

  }
  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
      title: 'Warning !',
      template: msg
    });
  };


})

.controller('ChatsCtrl', function($scope, $http) {

  $http.get('http://localhost:8000/api/menu/food').then(function (res){
    $scope.foods = res.data;
  });
})
  .controller('ChatDetailCtrl', function($scope, $stateParams) {
    $scope.food=JSON.parse($stateParams.chatId);
})
  .controller('LoginCtrl', function($scope, $http, $ionicPopup, $state) {

    $scope.login = function(data) {
      $http.post('http://localhost:8000/api/login',data).then(function (res){
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

  .controller('DrinkDetailCtrl', function($scope, $stateParams) {
    $scope.drink=JSON.parse($stateParams.dataDrink);
  })

  .controller('AccountCtrl', function($scope, $http) {
    $http.get('http://localhost:8000/api/menu/drink').then(function (data){
      $scope.drinks = data.data;
    });
  });
