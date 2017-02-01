angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider.state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'templates/login.html'
  });

  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.food', {
      url: '/food',
      views: {
        'tab-food': {
          templateUrl: 'templates/tab-food.html',
          controller: 'FoodCtrl'
        }
      }
    })
    .state('tab.food-detail', {
      url: '/food/:Id',
      views: {
        'tab-food': {
          templateUrl: 'templates/food-detail.html',
          controller: 'FoodDetailCtrl'
        }
      }
    })
  .state('tab.drink', {
    url: '/drink',
    views: {
      'tab-drink': {
        templateUrl: 'templates/tab-drink.html',
        controller: 'DrinkCtrl'
      }
    }
  })
    .state('tab.drink-detail', {
      url: '/drink/:dataDrink',
      views: {
        'tab-drink': {
          templateUrl: 'templates/drink-detail.html',
          controller: 'DrinkDetailCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/login');

});
