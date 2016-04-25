var app = angular.module('CyclingFitnessWebApplication');

app.controller('reportsController', ['$scope', '$http' , '$routeParams', '$route', 'NgMap', '$cookies', '$location', function($scope, $http, $routeParams, $route, NgMap, $cookies, $location){

    $scope.reports = {};
    console.log("reports controller");
    $http.get('http://localhost:80/reports?username='+ $cookies.get('currentUser')).then(
        function(response){
            console.log(response.data);
            $scope.reports = response.data;


        }

    )


    $scope.delete = function(id){
        console.log("delete button clicked");
        if(confirm("Are you sure you want to delete this report?")){
            $http.delete('http://localhost:80/reports/'  + id)
                .success(function(data){
                    $route.reload();
                })
                .error(function(){
                    console.log("problem deleteing");
                })


        }

    };


}
]);