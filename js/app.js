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
    
    .when('/actor.html/:name', {
        templateUrl: 'pages/actor.html',
        controller: 'actorController'
    })
    
});

// service

movieApp.service('movieService',function(){
   
    this.movie = "Thor";
    this.getMovieDetails = function(name){

    }

});

// controllers

movieApp.controller('actorController', ['$scope', '$http', '$routeParams',  'movieService',
    function($scope, $http, $routeParams, movieService){
    console.log($routeParams.name);
    $scope.movieActor = $http.get("https://api.themoviedb.org/3/search/person?api_key=651514f7e8896c44cfcec49d1bf2f778&search_type=ngram&query=" + $routeParams.name)
        .then(function(response){
            $scope.actorDetails = response.data;
            console.log($scope.actorDetails);
        });
}]);

movieApp.controller('homeController', ['$scope', 'movieService',function($scope, movieService){
    
    $scope.movie = movieService.movie;
    
    $scope.$watch('movie', function(){
       movieService.movie = $scope.movie; 
    });
    
}]);

movieApp.controller('movieController',['$scope','$resource','$http', '$routeParams','movieService',function($scope, $resource, $http,  $routeParams, movieService){
    
    $scope.movie = movieService.movie;
    $scope.splitActors = function(string, nb) {
        var array = string.split(',');
        return array[nb];
    }
    
    $scope.movieAPI = $http.get("http://www.omdbapi.com/?t=" + $scope.movie + "&y=&plot=full&r=json")
        .then(function(response){
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
    
    /* related movies */
    
    $http.get("http://www.omdbapi.com/?s=" + $scope.movie)
        .then(function(response) {
          $scope.related = response.data;
    });
    
    /* update search on click of related movies */
    
    $scope.update = function(movie) {
      $scope.movie = movieService.movie;
      console.log($scope.movie);
    };

    $scope.movieActor = $http.get("https://api.themoviedb.org/3/search/person?api_key=651514f7e8896c44cfcec49d1bf2f778&search_type=ngram&query=anthony%20hopkins")
        .then(function(response){
            $scope.actorDetails = response.data;
            console.log($scope.actorDetails);
    });  
    
    
}]);    

/*

getActor(actorID)

{{details.Actors}}
http://api.themoviedb.org/3/person/id/movie_credits

http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=jessica+simpson

$scope.movieActor = "http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=";
    $http({
        method: 'jsonp',
        url: $scope.movieActor,
        params: {
            format: 'jsonp',
            q: 'Anthony Hopkins',
            callback: 'JSON_CALLBACK'
        }
    }).then(function (response) {
        alert(response.data);
    });

    $scope.movieActor = $http.get("http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=anthonyhopkins")
        .then(function(response){
            $scope.actorDetails = response.data;
            console.log($scope.actorDetails);
    });  


    ---- IMBD Info on the Actor ----

    $scope.movieActor = "http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=";
        $http({
            method: 'jsonp',
            url: $scope.movieActor,
            params: {
                format: 'jsonp',
                q: 'Anthony Hopkins',
                callback: 'JSONP_CALLBACK'
            }
        }).then(function (response) {
            alert(response.data);
        });    

https://api.themoviedb.org/3/search/person?api_key=651514f7e8896c44cfcec49d1bf2f778&search_type=ngram&query=anthony+hopkins

*/