var app = angular.module("Pomodoro", ["ui.router", "firebase", "ngAnimate"]);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/clock');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/app/templates/home.html'
    });
    $stateProvider.state('clock', {
        url: '/clock',
        controller: 'MainController',
        templateUrl: '/app/templates/clock.html'
    });


}]);


app.controller("MainController", ['$scope', '$interval', '$firebase', function ($scope, $interval, $firebaseArray) {




    $scope.time = '3';
    $scope.timeBreak = '6';
    $scope.footerMessage = 'Ready?';

    $scope.counter = 0;

    $scope.Work = true;

    $scope.start = function () {

        var promise = $interval(function () {
            if ($scope.time === 0) {
                $scope.mySound.play();
                $scope.runningWork = false;
                $scope.counter += 1;
                console.log($scope.counter);
                if ($scope.counter % 4 === 0) {
                    $scope.Work = false;
                    $scope.timeBreak = '8';
                    console.log('long Break');
                    $scope.footerMessage = 'You deserve a long break!';
                    $interval.cancel(promise);
                } else {
                    $scope.timeBreak = '6';
                    $scope.footerMessage = 'Time for a break';
                    $scope.Work = false;
                    console.log('finishWork');
                    $interval.cancel(promise);
                }
            } else {
                $scope.time -= 1;
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
        $scope.stop();
        $scope.runningWork = false;
    };

    $scope.startBreak = function () {
        var promise2 = $interval(function () {
            if ($scope.timeBreak === 0) {
                $scope.mySound.play();
                $scope.time = '3';
                $interval.cancel(promise2);
                console.log('finishBreak');
                $scope.Work = true;
                $scope.runningBreak = false;
                $scope.footerMessage = 'Time to work!';

            } else {
                $scope.timeBreak -= 1;
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
            $scope.stopBreak();
            $scope.runningBreak = false;

        };
    };

    $scope.mySound = new buzz.sound("/app/sounds/40725^DING1.mp3", {
        preload: true
    });

    $scope.showmenu = false;
    
    
    $scope.toogle = function() {
        if($scope.showmenu){
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
        hr = (hr) ? ':' + hr : '';
        return hr + min + ':' + sec;
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
        });

    };

    $scope.delete = function (task) {
        console.log(task);
        $scope.tasks.$remove(task);
    
    };
    
    
   
    
});
