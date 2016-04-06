var app = angular.module('CyclingFitnessWebApplication');





app.controller('friendsController', ['$http', '$scope', '$timeout', '$location', function($http, $scope, $timeout, $location){

    $scope.$location = $location;

    $scope.message = "Friends Page";

    $scope.friendships = null;
    $scope.searchFriendships = null;
    $scope.results = false;
    $http.get('http://localhost:8000/friendships').then(
        function(response){

            $scope.friendships = response.data;
        }
    )


    $scope.searchByUsername = function(){

        console.log($scope.username);
        $http.get('http://localhost:8000/friendships', {
            params: {username : $scope.username}
        }).then(
            function(response){
                $scope.results=true;
                console.log(response.data);
                $scope.searchFriendships = response.data;


            });


    }

    $scope.delete = function(friendship){

        $http.delete('http://localhost:8000/friendships/' +friendship.id)
            .success(function(response){
                console.log("friend deleted" + response);

            });








    };

    $timeout(function(){
        $scope.$apply();
    }, 0)

}
]);