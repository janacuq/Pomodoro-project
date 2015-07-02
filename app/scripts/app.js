var app = angular.module("Pomodoro", ["ui.router", "firebase"]);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
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


app.controller("MainController",['$scope', '$interval', '$firebaseObject', function($scope, $interval, $firebaseObject) {
    var ref = new Firebase("https://amber-inferno-5080.firebaseio.com");
    
  //  $scope.data = $firebaseObject(ref);
    
    // syncObject.$bindTo($scope, "data");
    
    $scope.time = '50';
    $scope.running = false;
    $scope.buttonName = 'START';
    
    if ($scope.running === true) {
        $scope.buttonName = 'Reset';
    } else {
        $scope.buttonName = 'Start'
    }
    
     
    $scope.start = function() {
        setInterval(function() {
         $scope.time -=1;
         $scope.$apply();
        }, 1000);
    };
    

}]);

/*
app.directive('myTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
    return function (scope, element, attrs) {
        var format,
            stopTime;
        
        function updateTime() {
            element.text



    };
    });*/