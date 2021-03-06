var app = angular.module('CyclingFitnessWebApplication');





app.controller('friendsController', ['$http', '$scope', '$timeout', '$location', '$cookies', 'url', function($http, $scope, $timeout, $location, $cookies, url){

    $scope.$location = $location;

    $scope.message = "Friends Page";
    $scope.location;
    $scope.friendships = null;
    $scope.searchFriendships = null;
    $scope.results = false;
    $http.get('http://' + url + '/friendships').then(
        function(response){

            $scope.friendships = response.data;
        }
    );

    $scope.add = function(user){

        var newFriend = {};
        newFriend.user_name = $cookies.get('currentUser');
        newFriend.friend_name = user.username;

        $http.post('http://' + url + '/friendship', newFriend).then(
            function(){

                $location.path('/friends');

            }
        )
    };


    $scope.searchByUsername = function(){

        console.log($scope.username);
        $http.get('http://' + url + '/friendships', {
            params: {username : $scope.username}
        }).then(
            function(response){
                $scope.results=true;
                console.log(response.data);
                $scope.searchFriendships = response.data;

                $scope.checkExisting(response.data);

            });


    };

    $scope.checkExisting = function(data){

        angular.forEach(data, function(searchvalue, searchindex){

            if(searchvalue.username===$cookies.get('currentUser')){
                console.log("found current user");
                $scope.searchFriendships.splice(searchindex, 1);
            }
            angular.forEach($scope.friendships, function(value, index){


                console.log("Search value.username " + searchvalue.username);
                console.log(value.friend_name);

                if(searchvalue.username===value.friend_name){
                    console.log(searchvalue.username===value.friend_name);
                    console.log(searchvalue.username);

                    $scope.searchFriendships.splice(searchindex, 1);
                }
            })
        });

    }


    $scope.searchByLocation = function(){

        console.log($scope.location);
        $http.get('http://' + url + '/friendships', {
            params: {location : $scope.location}
        }).then(
            function(response){
                $scope.results=true;
                console.log(response.data);

                $scope.searchFriendships = response.data;

                $scope.checkExisting(response.data);


            });


    };

    $scope.delete = function(friendship){
        console.log("delete called");
        $http.delete('http://' + url + '/friendships/' +friendship.id)
            .then(function(response){
                console.log("friend deleted" + response);


                $http.get('http://' +url + '/friendships').then(
                    function(response){

                        $scope.friendships = response.data;
                    }
                );

            })
            .then(function(error){

                $http.get('http://' +url + '/friendships').then(
                    function(response){

                        $scope.friendships = response.data;
                    }
                );

            });

    };

    $timeout(function(){
        $scope.$apply();
    }, 0)

}
]);