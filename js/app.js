'use strict';

// modules

var movieApp = angular.module('movieApp',['ngRoute','ngResource']);


// route

movieApp.config(function($routeProvider){
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/movie.html', {
        templateUrl: 'pages/movie.html',
        controller: 'movieController'
    })
    
});

// service

movieApp.service('movieService',function(){
   
    this.movie = "Thor";
    
});

// controllers

movieApp.controller('homeController', ['$scope', 'movieService',function($scope, movieService){
    
    $scope.movie = movieService.movie;
    
    $scope.$watch('movie', function(){
       movieService.movie = $scope.movie; 
    });
    
}]);

movieApp.controller('movieController',['$scope','$resource','$http', '$routeParams','movieService',function($scope, $resource, $http,  $routeParams, movieService){
    
    $scope.movie = movieService.movie;
    
    $scope.movieAPI = $http.get("http://www.omdbapi.com/?t=" + $scope.movie + "&y=&plot=full&r=json")
        .then(function(response){
            $scope.details = response.data;
    });

    console.log($scope.movieAPI);
    
}]);

/* 

API Key: cc6412ad 

Example: 

http://img.omdbapi.com/?i=tt2294629&apikey=cc6412ad 


Turn the title into it's IMBD database number to get the image.
In this case Thor is tt0800369

http://img.omdbapi.com/?i=tt0800369&apikey=cc6412ad

Parameters:
i = IMDb ID
h (optional) = Desired height of image.

*/