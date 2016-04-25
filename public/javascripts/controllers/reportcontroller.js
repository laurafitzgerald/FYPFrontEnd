var app = angular.module('CyclingFitnessWebApplication');

app.controller('reportController', ['$scope', '$http' , '$routeParams', '$route', 'NgMap', '$cookies', '$location', function($scope, $http, $routeParams, $route, NgMap, $cookies, $location){

    $scope.report ={};

    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });


    $scope.addReport = function(){
            $scope.report.username = $cookies.get('currentUser');
            $scope.report.serial_number = $scope.bike.serial_number;
            console.log("report button clicked");
            $http.post('http://localhost:80/reports', $scope.report)
                .success(function(){

                $location.path('/reports');
            })
            .error(function(data){

                console.log(data);
            });

        }



    $scope.message = "Your Reports";
    var serial_number = $route.current.params.serial_number;
    $scope.bike = null;
    //$scope.reports = null;
    $scope.statusTypes = [
        {name: 'Lost', value: 'LOST'},
        {name: 'Stolen', value: 'STOLEN'},
        {name: 'Found', value: 'FOUND'}
    ];


    $http.get('http://localhost:80/bikes/' + serial_number)
        .success(function(data){
            console.log(data);
            $scope.bike = data[0];
            console.log($scope.bike);
        })
}
]);