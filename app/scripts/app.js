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


app.controller("MainController", function($scope, $firebaseObject) {
    var ref = new Firebase("https://amber-inferno-5080.firebaseio.com");
    
  //  $scope.data = $firebaseObject(ref);
    
    // syncObject.$bindTo($scope, "data");
    
    $scope.time = '25:00';
    
 
     
    $scope.start = function() {
        $scope.time=50;
        if($scope.time === 0) {
           return  $scope.time = 'Break?';
        } else {
            $scope.time -=1;
            setTimeout("start()", 1000);
        }
    };
    

});