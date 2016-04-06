var app = angular.module('CyclingFitnessWebApplication');

app.controller('reportsController', ['$scope', '$http' , '$routeParams', '$route', 'NgMap', '$cookies', '$location', function($scope, $http, $routeParams, $route, NgMap, $cookies, $location){

    $scope.reports = {};
    console.log("reports controller");
    $http.get('http://localhost:8000/reports?username='+ $cookies.get('currentUser')).then(
        function(response){
            console.log(response.data);
            $scope.reports = response.data;


        }

    )


}
]);