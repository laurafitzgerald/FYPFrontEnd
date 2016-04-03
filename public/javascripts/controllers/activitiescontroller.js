var app = angular.module('CyclingFitnessWebApplication');



app.controller('activitiesController', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {

    $scope.message = "Activities Page";


    $scope.activities = null;
    console.log($scope.activities);
    $http.get('http://localhost:8000/activities').then(
        function(response) {
            console.log(response.data);
            $scope.activities = response.data;
        }
    );

    $scope.edit = function(activity){



    }

    $scope.delete = function(activity){
        console.log(activity);
        $http.delete('http://localhost:8000/activities/' + activity.id).then(
            function(response){
                console.log(response);


            }


        )
    }

}
]);




