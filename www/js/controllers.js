angular.module('starter.controllers', [])

  .constant('CONF',{
    'HOST': 'https://telukpenyu-be.herokuapp.com/'
  })

.controller('DashCtrl', function($scope, $http,$ionicPopup,CONF) {
  $scope.orderField = {};
  $http.get(CONF.HOST+'api/menu/food').then(function (res){
    var row = 0;
    angular.forEach(res.data,function(val, key){
      res.data[key].qty   = 0 ;
      res.data[key].noRow =row;
      row++;
    });
    $scope.foods = res.data;
  });
  $http.get(CONF.HOST+'api/menu/drink').then(function (res2){
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

    $http.post(CONF.HOST+'api/order', $scope.orderField).success(function (data) {
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

.controller('FoodCtrl', function($scope, $http, CONF) {

  $http.get(CONF.HOST+'api/menu/food').then(function (res){
    $scope.foods = res.data;
  });
})
  .controller('FoodDetailCtrl', function($scope, $stateParams, $http, CONF) {
    var id = $stateParams.Id;
    $http.get(CONF.HOST+'api/menu/'+id).then(function (data){
      $scope.food = data.data[0];
    });
})
  .controller('LoginCtrl', function($scope, $http, $ionicPopup, $state, CONF) {

    $scope.login = function(data) {
      $http.post(CONF.HOST+'api/login',data).then(function (res){
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

  .controller('DrinkDetailCtrl', function($scope, $stateParams, $http, CONF) {
    var id = $stateParams.dataDrink;
    $http.get(CONF.HOST+'api/menu/'+id).then(function (data){
      $scope.drink = data.data[0];
    });
  })

  .controller('DrinkCtrl', function($scope, $http, CONF) {
    $http.get(CONF.HOST+'api/menu/drink').then(function (data){
      $scope.drinks = data.data;
    });
  });
