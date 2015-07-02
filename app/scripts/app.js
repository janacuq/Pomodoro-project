var app = angular.module("Pomodoro", ["ui.router", "firebase"]);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

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


app.controller("MainController", ['$scope', '$interval', '$firebaseObject', function ($scope, $interval, $firebaseObject) {
    var ref = new Firebase("https://amber-inferno-5080.firebaseio.com");

    //  $scope.data = $firebaseObject(ref);

    // syncObject.$bindTo($scope, "data");

    $scope.time = '1500';
    $scope.timeBreak = '300';

    $scope.runningWork = false;
    $scope.onBreak = false;
    $scope.pausedBreak = false;

    $scope.start = function () {
        var promise = $interval(function () {
            if ($scope.time === 0) {
                $scope.runningWork = false;
                $scope.onBreak = true;
                $interval.cancel(promise);
            } else {
                $scope.time -= 1;
                $scope.runningWork = true;
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
                $scope.runningBreak = false;

                return $scope.time = '1500';
                $interval.cancel(promise2);

            } else {
                $scope.timeBreak -= 1;
                $scope.runningBreak = true;
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
