'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'allston.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/playground', {templateUrl: 'partials/switches.html', controller: 'ControllerSwitchBS'});
  $routeProvider.otherwise({redirectTo: '/playground'});
}]);
