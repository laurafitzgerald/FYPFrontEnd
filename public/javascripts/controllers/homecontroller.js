var app = angular.module('CyclingFitnessWebApplication');

app.controller('homeController', ['$scope', '$cookies', '$http', '$filter', '$location', function($scope,$cookies,$http, $filter, $location){


    $scope.feedActivities = [];

    var limitStep = 5;

    $scope.limit = limitStep;
    $scope.incrementLimit = function(){
         $scope.limit += limitStep;

    };
    $scope.decrementLimit = function(){
        $scope.limit -= limitStep;
    };

    $scope.selectActivity = function(id){
      $location.path('activity/' +id);

    };



    $scope.friends = [];

    $http.get('http://localhost:8000/friendships').then(
        function(response){

            $scope.friends = response.data;
            console.log($scope.friends);


            $http.get('http://localhost:8000/activities/' + $cookies.get('currentUser')).then(
                function(response){

                    $scope.feedActivities= response.data;
                    console.log(response.data);


                    angular.forEach($scope.friends ,function(value, index){

                            console.log(value.friend_name);
                            $http.get('http://localhost:8000/activities/' + value.friend_name).then(
                                function(response){
                                    console.log(response.data);

                                    angular.forEach(response.data, function(value, index){

                                            $scope.feedActivities = $scope.feedActivities.concat(value);
                                    });
                                    console.log(value.friend_name + " activties : " + response.data);

                                    console.log($scope.feedActivities);



                                    angular.forEach($scope.feedActivities, function(value, index){

                                        //var date = new Date.parse(value.timestamp);
                                        //console.log(value.timestamp);
                                       // console.log(date);
                                        //value.timestamp = date;
                                        var newDate = value.timestamp.replace("/", "-")
                                       // $scope.feedActivities[index].timestamp = date;]

                                        $scope.feedActivities[index].timestamp = $filter('date')(newDate, " EEE YYYY-MM-DD HH:mm:ss");
                                        console.log($scope.feedActivities[index].timestamp);
                                    });


                                }

                            )
                        });

                }

            )
        }
    );





}]);