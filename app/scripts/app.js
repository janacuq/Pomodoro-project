var app = angular.module("Pomodoro", ["ui.router", "firebase", "ngAnimate"]);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/clock');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('home', {
    url: '/home',
    templateUrl: '/templates/home.html'
  });
  $stateProvider.state('clock', {
    url: '/clock',
    controller: 'MainController',
    templateUrl: '/templates/clock.html'
  });


}]);


app.controller("MainController", ['$scope', '$interval', '$firebaseArray', '$rootScope', function ($scope, $interval, $firebaseArray, $rootScope) {

  var ref = new Firebase("https://amber-inferno-5080.firebaseio.com/");

  $scope.tasks = $firebaseArray(ref);




  $scope.time = '1500';
  $scope.timeBreak = '300';
  $scope.footerMessage = 'Ready?';
  $scope.counter = 0;
  $scope.Work = true;

  $scope.start = function () {

    var promise = $interval(function () {
      if ($scope.time === 0) {
        $scope.mySound.play();
        $scope.runningWork = false;
        $scope.counter += 1;
        var task = $scope.tasks[$scope.tasks.length - 1];
        task.count += 1;
        $scope.tasks.$save(task);
        console.log($scope.counter);
        if ($scope.counter % 4 === 0) {
          $scope.Work = false;
          $scope.timeBreak = '1800';
          $rootScope.title = $scope.timeBreak;
          console.log('long Break');
          $scope.footerMessage = 'You deserve a long break!';
          $interval.cancel(promise);
        } else {
          $scope.timeBreak;
          $rootScope.title = $scope.timeBreak;
          $scope.footerMessage = 'Time for a break';
          $scope.Work = false;
          $interval.cancel(promise);
        }
      } else {
        $scope.time -= 1;
        $rootScope.title = $scope.time;
        $scope.runningWork = true;
        $scope.footerMessage = 'Sssshhh...Work in Progress';
      }
    }, 1000)

    $scope.stop = function () {
      $interval.cancel(promise);
      $scope.runningWork = false;
    };
  };

  $scope.reset = function () {
    $scope.time = '1500';
    $rootScope.title = $scope.time;
    $scope.stop();
    $scope.runningWork = false;
  };

  $scope.startBreak = function () {
    var promise2 = $interval(function () {
      if ($scope.timeBreak === 0) {
        $scope.mySound.play();
        $scope.time = '1500';
        $rootScope.title = $scope.time;
        $interval.cancel(promise2);
        console.log('finishBreak');
        $scope.Work = true;
        $scope.runningBreak = false;
        $scope.footerMessage = 'Time to work!';

      } else {
        $scope.timeBreak -= 1;
        $rootScope.title = $scope.timeBreak;
        $scope.runningBreak = true;
        $scope.footerMessage = 'Enjoy your break';
      }
    }, 1000)

    $scope.stopBreak = function () {
      $interval.cancel(promise2);
      $scope.runningBreak = false;


    };

    $scope.resetBreak = function () {
      $scope.timeBreak = '300';
      $rootScope.title = $scope.timeBreak;
      $scope.stopBreak();
      $scope.runningBreak = false;

    };
  };

  $scope.mySound = new buzz.sound("/app/sounds/40725^DING1.mp3", {
    preload: true
  });

  $scope.showmenu = false;


  $scope.toogle = function () {
    if ($scope.showmenu) {
      $scope.showmenu = false;

    } else {
      $scope.showmenu = true;


    }
  };

}]);

app.filter('timeCode', function () {

  return function (sec) {

    var hr = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hr * 3600)) / 60);
    sec -= ((hr * 3600) + (min * 60));
    sec += '';
    min += '';
    while (min.length < 2) {
      min = '0' + min;
    }
    while (sec.length < 2) {
      sec = '0' + sec;
    }

    if (isNaN(sec)) {
      return '--:--'
    } else {
      return min + ':' + sec;
    }
  }
});


app.controller('HistoryCtrl', function ($scope, $firebaseArray) {

  var ref = new Firebase("https://amber-inferno-5080.firebaseio.com/");

  $scope.tasks = $firebaseArray(ref);

  $scope.newTask = '';


  $scope.addMessages = function () {

    $scope.tasks.$add({
      text: $scope.newTask,
      created_at: Firebase.ServerValue.TIMESTAMP,
      count: 0
    });
    $scope.newTask = '';


  };

  $scope.delete = function (task) {
    console.log(task);
    $scope.tasks.$remove(task);

  };




});
