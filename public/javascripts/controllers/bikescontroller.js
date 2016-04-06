var app = angular.module('CyclingFitnessWebApplication');

app.controller('bikesController', ['$scope', '$http' ,'$location', function($scope, $http, $location){

    $scope.message = "Your Bikes";

    $scope.bikes = null;
    $http.get('http://localhost:8000/bikes').then(
        function(response){
            console.log(response.data);
            $scope.bikes = response.data;

        }
    )

    $scope.delete = function(serial_number){
        console.log("delete button clicked");
        if(confirm("Are you sure you want to delete this bike?")){
            $http.delete('http://localhost:8000/bikes/'  + serial_number)
                .success(function(data){

                })
                .error(function(){
                    console.log("problem deleteing");
                })


        }

    }


    $scope.report = function(bike){
        console.log(bike);
        var serial_number = bike.serial_number;
        $location.path('/report/').search({serial_number: serial_number});

    }
}
]);