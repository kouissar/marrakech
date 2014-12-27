// script.js

// create the module and name it finderApp
// also include ngRoute for all our routing needs
var finderApp = angular.module('finderApp', [ 'ngRoute' ]);

// Define Routing for app
finderApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/about', {
		templateUrl : 'app/components/about/about.html',
		controller : 'aboutController'
	}).when('/weather', {
		templateUrl : 'app/components/weather/weather.html',
		controller : 'weatherController'
	}).when('/login', {
		templateUrl : 'app/components/login/login.html',
		controller : 'loginController'
	}).when('/home', {
		templateUrl : 'index.html',
		controller : 'mainController'
	}).when('/salat', {
		templateUrl : 'app/components/salat/salat.html',
		controller : 'salatController'
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

finderApp
		.controller(
				'aboutController',
				function($scope) {
					$scope.message = 'Trying to make this work, if it does, it will be awesome!';
				});

finderApp
.controller(
		'salatController',
		function($scope) {
			$scope.message = 'Trying to make this work, if it does, it will be awesome!';
			var date = new Date(); // today
			var times = prayTimes.getTimes(date, [39, -77], -5);
			var list = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];

			var html = '<table id="timetable">';
			html += '<tr><th colspan="2">'+ date.toLocaleDateString()+ '</th></tr>';
			for(var i in list)	{
				html += '<tr><td>'+ list[i]+ '</td>';
				html += '<td>'+ times[list[i].toLowerCase()]+ '</td></tr>';
			}
			html += '</table>';
			document.getElementById('table').innerHTML = html;
		});


finderApp.controller('homeController', function($scope) {
	$scope.places = [ {
		'abr' : 'ISG',
		'name' : 'Islamic Society Of Germantown',
		'address' : '839 blunt rd Germantown MD 20876',
		'phone'   : '389-909-0091',
		'comment' : 'full service Masjid',
		'zipcode' : '20876'
	}, {
		'abr' : 'ICM',
		'name' : 'Islamic Community of Maryland',
		'address' : '839 blunt rd Gaithersburg MD 20876',
		'phone'   : '389-909-0091',
		'comment' : 'full service Masjid',
		'zipcode' : '20800'
	} ];
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

function weatherController($scope, $http) {
	var zip = "20004";
	var base = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
	var unit = "imperial";
	//var zip  = firstName;
	var days = "7";
	var url = base + zip + ",USA&mode=json&units=" + unit + "&cnt=" + days;
	// "http://api.openweathermap.org/data/2.5/forecast/daily?q=20876,USA&mode=json&units=imperial&cnt=7"
	$http.get(url).success(function(response) {
		$scope.names = response;
	});
}




finderApp.filter('timestampToDate', function() {
	return function(timestamp) {
		var date = new Date(timestamp * 1000);
		var dateObject = date.getFullYear() + '/'
				+ ('0' + (date.getMonth() + 1)).slice(-2) + '/'
				+ ('0' + date.getDate()).slice(-2);
		return dateObject;
	};
});
// test data

