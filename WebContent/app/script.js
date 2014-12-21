// script.js

// create the module and name it finderApp
// also include ngRoute for all our routing needs
var finderApp = angular.module('finderApp', [ 'ngRoute' ]);

// Define Routing for app
finderApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/about', {
		templateUrl : 'app/components/about/about.html',
		controller : 'aboutController'
	}).when('/contact', {
		templateUrl : 'app/components/contact/contact.html',
		controller : 'contactController'
	}).when('/home', {
		templateUrl : 'index.html',
		controller : 'mainController'
	}).when('/result', {
		templateUrl : 'app/components/home/home.html',
		controller : 'homeController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);


// create the controller and inject Angular's $scope
finderApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Welcome!';

});

finderApp.controller('aboutController', function($scope) {
	$scope.message = 'Trying to make this work, if it does, it will be awesome!';
});

finderApp.controller('contactController', function($scope) {
	$scope.message = 'Contact us! JK. This is just a demo.';
});

finderApp.controller('homeController', function($scope) {
	$scope.message = 'Trying to make this work, if it does, it will be awesome!';
	this.places = masjid;
	
});
//test data
var masjid = [
{
		name: 'Islamic Society Of Germantown',
		zipcode: '20876',
		address: '100 blunt rd Germantown, MD 20876',
},
{
		name: 'Islamic Civil of Maryland',
		zipcode: '20860',
		address: '100 main rd Gaithersburg, MD 20860',
}
];