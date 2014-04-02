'use strict';

angular.module('mobbr.controllers').controller('WalletController', function ($scope, $rootScope, $timeout, $dialog, MobbrBalance, MobbrXPayment, userSession, MobbrPayment, Msg, $window, $routeParams, $location) {

  $scope.searchentries;                // filter on search criteria
  //$scope.searchentriesAllPayments;                // filter on search criteria
  $scope.currencyDescription = function(iso){
    return $rootScope.currencyDescription(iso);
  }
  $scope.balances = [];
  $scope.reloadBalances = function () {
    if(userSession.authenticated){
      MobbrBalance.user(function(response){
        $scope.balances = response.result;
      });
    }
  } ;
  $scope.reloadBalances();


  $scope.sortOrderBalance;
  $scope.sortBalance = function (column) {
    $scope.sortOrderBalance = column;
  }
  $scope.mutations = [];
  $scope.reloadMutation =  function ( ) {
    if(userSession.authenticated){
      MobbrXPayment.get(function(response){
        $scope.mutations = response.result;
      });
    }
  };
  $scope.reloadMutation();

  $rootScope.$watch('reloadPayments', function(newValue, oldValue) {
    if(newValue != undefined){
      $scope.reloadMutation();
      $scope.reloadBalances();
    }
  });


  $scope.sortOrderPayments;
  $scope.sortPayments = function (column) {
    $scope.sortOrderPayments = column;
  }


  $scope.$rootScope = $rootScope;

  function resetLocation() {
    $timeout(function () {
      $window.location.href = $window.location.origin + '/' + $window.location.hash;
    }, 3000);
  }

  if ($window.location.search.indexOf('?transactionId=') !== -1) {
    MobbrXPayment.confirmDeposit({
        trx_id: $window.location.search.replace('?transactionId=', '')
      }, function (response) {
        Msg.setResponseMessage('info', response.message.text, response);
        resetLocation();
      }, function (response) {
        Msg.setResponseMessage('error', response.data.message.text, response);
        resetLocation();
      }
    );
  }

  var getsupportedCurrencies = function(){
    MobbrXPayment.supportedCurrencies(function (response){
      $scope.supportedCurrencies = response.result;
    }, function (response){
      Msg.setResponseMessage('error', response.data.message.text, response);
    });
  }
  getsupportedCurrencies();



  $scope.generateAddress = function(currency){
    MobbrXPayment.newAccountAddress({'currency':currency},function(response){
      getsupportedCurrencies();
      if(response.message !== undefined && response.message !== null){
        Msg.setResponseMessage('info',response.message.text,response);
      }
    }, function (response){
      Msg.setResponseMessage('error', response.data.message.text, response);
    });
  }

  $scope.openExternalPayment = function (id) {
    $location.path('/x-payment/' + id);
  }

    $scope.MobbrPayment = MobbrPayment;

    var depositDialog = $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: false,
        templateUrl: 'views/partials/deposit_popup.html',
        controller: function ($scope, dialog) {

            $scope.networks = {
                btc: {
                    name: 'Bitcoin',
                    currencies: [ 'BTC' ],
                    default_currency: 'BTC'
                },
                iban: {
                    name: 'IBAN',
                    currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                    default_currency: 'EUR'
                }
            };

            $scope.deposit_currency = $scope.networks['iban'].default_currency;

            $scope.close = function () {
                dialog.close();
            }

            $scope.confirm = function () {
                $scope.waiting = true;
                MobbrXPayment.prepareDeposit({
                    currency: $scope.deposit_currency,
                    amount: $scope.deposit_amount,
                    note: $scope.deposit_note,
                    return_url: $window.location.href
                }, function (data) {
                    $scope.waiting = false;
                    dialog.close();
                    $window.location.href = data.result;
                }, function(response){
                    $scope.waiting = false;
                    Msg.setResponseMessage('error', response.data.message.text, response);
                });
            }
        }
    });

    var withdrawDialog = $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: false,
        templateUrl: 'views/partials/withdraw_popup.html',
        controller: function ($scope, dialog) {

            $scope.networks = {
                btc: {
                    type: 'OTHER',
                    name: 'Bitcoin',
                    currencies: [ 'BTC' ],
                    default_currency: 'BTC'
                },
                iban: {
                    type: 'IBAN',
                    name: 'IBAN/BIC',
                    currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                    default_currency: 'EUR'
                },
                uk: {
                    type: 'GB',
                    name: 'GB',
                    currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                    default_currency: 'GBP'
                },
                us: {
                    type: 'US',
                    name: 'US',
                    currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                    default_currency: 'USD'
                },
                ca: {
                    type: 'CA',
                    name: 'Canada',
                    currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                    default_currency: 'USD'
                },
                other: {
                    type: 'OTHER',
                    name: 'Other',
                    currencies: [ 'USD', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'EUR', 'PLN' ],
                    default_currency: 'EUR'
                }
            };

            $scope.deposit_currency = $scope.networks['iban'].default_currency;
            $scope.network_method = $scope.networks['iban'];

            $scope.$watch('network_method.name', function (oldval, newval) {
                $scope.network_method.send = {
                    currency: $scope.network_method.default_currency,
                    address: {
                        type: $scope.network_method.type
                    }
                };
            }, false);

            $scope.close = function () {
                dialog.close();
            }

            $scope.confirm = function () {
                $scope.waiting = true;
                MobbrXPayment.withdraw($scope.network_method.send, function (response) {
                    $scope.waiting = false;
                    $scope.network_method.send = {};
                    dialog.close();
                    Msg.setResponseMessage('info', response.message.text, response);
                }, function (response) {
                    $scope.waiting = false;
                    Msg.setResponseMessage('error', response.data.message.text, response);
                });
            }
        }
    });

    $scope.openPayment = function (item) {
        console.log(item);
        $location.path('/payment/' + item.id);
    }

    $scope.depositDialog = depositDialog;
    $scope.withdrawDialog = withdrawDialog;
});