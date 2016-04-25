var app = angular.module('CyclingFitnessWebApplication', ['ngRoute', 'ngCookies', 'ngMap']);

app.factory('myHttpResponseInterceptor', ['$q', '$cookies', '$location',  function( $q, $cookies, $location){
    return {
        request: function (config) {

            if(angular.isDefined($cookies.get('sessionKey'))){

                config.headers.XAuth = $cookies.get('sessionKey');
            }
            return config || $q.when(config);
        },
        requestError: function(request){
            return $q.reject(request);
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (response) {
            console.log("response error called");
            console.log("Response "+ response.status);
            if (response && response.status === 401) {
                $location.path('login');
            }
            if (response && response.status >= 500) {
            }
            return $q.reject(response);
        }
    };

}]);

app.constant('author', 'Laura Fitzgerald');
app.constant('address', 'BSc(Hons) in Software Systems Development, Dept of Computing, and Mathematics, School of Science, W.I.T.');
app.constant('url', 'a08047f5a028211e682ef02b2adee9a0-835752032.eu-central-1.elb.amazonaws.com:80');


app.config(['$provide', '$httpProvider', '$routeProvider',  function($provide, $httpProvider,$routeProvider ){




    $httpProvider.interceptors.push('myHttpResponseInterceptor');

    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'pages/home.ejs',
            controller  : 'homeController'
        })
        .when('/about', {
            templateUrl : 'pages/about.ejs',
            controller: 'aboutController'

        })
        .when('/activity/:id',{
            templateUrl : 'pages/activity.ejs',
            controller : 'activityController'
        })

        .when('/activities',{
            templateUrl: 'pages/activities.ejs',
            controller: 'activitiesController'
        })
        .when('/bikes', {
            templateUrl: 'pages/bikes.ejs',
            controller: 'bikesController'
        })
        .when('/friends',{
            templateUrl: 'pages/friends.ejs',
            controller: 'friendsController'
        })
        .when('/addactivity', {
            templateUrl: 'pages/addactivity.ejs',
            controller: 'activityController'

        })
        .when('/report', {
            templateUrl: 'pages/report.ejs',
            controller: 'reportController'
        })
        .when('/reports',{
            templateUrl: 'pages/reports.ejs',
            controller: 'reportsController'
        })
        .when('/addfriends',{
            templateUrl: 'pages/addfriend.ejs',
            controller: 'friendsController'

        })
        .when('/login',{
            templateUrl: 'pages/login.ejs',
            controller: 'loginController'
        })
        .when('/addbike',{
            templateUrl: 'pages/addbike.ejs',
            controller: 'bikeController'
        })
        .otherwise({
            redirectTo: '/'
        });





}]).run(function($rootScope, validatesCookie){

    $rootScope.$on('$routeChangeSuccess', function(){
            validatesCookie();
        });
}).factory('validatesCookie', function($cookies, $location){
    return function(){
        if(!angular.isDefined($cookies.get('sessionKey'))){
            $location.path('/login');
        }

    };
});









