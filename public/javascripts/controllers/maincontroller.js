var app = angular.module('CyclingFitnessWebApplication' );

app.constant('author', 'Laura Fitzgerald');

app.config(['author', function(author){

}]);

app.controller('mainController', ['$scope', '$location', '$cookies', 'author', function($scope, $location, $cookies, author) {
// create a message to display in our view
    $scope.message = 'Cycling Fitness Web App 1.0';
    $scope.author = author;
    $scope.formData = {};
    $scope.user = $cookies.get('currentUser');

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
