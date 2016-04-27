var app = angular.module('CyclingFitnessWebApplication');

app.controller('reportController', ['$scope', '$http' , '$routeParams', '$route', 'NgMap', '$cookies', '$location', 'url', function($scope, $http, $routeParams, $route, NgMap, $cookies, $location, url){

    $scope.report ={};
    $scope.map = true;

    $scope.ifMap = function(){
        return $scope.map;
    };
    $scope.setMap = function(){
        $scope.map=true;
    };
    $scope.setText = function(){
        $scope.map=false;
    }

    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });


    $scope.mapClicked = function(e){


        $scope.report.location_lat = e.latLng.lat();
        $scope.report.location_lng = e.latLng.lng();
      console.log(e.latLng.lat());
        console.log(e.latLng.lng());

    };


    $http.get('http://' + url + "/users/" + $cookies.get('currentUser')).then(
        function(response){
            console.log(response.data);
            $scope.user = response.data;
        });


    $scope.addReport = function(){
            $scope.report.username = $cookies.get('currentUser');
            $scope.report.serial_number = $scope.bike.serial_number;
            console.log("report button clicked");
            $http.post('http://' + url + '/reports', $scope.report)
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


    $http.get('http://' + url + '/bikes/' + serial_number)
        .success(function(data){
            console.log(data);
            $scope.bike = data[0];
            console.log($scope.bike);
        })
}
]);