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
	}).when('/login', {
		templateUrl : 'app/components/login/login.html',
		controller : 'loginController'
	}).when('/home', {
		templateUrl : 'index.html',
		controller : 'mainController'
	}).when('/result', {
		templateUrl : 'app/components/results/resultsTable.html',
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
finderApp.controller('loginController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Welcome!';

});

finderApp.controller(
				'aboutController',
				function($scope) {
					$scope.message = 'Trying to make this work, if it does, it will be awesome!';
				});

finderApp.controller('contactController', function($scope) {
	$scope.message = 'Contact us! JK. This is just a demo.';
});

//finderApp
//		.controller(
//				'homeController',
//				function($scope) {
//	
//				});

finderApp.controller('homeController', function ($scope) {
	  $scope.places = [
	    {'name': 'ISG',
	     'comment': 'full service Masjid',
	     'code': '20876'},
	    {'name': 'ICM',
	     'comment': 'full service Masjid',
	     'code': '20870'},
	    {'name': 'Adam Center',
	     'comment': 'full service Masjid',
	    'code': '20800'}
	  ];
	});


finderApp.controller('tabController', function() {
	this.tab = 1;

	this.setTab = function(newValue) {
		this.tab = newValue;
	};

	this.isSet = function(tabName) {
		return this.tab === tabName;
	};
});

// test data
var masjid = [ {
	name : 'Islamic Society Of Germantown',
	desc : 'Full service Masjid',
	zipcode : '20876',
	address : '100 blunt rd Germantown, MD 20876',
}, {
	name : 'Islamic Civil of Maryland',
	desc : 'Full service Masjid',
	zipcode : '20860',
	address : '100 main rd Gaithersburg, MD 20860',
} ];

