var app = angular.module('CyclingFitnessWebApplication' );

app.constant('author', 'Laura Fitzgerald');


app.config(['author', function(author){

}]);

app.controller('mainController', ['$scope', '$location', '$cookies', 'author', 'address', function($scope, $location, $cookies, author, address) {
// create a message to display in our view
    $scope.message = 'Cycling Fitness Web App 1.0';
    $scope.author = author;
    $scope.address = address;
    $scope.formData = {};
    $scope.username = $cookies.get('currentUser');
    console.log("Main Controller : " + $scope.username);



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
