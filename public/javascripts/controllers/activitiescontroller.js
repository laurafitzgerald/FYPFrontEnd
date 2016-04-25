var app = angular.module('CyclingFitnessWebApplication');



app.controller('activitiesController', ['$scope', '$location', '$http', '$cookies', '$route', 'url', function($scope, $location, $http, $cookies, $route, url) {

    $scope.message = "Activities Page";
    $scope.noOfCycles = 0;
    $scope.noOfRuns = 0;


    $scope.numberOfActivities = function(data){

        angular.forEach(data, function(value, index){

            console.log(value.type);
            if(value.type==='Cycle'){
                $scope.noOfCycles+=1;

            }
            else
            if(value.type=='Run'){

                $scope.noOfRuns +=1;
            }


        })


    };


    $scope.activities = null;
    console.log($scope.activities);
    $http.get('http://' + url + '/activities/'  + $cookies.get('currentUser')).then(
        function(response) {
            console.log(response.data);
            $scope.activities = response.data;
            $scope.numberOfActivities(response.data);
        }
    );

    $scope.edit = function(activity){



    }

    $scope.delete = function(activity){
        console.log(activity);
        $http.delete('http://' + url + '/activities/' + activity.id).then(
            function(response){
                console.log(response);
                $route.reload();

            }


        )
    }



}
]);




