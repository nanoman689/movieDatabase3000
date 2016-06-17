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
    
    .when('/actor.html', {
        templateUrl: 'pages/actor.html',
        controller: 'actorController'
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
            
            $http.get("https://api.themoviedb.org/3/movie/" + $scope.details.imdbID + "?api_key=651514f7e8896c44cfcec49d1bf2f778&find/movie/id/callback=JSON_CALLBACK")
           .then(function(response){
               $scope.moreDetails = response.data;
           })
        }
    );
}]);    

/* Display the Actor info from the mouse click */

actor.Controller('movieController',['$scope','$resource','$http', '$routeParams','movieService',function($scope, $resource, $http,  $routeParams, movieService){
    
    $scope.movie = movieService.movie;
    
    $scope.movieAPI = $http.get("https://api.themoviedb.org/person/id/movie_credits" + $scope.details.imdbID + "?api_key=651514f7e8896c44cfcec49d1bf2f778&find/movie/id/callback=JSON_CALLBACK")
        .then(function(response){
            $scope.actorDetails = response.data;
        });
}]);    
/*

http://api.themoviedb.org/3/person/id/movie_credits

*/