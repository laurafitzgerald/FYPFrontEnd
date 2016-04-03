var app = angular.module('CyclingFitnessWebApplication');





app.controller('friendsController', ['$http', '$scope',  function($http, $scope){



    $scope.message = "Friends Page";

    $scope.friendships = null;
    $http.get('http://localhost:8000/friendships').then(
        function(response){

            $scope.friendships = response.data;
        }
    )
}
]);