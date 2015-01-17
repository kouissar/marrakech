// app.js

// create the module and name it finderApp
var finderApp = angular.module('finderApp', ['ngRoute','google-maps', 'ngSanitize']);



// services
finderApp.service('db', function() {
    var places = [{
    	'id' : 'isg',
    	'name' : 'Islamic Society Of Germantown',
    	'address' : '19825 Blunt Rd, Germantown, MD. 20874',
    	'phone' : '301-540-4748',
    	'website' : 'http://isgtown.org',
    	'email' : 'webmaster@isgtown.org',
    	'zipcode' : '20874'
    }, {
    	'id' : 'icw',
    	'name' : 'Islamic Center of Washington DC',
    	'address' : '82551 Massachusetts Avenue N.W, Washington DC 20008, USA',
    	'phone' : '(202) 332-8343',
    	'website' : 'http://theislamiccenter.com/',
    	'email' : 'webmaster@isgtown.org',
    	'zipcode' : '20008'
    }, {
    	'id' : 'ICM',
    	'name' : 'Islamic Center Of Maryland',
    	'address' : '19411 Woodfield Road, Gaithersburg, MD 20879, USA',
    	'phone' : '(301) 840-9440',
    	'website' : 'http://icomd.org',
    	'email' : 'icmadmin@icomd.org',
    	'zipcode' : '20879'
    }, {
    	'id' : 'adams',
    	'name' : 'ADAMS Center',
    	'address' : '46903 Sugarland Road, Sterling, VA 20164, USA',
    	'phone' : '703.433.1325',
    	'website' : 'www.adamscenter.org',
    	'email' : 'deputydirector@adamscenter.us',
    	'zipcode' : '20164'
    }];

    return {
      getPlaces: function(placeid) {
        if (placeid === 0) {
          return places;
        } else {
          return places[placeid - 1];
        }
      }
    };
  });



function eventController($scope, $http) {

    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};

}

// Define Routing for the app
finderApp.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
	}).when('/places', {
		templateUrl : 'app/components/results/main.html',
		controller : 'homeController'
	}).when('/detail/:id', {
		templateUrl : 'app/components/results/details.html',
		controller : 'detailController'
	}).when('/events', {
		templateUrl : 'app/components/events/events.html',
		controller : 'eventController'
	}).when('/salat', {
		templateUrl : 'app/components/salat/salat.html',
		controller : 'salatController'
	}).when('/result', {
		templateUrl : 'app/components/results/resultsTable.html',
		controller : 'homeController'
	}).otherwise({
		redirectTo : '/'
	});
	//$locationProvider.html5Mode(true);
} ]);






finderApp.filter('timestampToDate', function() {
	return function(timestamp) {
		var date = new Date(timestamp * 1000);
		var dateObject = date.getFullYear() + '-'
				+ ('0' + (date.getMonth() + 1)).slice(-2) + '-'
				+ ('0' + date.getDate()).slice(-2);
		return dateObject;
	};
});

//masjid data
var masjids = [ {
	'id' : 'isg',
	'name' : 'Islamic Society Of Germantown',
	'address' : '19825 Blunt Rd, Germantown, MD. 20874',
	'phone' : '301-540-4748',
	'website' : 'http://isgtown.org',
	'email' : 'webmaster@isgtown.org',
	'zipcode' : '20874'
}, {
	'id' : 'icw',
	'name' : 'Islamic Center of Washington DC',
	'address' : '82551 Massachusetts Avenue N.W, Washington DC 20008, USA',
	'phone' : '(202) 332-8343',
	'website' : 'http://theislamiccenter.com/',
	'email' : 'webmaster@isgtown.org',
	'zipcode' : '20008'
}, {
	'id' : 'ICM',
	'name' : 'Islamic Center Of Maryland',
	'address' : '19411 Woodfield Road, Gaithersburg, MD 20879, USA',
	'phone' : '(301) 840-9440',
	'website' : 'http://icomd.org',
	'email' : 'icmadmin@icomd.org',
	'zipcode' : '20879'
}, {
	'id' : 'adams',
	'name' : 'ADAMS Center',
	'address' : '46903 Sugarland Road, Sterling, VA 20164, USA',
	'phone' : '703.433.1325',
	'website' : 'www.adamscenter.org',
	'email' : 'deputydirector@adamscenter.us',
	'zipcode' : '20164'
} ];



finderApp.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 1,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Unknown address: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('Unable to locate current position');
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});



///////////////////

finderApp.factory('dcFactory', function() {
	var places = [ {
	'id' : 'isg',
	'name' : 'Islamic Society Of Germantown',
	'address' : '19825 Blunt Rd, Germantown, MD. 20874',
	'phone' : '301-540-4748',
	'website' : 'http://isgtown.org',
	'email' : 'webmaster@isgtown.org',
	'zipcode' : '20874'
}, {
	'id' : 'icw',
	'name' : 'Islamic Center of Washington DC',
	'address' : '82551 Massachusetts Avenue N.W, Washington DC 20008, USA',
	'phone' : '(202) 332-8343',
	'website' : 'http://theislamiccenter.com/',
	'email' : 'webmaster@isgtown.org',
	'zipcode' : '20008'
}, {
	'id' : 'ICM',
	'name' : 'Islamic Center Of Maryland',
	'address' : '19411 Woodfield Road, Gaithersburg, MD 20879, USA',
	'phone' : '(301) 840-9440',
	'website' : 'http://icomd.org',
	'email' : 'icmadmin@icomd.org',
	'zipcode' : '20879'
}, {
	'id' : 'adams',
	'name' : 'ADAMS Center',
	'address' : '46903 Sugarland Road, Sterling, VA 20164, USA',
	'phone' : '703.433.1325',
	'website' : 'www.adamscenter.org',
	'email' : 'deputydirector@adamscenter.us',
	'zipcode' : '20164'
} ];

	var factory = {};
	factory.getplaces = function() {
		return places;
	};
	factory.postPlaces = function(places){
		
	};
	return factory;
});
