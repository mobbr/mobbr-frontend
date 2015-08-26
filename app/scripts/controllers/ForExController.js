'use strict';

angular.module('mobbr.controllers').controller('ForExController', function ($scope, MobbrApi, $state) {

	var base_currency_iso = $state.params.base_currency_iso.toUpperCase();
	$scope.base_currency_iso = base_currency_iso;

	MobbrApi.currencies( {base_currency: base_currency_iso} ).$promise.then(function (response) {
		var result = response.result;
		$scope.currencies = result;
		if(result.length > 0) {
			$scope.exchange_rate_datetime = result[0].exchange_rate_datetime;
		}
	});
});