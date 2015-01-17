finderApp.filter('timestampToDate', function() {
	return function(timestamp) {
		var date = new Date(timestamp * 1000);
		var dateObject = date.getFullYear() + '-'
				+ ('0' + (date.getMonth() + 1)).slice(-2) + '-'
				+ ('0' + date.getDate()).slice(-2);
		return dateObject;
	};
});