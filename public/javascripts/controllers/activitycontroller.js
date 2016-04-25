var app = angular.module('CyclingFitnessWebApplication');

app.controller('activityController', ['$scope', '$http', '$location', '$cookies', url,  function($scope, $http, $location, $cookies, url) {

    $scope.types = [
        {name: 'Cycle', value: 'Cycle'},
        {name: 'Run', value: 'Run'}
    ]

    $scope.activity = {};

    $scope.message = 'Enter Your Activity Details Below..';


    $scope.addActivity = function(){
        //$scope.formData.name = $scope.formData.name.name;
        //console.log($scope.formData.name);
        console.log($scope.activity);
        $scope.activity.username = $cookies.get('currentUser');
        $http.post('http://' + url + '/activities', $scope.activity)
            .success(function(){

                $location.path('/activities');
                console.log($scope.activity);
            })
            .error(function(data){
                console.log('Error' + data);
            });
    }


}

]);

