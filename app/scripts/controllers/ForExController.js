'use strict';

angular.module('mobbr.controllers').controller('ForExController', function ($scope, MobbrApi, $state) {

	var base_currency_iso = $state.params.base_currency_iso.toUpperCase();
	$scope.base_currency_iso = base_currency_iso;

	MobbrApi.currencies( {base_currency: base_currency_iso} ).$promise.then(function (response) {
		var result = response.result;
		var currencies = [];
		for(var i = 0; i < result.length; i++)
		{
			if(result[i].base_currency_iso.toUpperCase() == base_currency_iso)
			{
				currencies.push(result[i]);
			}
		}
		$scope.currencies = currencies;
		if(currencies.length == 0)
			return;
		
		$scope.exchange_rate_datetime = result[0].exchange_rate_datetime;
	});
});