/**
 * Created by laura on 25/03/16.
 */
var app = angular.module('CyclingFitnessWebApplication');

app.controller('loginController', ['$http', '$scope', '$location', '$cookies', '$window', function($http, $scope, $location, $cookies, $window){

    $scope.message = "Login Page";

    $scope.userlogin = {};
    console.log($scope.userlogin);

    console.log("Session key " + $cookies.get('sessionKey'));
    $scope.login = function(){

        console.log($scope.userlogin);
        $http.post('http://localhost:8000/sessions', $scope.userlogin)
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
                    $location.path('/about');
                }


            })
            .error(function(response){

                console.log("Error " + response);

            });
    }

}
]);
