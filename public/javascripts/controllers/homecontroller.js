var app = angular.module('CyclingFitnessWebApplication');

app.controller('homeController', ['$scope', '$cookies', '$http', '$filter', '$location', 'url', function($scope,$cookies,$http, $filter, $location, url){


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

    $http.get('http://' + url + '/friendships').then(
        function(response){

            $scope.friends = response.data;
            console.log($scope.friends);


            $http.get('http://' + url + '/activities/' + $cookies.get('currentUser')).then(
                function(response){

                    $scope.feedActivities= response.data;
                    console.log(response.data);


                    angular.forEach($scope.friends ,function(value, index){

                            console.log(value.friend_name);
                            $http.get('http://' + url + '/activities/' + value.friend_name).then(
                                function(response){
                                    console.log(response.data);

                                    angular.forEach(response.data, function(value, index){

                                            $scope.feedActivities = $scope.feedActivities.concat(value);
                                    });
                                    console.log(value.friend_name + " activi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ties : " + response.data);

                                    console.log($scope.feedActivities);



                                    angular.forEach($scope.feedActivities, function(value, index){

                                        //var date = new Date.parse(value.timestamp);
                                        //console.log(value.timestamp);
                                       // console.log(date);
                                        //value.timestamp = date;

                                       // $scope.feedActivities[index].timestamp = date;]

                                        //$scope.feedActivities[index].timestamp = $filter('date')(newDate, "YYYY-MM-DD");
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