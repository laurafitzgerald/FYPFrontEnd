/**
 * Created by laura on 25/03/16.
 */
var app = angular.module('CyclingFitnessWebApplication');

app.controller('loginController', ['$http', '$scope', '$location', '$cookies', '$window', '$route', '$window', 'url', function($http, $scope, $location, $cookies, $window, $route, $window, url){

    $scope.message = "Login Page";

    $scope.userlogin = {};
    $scope.userregister = {};
    console.log($scope.userlogin);

    console.log("Session key " + $cookies.get('sessionKey'));
    $scope.login = function(){

        console.log($scope.userlogin);
        $http.post('http://' + url + '/sessions', $scope.userlogin)
            .success(function(response){
                console.log("'" + response + "'");
                if(angular.equals("", response)){
                    console.log("that didn't work");
                }else{

                    console.log(response);
                    var now =  new $window.Date(),
                        exp = new $window.Date(now.getFullYear(), now.getMonth()+6, now.getDate());

                    $cookies.put('sessionKey', response);
                    $cookies.put('currentUser', $scope.userlogin.username);
                    console.log("Session key " + $cookies.get('sessionKey'));
                    $window.location.reload();
                    $location.path('/homefeed');

                }


            })
            .error(function(response){

                console.log("Error " + response);

            });
    };


    $scope.register = function(){
        console.log("Register clicked");
        console.log($scope.userregister);
        $http.post('http://' + url + '/users', $scope.userregister)
            .success(function(response){
                console.log("Response from register : " + response.data);
                $cookies.put('currentUser', $scope.register.username);

                $scope.userlogin.username = $scope.userregister.username;
                $scope.userlogin.password = $scope.userregister.password;
               $scope.login();

            })
            .error(function(response){

                console.log("Error " + response);

            });
    };




}
]);
