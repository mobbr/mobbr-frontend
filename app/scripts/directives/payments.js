'use strict';

angular.module('mobbr.directives').directive('payments', function factory() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: '../../views/directives/payments.html',
    scope: {
      searchentries: '='
    },
    controller: function ($scope, $attrs, Dashboard, $rootScope, $location, Msg, userSession) {

      $scope.showentries = 10;             // filter the number of entries
      $scope.sortEntries;                  // sort on column
      $scope.sortOrder = 'false';            // sort order
      $scope.working = false;
      $scope.initializing = true;

      // Waarden overnemen uit attribuut
      $scope.title = $attrs.title;
      $scope.nodatatitle = $attrs.nodatatitle;
      $scope.paymenttype = $attrs.paymenttype;
      $scope.editable = $attrs.editable == 'true';
      $scope.showExpiresDate = $attrs.showexpiresdate == 'true';
      $scope.showSearchEntriesDirective = false;

      // payments initialiseren
      if (!userSession.authenticated) {
        $scope.initializing = false;
      }

      $scope.currencies = [];
      if ($scope.editable) {
        if (userSession.authenticated) {
          Dashboard.getCurrencies(function (response) {
            $scope.currencies = response.result;
          });
        }
      }

      $scope.payments = [];
      $scope.refreshPayments = function () {
        if (userSession.authenticated) {
          $scope.working = true;
          Dashboard.getPayments({action: $scope.paymenttype}, function (response) {
            $scope.initializing = false;
            $scope.working = false;
            if (response.result != null && response.result != undefined) {
              $scope.payments = response.result;
            } else {
              $scope.payments = [];

              Msg.setResponseMessage('info', 'Could not load payments', response);

            }
          }, function (response) {
            $scope.initializing = false;
            $scope.working = false;
          });
        } else {
          $scope.payments = [];
        }
      }

      $scope.refreshPayments();


      $scope.canFinalize = function () {

        for (var i = 0; i < $scope.payments.length; i++) {
          var payment = $scope.payments[i];
          if (isPaymentChecked(payment)) {
            return true;
          }
        }
        return false;
      };

      $scope.paymentChanged = function (payment) {
        if (payment.amount != '' || payment.currency_iso) {
          payment.checked = true;
        }
      }

      $scope.finalizePayments = function () {
        var finalizePaymentsArray = [];
        for (var i = 0; i < $scope.payments.length; i++) {
          var payment = $scope.payments[i];
          if (isPaymentChecked(payment)) {
            finalizePaymentsArray.push({"id": payment.id, "amount": payment.amount, "currency_iso": payment.currency_iso});
          }
        }
        if (finalizePaymentsArray.length > 0) {
          $scope.working = true;
          Dashboard.savePayment({payments: finalizePaymentsArray}, function (response) {
            $scope.working = false;
            if (response.result === true) {
              $rootScope.reloadPayments = 'reloadpayments' + Math.random();
              Msg.setResponseMessage('info', 'Finalized payments', response);
            } else {
              Msg.setResponseMessage('info', 'could not finalize payments', response);
            }
          }, function (response) {
            $scope.working = false;
            Msg.setResponseMessage('error', 'Could not finalize payments', response);
          });

        } else {
          alert('no payments to finalize');
        }
      }

      $rootScope.$watch('reloadPayments', function (newValue, oldValue) {
        if (newValue != undefined) {
          $scope.refreshPayments();
        }
      });

      $scope.deletePayments = function () {
        var deletePaymentsArray = [];
        for (var i = 0; i < $scope.payments.length; i++) {
          var payment = $scope.payments[i];
          if (payment.checked) {
            deletePaymentsArray.push(payment.id);
          }
        }

        if (deletePaymentsArray.length > 0) {
          $scope.working = true;
          Dashboard.deletePayment({"ids": deletePaymentsArray}, function (response) {
            $scope.working = false;
            if (response.result === true) {
              Msg.setResponseMessage('info', 'Deleted payments', response);
              $rootScope.reloadPayments = 'reloadpayments' + Math.random();
            } else {
              Msg.setResponseMessage('info', 'Could not delete payments: ', response);
            }

          }, function (response) {
            $scope.working = false;
            Msg.setResponseMessage('error', 'Could not delete payments', response);
          });
        }
      }

      $scope.revokePledges = function () {
        var deletePaymentsArray = [];
        for (var i = 0; i < $scope.payments.length; i++) {
          var payment = $scope.payments[i];
          if (payment.checked) {
            deletePaymentsArray.push(payment.id);
          }
        }

        if (deletePaymentsArray.length > 0) {
          $scope.working = true;
          Dashboard.revokePledge({"ids": deletePaymentsArray}, function (response) {
            $scope.working = false;
            if (response.result === true) {
              Msg.setResponseMessage('info', 'Deleted payments', response);
              $rootScope.reloadPayments = 'reloadpayments' + Math.random();
            } else {
              Msg.setResponseMessage('info', 'Could not delete payments: ', response);
            }

          }, function (response) {
            $scope.working = false;
            Msg.setResponseMessage('error', 'Could not delete payments', response);
          });
        }
      }

      $scope.anyChecked = function () {
        for (var i = 0; i < $scope.payments.length; i++) {
          var payment = $scope.payments[i];
          if (payment.checked) {
            return true;
          }
        }
      }

      function isPaymentChecked(payment) {
        return payment.checked && payment.currency_iso != null && payment.amount != null
      }

      $scope.sortPayments = function (column) {
        if (column == $scope.sortEntries) {
          $scope.sortOrder = $scope.sortOrder == 'true' ? 'false' : 'true';
        } else {
          $scope.sortEntries = column;
          $scope.sortOrder = 'false';
        }
      }

      $scope.openPayment = function (id) {
        $location.path('/payment/' + id);
      }


      $scope.dateHeader = function () {
        if ($scope.showExpiresDate) {
          return 'Expire date';
        }
        return 'date/time';
      }
    }
  }
});