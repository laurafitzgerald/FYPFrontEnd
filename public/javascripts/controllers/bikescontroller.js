var app = angular.module('CyclingFitnessWebApplication');

app.controller('bikesController', ['$scope', '$http' , function($scope, $http){

    $scope.message = "Your Bikes";

    $scope.bikes = null;
    $http.get('http://localhost:8000/bikes').then(
        function(response){
            console.log(response.data);
            $scope.bikes = response.data;
        }
    )
}
]);