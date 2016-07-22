'use strict';

// Modules

var movieApp = angular.module('movieApp',['ngRoute','ngResource']);

// Routes

movieApp.config(function($routeProvider){
   
    $routeProvider
    
    .when('/', {
        title: 'Home',
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
    
    .when('/movie.html/:name', {
        title: 'Movie Results',
        templateUrl: 'pages/movie.html',
        controller: 'movieController'
    })
    
    .when('/actor.html/:name', {
        title: 'Home',
        templateUrl: 'pages/actor.html',
        controller: 'actorController'
    })
    
});

// Service

movieApp.service('movieService',function(){
   
    this.movie = "Thor";
    this.getMovieDetails = function(name){

    }

});

// Controllers

// Actor controller - Gets the Actor's info from the IMDBid

movieApp.controller('actorController', ['$scope', '$http', '$routeParams',  'movieService',
    function($scope, $http, $routeParams, movieService){
    console.log($routeParams.name);
    $scope.movie =  movieService.movie;
    $scope.movieActor = $http.get("https://api.themoviedb.org/3/search/person?api_key=651514f7e8896c44cfcec49d1bf2f778&search_type=ngram&query=" + $routeParams.name)
        .then(function(response){
            $scope.actorDetails = response.data.results[0];
            console.log($scope.actorDetails);
        });
}]);

// Search controller - Pulls the value from the search

movieApp.controller('homeController', ['$scope', 'movieService',function($scope, movieService){
    
    $scope.movie = "Thor";
    
}]);

// Movie Controller - Pull the name of the movie from the search and uses two APIs to get the results
// OMDBapi - Pulls most of the movie's information
// TheMoviewDB - Pulls more information for the movie as well as information for the actor(s)

movieApp.controller('movieController',
    ['$scope','$resource','$http', '$routeParams','movieService', '$route',
        function($scope, $resource, $http,  $routeParams, movieService, $route){
    
    $scope.movie = $routeParams.name;
    movieService.movie = $scope.movie;

    console.log('The movie when the page loads: ' + $scope.movie);
    $scope.splitActors = function(string, nb) {
        var array = string.split(',');
        return array[nb];
    }
    
    $scope.movieAPI = $http.get("http://www.omdbapi.com/?t=" + $scope.movie + "&y=&plot=full&r=json")
        .then(function(response){

            if(response.data.Error){
                console.log(response.data.Error);
                //redirect to error view
            }else{
                //everything else
            }

            $scope.details = response.data;
            console.log('The response from the API call');
            console.log(response);

            $http.get("https://api.themoviedb.org/3/movie/"
                + $scope.details.imdbID
                + "?api_key=651514f7e8896c44cfcec49d1bf2f778&find/movie/id/callback=JSON_CALLBACK")
           .then(function(response){
               console.log('The second Then');
               console.log(response);
               $scope.moreDetails = response.data;
           })
        }
    );
    
    /* related movies results */
    
    $http.get("http://www.omdbapi.com/?s=" + $scope.movie)
        .then(function(response) {
          $scope.related = response.data;
    });
    
    /* update search on click of related movies */
    
    $scope.update = function(movie) {
      $scope.movie = movie;
      console.log($scope.movie);
      $route.reload();
    };
    
}]);    