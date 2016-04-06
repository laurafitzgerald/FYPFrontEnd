var app = angular.module('CyclingFitnessWebApplication');






app.controller('bikeController', ['$scope', '$cookies', '$http', '$location', function($scope, $cookies, $http, $location){


    $scope.bike = {};
    $scope.bikeTypes = [
        {name: 'Mountain Bike', value: "Mountain"},
        {name: 'Racing Bike', value: "Racer"},
        {name: 'Hybrid Bike', value: "Hybrid"},
        {name: 'Other', value: "Other"}
    ];



    $scope.addBike = function(){
        console.log("adding bike");
        console.log($scope.bike);
        $scope.bike.username = $cookies.get('currentUser');
        $http.post('http://localhost:8000/bikes', $scope.bike)
            .success(function(){
                $location.path('/bikes');
            })
            .error(function(){
                alert("there was a problem saving your bike");

            });
    }

}
]);