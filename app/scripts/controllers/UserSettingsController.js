'use strict';

angular.module('mobbr.controllers').controller('UserSettingsController', function ($http, $scope, $rootScope, userSession, $upload, apiUrl, MobbrUser, Msg) {

    $scope.user = userSession.user;
    $scope.formData = {};

    $scope.new_email = $scope.user.email;

    $scope.waitingsettings = false;
    $scope.waitingemail = false;
    $scope.waitingpassword = false;

    $scope.uploadIdentityProof = function (files) {
      angular.forEach(files, function (file) {
        $upload.upload({
          url: apiUrl + '/api/user/upload_identity_proof',
          file: file,
          method: 'POST'
        }).success(function (data) {
          });
      });
    };

    $scope.submitSettings = function () {
      $scope.waitingsettings = true;
      MobbrUser.updateUser({user: $scope.user}, function (response) {
        $scope.waitingsettings = false;
        if (response.result) {
          userSession.update(response.result);
          Msg.setResponseMessage('info', 'Settings saved', response);
        } else {
          Msg.setResponseMessage('error', 'Could not save settings', response);
        }
      }, function (response) {
        $scope.waitingsettings = false;
        Msg.setResponseMessage('error', 'Could not save settings', response);
      });
    }

    $scope.submitEmail = function (form) {
      $scope.waitingemail = true;
      MobbrUser.updateEmail({ new_email: form.email.$modelValue }, function (response) {
        $scope.waitingemail = false;
        Msg.setResponseMessage('info', 'New email address set', response);
      }, function (response) {
        $scope.waitingemail = false;
        Msg.setResponseMessage('error', 'Could not change email address', response);
      });
    }

    $scope.submitPassword = function (form) {
      $scope.waitingpassword = true;
      MobbrUser.updatePassword({ new_password: form.new_password.$modelValue }, function (response) {
        $scope.waitingpassword = false;
        Msg.setResponseMessage('info', 'New password saved', response);
      }, function (response) {
        $scope.waitingpassword = false;
        Msg.setResponseMessage('error', 'Could not change password', response);
      });
    }


    $scope.settingsLabels = {
      'hide_my_incoming_payments': 'Hide my incoming payments',
      'hide_my_items': 'Hide my items',
      'hide_my_outgoing_payments': 'Hide my outgoing payments',
      'send_json_mention_notification': 'Send JSON mention notification',
      'send_monthly_reports': 'Send monthly reports',
      'send_newsletter': 'Send me newsletters to keep me informed',
      'send_payment_expired_notification': 'Send payment expire notifications',
      'send_payment_received_notification': 'Send payment recieved notifications'
    };

   /* $scope.getLabelFor = function (key) {
      var value = settingsLabels[key];
      if (value === undefined) {
        return key;
      } else {
        return value;
      }

    }*/

    var convertValueToBool = function (value) {
      if (value != undefined && value.toString() === '1') {
        return true;
      }
      return false;
    }

    $scope.settingsArray = [];
    angular.forEach($scope.user.setting, function (value, key) {
      var value = convertValueToBool(value);
      $scope.settingsArray.push({
        'key': key,
        'value': value
      });
    });


    $scope.updateSetting = function (model) {
      var value = 0;
      if (model.value === true) {
        value = 1;
      }
      $scope.user.setting[model.key] = value;
    }

    // workaround for select firefox problems
    function initLanguage() {
      for (var i = 0; i < $rootScope.languageArray.length; i++) {
        var language = $rootScope.languageArray[i];
        if (language !== undefined && language.code === $scope.user.language_iso) {
          $scope.formData.languageIndex = language;
        }
      }
    }

    $rootScope.$on('language-array-ready', function () {
      initLanguage();
    });

    if ($rootScope.languageArray !== undefined) {
      initLanguage();
    }

    $scope.$watch('formData.languageIndex', function (newValue) {
      if (newValue !== undefined) {
        $scope.user.language_iso = newValue.code;
      }
    });

    function initCurrency() {
      for (var i = 0; i < $rootScope.currencyArray.length; i++) {
        var currency = $rootScope.currencyArray[i];
        if (currency !== undefined && currency.code === $scope.user.currency_iso) {
          $scope.formData.currencyIndex = currency;
        }
      }
    }


    if ($rootScope.currencyArray !== undefined) {
      initCurrency();
    }

    $rootScope.$on('currencie-array-ready', function () {
      initCurrency();
    });

    $scope.$watch('formData.currencyIndex', function (newValue) {
      if (newValue !== undefined) {
        $scope.user.currency_iso = newValue.code;
      }
    });


  }
)
;