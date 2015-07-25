'use strict';

angular.module('mobbr.controllers').controller('ForExController', function ($scope, MobbrApi, $state) {

	MobbrApi.currencies().$promise.then(function (response) {
		var result = response.result;
		var currencies = [];
		for(var i = 0; i < result.length; i++)
		{
			if(result[i].base_currency_iso.toUpperCase() == $state.params.base_currency_iso.toUpperCase())
			{
				currencies.push(result[i]);
			}
		}
		$scope.currencies = currencies;
		if(currencies.length <= 0)
			return;
		
		$scope.base_currency_iso = result[0].base_currency_iso;
		$scope.exchange_rate_datetime = result[0].exchange_rate_datetime;
	});
});