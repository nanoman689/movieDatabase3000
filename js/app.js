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
    
    $scope.$watch('city', function(){
       movieService.movie = $scope.movie; 
    });
    
}]);

movieApp.controller('movieController',['$scope', '$resource','movieService',function($scope, $resource, movieService){
    
    $scope.movie = movieService.movie;
    
    $scope.movieAPI = $resource("http://www.omdbapi.com/?t=Thor&y=&plot=full&r=json")
        .then(function(response){
            $scope.details = response.data;
    });
    
    console.log($scope.movieAPI);
    
}]);

/* 

API Key: cc6412ad 

Example: http://img.omdbapi.com/?i=tt2294629&apikey=cc6412ad 

*/
