//controllers.js

//weather
function weatherController($scope, $http) {
	$scope.iconBaseUrl = 'http://openweathermap.org/img/w/';
	
	var zip = "20004";
	var base = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
	var unit = "imperial";
	// var zip = firstName;
	var days = "7";
	var url = base + zip + ",USA&mode=json&units=" + unit + "&cnt=" + days;
	// example URL "http://api.openweathermap.org/data/2.5/forecast/daily?q=20876,USA&mode=json&units=imperial&cnt=7"
	$http.get(url).success(function(response) {
		$scope.names = response;
	});
	// Get icon image url
	$scope.getIconImageUrl = function(iconName) {
		return (iconName ? $scope.iconBaseUrl + iconName
				+ '.png' : '');
	};
}

finderApp.controller('mainController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Welcome!';
	$scope.hideBanner = false;
    $scope.toggle = function() {
        $scope.hideBanner = !$scope.hideBanner;
    };
});

finderApp.controller('loginController', function($scope) {
	// create a message to display in our view
	$scope.message = 'Welcome!';

});

finderApp.controller(
				'aboutController',
				function($scope) {
					$scope.message = 'Trying to make this work, if it does, it will be awesome!';
					$scope.hideBanner = false;
				    $scope.toggle = function() {
				        $scope.hideBanner = !$scope.hideBanner;
				    };
});

finderApp.controller(
				'salatController',
				function($scope) {
					$scope.message = 'Trying to make this work, if it does, it will be awesome!';
					var date = new Date(); // today
					var times = prayTimes.getTimes(date, [ 39, -77 ], -5);
					var list = [ 'Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib',
							'Isha', 'Midnight' ];

					var html = '<table id="timetable">';
					html += '<tr><th colspan="2">' + date.toLocaleDateString()
							+ '</th></tr>';
					for ( var i in list) {
						html += '<tr><td>' + list[i] + '</td>';
						html += '<td>' + times[list[i].toLowerCase()]
								+ '</td></tr>';
					}
					html += '</table>';
					document.getElementById('table').innerHTML = html;
});

finderApp.controller('homeController', function($scope, db, $route, $location) {
	$scope.places = db.list();

	$scope.currentPlace;
    $scope.setCurrentPlace = function(place) {
        $scope.currentPlace = place;
    };
    $scope.createPlace = function() {
        $scope.places.push({
        	'id' : 'new id',
        	'name' : 'new masjid',
        	'address' : '82551 Massachusetts Avenue N.W, Washington DC 20008, USA',
        	'phone' : '(202) 332-8343',
        	'website' : 'http://theislamiccenter.com/',
        	'email' : 'webmaster@isgtown.org',
        	'zipcode' : '20009'
        });
    };

});

function detailController($scope, db, $route) {
	$scope.message = "Detail View";
	var param = $route.current.params.id;
	$scope.pt = db.get(param);	  
}


finderApp.controller('tabController', function() {
	this.tab = 1;

	this.setTab = function(newValue) {
		this.tab = newValue;
	};

	this.isSet = function(tabName) {
		return this.tab === tabName;
	};
});


//google map
finderApp.controller('MapCtrl', ['MarkerCreatorService', '$scope', function (MarkerCreatorService, $scope) {
	
//	$scope.places = masjids;
//	$scope.myForm = {};
//    $scope.myForm.zipcode = "20008";

        MarkerCreatorService.createByCoords(39, -77, function (marker) {
            marker.options.labelContent = 'Washington DC';
            $scope.autentiaMarker = marker;
        });
        
        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.autentiaMarker.latitude,
                longitude: $scope.autentiaMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.autentiaMarker);

        $scope.addCurrentLocation = function () {
            MarkerCreatorService.createByCurrentLocation(function (marker) {
                marker.options.labelContent = 'You´re here';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
        
        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }

    }]);

//events
function eventController($scope, $http) {

    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};

}