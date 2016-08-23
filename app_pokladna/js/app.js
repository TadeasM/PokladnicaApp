var warchalPokladna = angular.module('warchalPokladna',
  ['ngRoute', 'firebase',  'angularUtils.directives.dirPagination'])
  .constant('FIREBASE_URL', 'https://firebaseApp.firebaseIO.com/');


warchalPokladna.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Pro pristup na tyto stransky se, prosim, prihlaste.';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run

warchalPokladna.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/returnitems', {
      templateUrl: 'views/returnitems.html',
      controller: 'ReturnController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    when('/postreclamation', {
      templateUrl: 'views/postreclamation.html',
      controller: 'PostreclamationController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    when('/summary', {
      templateUrl: 'views/summary.html',
      controller: 'homeController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/home', {
      templateUrl: 'views/home.html',
      controller: 'homeController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    when('/test', {
      templateUrl: 'views/test.html',
      controller: 'homeController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);
