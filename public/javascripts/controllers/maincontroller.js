var app = angular.module('CyclingFitnessWebApplication' );


app.controller('mainController', ['$scope', '$location', '$cookies', function($scope, $location, $cookies) {
// create a message to display in our view
    $scope.message = 'Cycling Fitness Web App 1.0';

    $scope.formData = {};


    if(angular.isDefined($cookies.get('sessionKey'))){

        //$location.path('/activities');
    }else{
        $location.path('/login');
    }

    $scope.isLoggedIn = function(){


        if(angular.isDefined($cookies.get('sessionKey'))){

            return true;
        }else{

            return false;
        }

    }

    $scope.logout = function(){

        delete $cookies.remove('sessionKey');


    }
}
]);
