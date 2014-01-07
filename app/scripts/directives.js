angular.module('mobbr.directives', [

    ]).directive('payments',function factory() {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: '../directives/payments.html',
            scope: {
                searchentries:'='
            },
            controller: function ($scope, $attrs,Dashboard,$rootScope,$location,Msg,userSession) {

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

                if(!userSession.authenticated){
                    $scope.initializing = false;
                }

                $scope.currencies = [];
                if($scope.editable){
                    if(userSession.authenticated){
                        Dashboard.getCurrencies(function(response){
                            $scope.currencies = response.result;
                        });
                    }
                }

                $scope.payments = [];
                $scope.refreshPayments = function () {
                    if(userSession.authenticated){
                        $scope.working = true;
                        Dashboard.getPayments({action:$scope.paymenttype},function (response){
                            $scope.initializing = false;
                            $scope.working = false;
                               if(response.result != null && response.result != undefined){
                                   $scope.payments = response.result;
                               }else{
                                   $scope.payments = [];

                                   Msg.setResponseMessage( 'info','Could not load payments',response);

                               }
                        },function(response){
                            $scope.initializing = false;
                            $scope.working = false;
                        });
                    } else{
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

                $scope.paymentChanged = function (payment){
                    if(payment.amount != '' || payment.currency_iso){
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
                        Dashboard.savePayment({payments:finalizePaymentsArray},function(response){
                            $scope.working = false;
                            if(response.result === true){
                                $rootScope.reloadPayments = 'reloadpayments' +Math.random();
                                Msg.setResponseMessage( 'info','Finalized payments',response);
                            } else{
                                Msg.setResponseMessage( 'info','could not finalize payments',response);
                            }
                        },function(response){
                            $scope.working = false;
                            Msg.setResponseMessage( 'error', 'Could not finalize payments',response);
                        });

                    } else {
                        alert('no payments to finalize');
                    }
                }

                $rootScope.$watch('reloadPayments', function(newValue, oldValue) {
                    if(newValue != undefined){
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
                            if(response.result === true){
                                Msg.setResponseMessage( 'info','Deleted payments',response);
                                $rootScope.reloadPayments = 'reloadpayments' +Math.random();
                            }   else{
                                Msg.setResponseMessage( 'info','Could not delete payments: ', response);
                            }

                        },function(response){
                            $scope.working = false;
                            Msg.setResponseMessage( 'error', 'Could not delete payments',response);
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

                $scope.openPayment = function(id){
                    $location.path('/payment/' + id);
                }


                $scope.dateHeader = function(){
                    if($scope.showExpiresDate){
                       return 'Expire date';
                    }
                    return 'date/time';
                }

            }
       //
        }
    }).directive('paymentsprovided',function factory() {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: '../directives/payments.html',
            scope: {
                payments:'='
            },
            controller: function ($scope, $attrs,$rootScope,$location,Msg,userSession) {

                $scope.showentries = 10;             // filter the number of entries

                $scope.sortEntries;                  // sort on column
                $scope.sortOrder = 'false';            // sort order

                $scope.working = false;
                $scope.initializing = true;

                // Waarden overnemen uit attribuut
                $scope.title = $attrs.title;
                $scope.nodatatitle = $attrs.nodatatitle;
                $scope.editable = false;
                $scope.showExpiresDate = $attrs.showexpiresdate == 'true';

                $scope.showSearchEntriesDirective = true;


                $scope.canFinalize = function () {
                     return false;
                };


                $scope.sortPayments = function (column) {
                    if (column == $scope.sortEntries) {
                        $scope.sortOrder = $scope.sortOrder == 'true' ? 'false' : 'true';
                    } else {
                        $scope.sortEntries = column;
                        $scope.sortOrder = 'false';
                    }
                }

                $scope.openPayment = function(id){
                    $location.path('/payment/' + id);
                }


                $scope.dateHeader = function(){
                    if($scope.showExpiresDate){
                        return 'Expire date';
                    }
                    return 'date/time';
                }

            }
            //
        }
    }).directive('people',function factory() {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: '../directives/people.html',
            scope: {
                people:'=',
                title:'@',
                nodatatitle:'@',
                persontitle:'@',
                showamount:'@',
                ownsearch:'@'


            },
            controller: function ($scope, $attrs) {

                $scope.sortEntries;                  // sort on column
                $scope.sortOrder = 'false';            // sort order
                $scope.showentries = 10;




                $scope.sortPeople = function (column) {
                    if (column == $scope.sortEntries) {
                        $scope.sortOrder = $scope.sortOrder == 'true' ? 'false' : 'true';
                    } else {
                        $scope.sortEntries = column;
                        $scope.sortOrder = 'false';
                    }
                }

            }
            //
        }
    }).directive('peoplepagesearch',function factory() {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: '../directives/people.html',
            scope: {
                people:'=',
                searchentries:'=',
                title:'@',
                nodatatitle:'@',
                persontitle:'@',
                showamount:'@',
                ownsearch:'@'


            },
            controller: function ($scope, $attrs) {

                $scope.sortEntries;                  // sort on column
                $scope.sortOrder = 'false';            // sort order
                $scope.showentries = 100000;


                $scope.sortPeople = function (column) {
                    if (column == $scope.sortEntries) {
                        $scope.sortOrder = $scope.sortOrder == 'true' ? 'false' : 'true';
                    } else {
                        $scope.sortEntries = column;
                        $scope.sortOrder = 'false';
                    }
                }

            }
            //
        }
    }).directive('mobbrbutton',function factory() {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: '../directives/mobbrbutton.html',
            scope: {
                size:'@',
                url:'@'
            },
            controller: function ($scope, $rootScope) {


                $scope.createButtonUrl = function(size,url){
                    // temporary undefined urls fix, make sure the size is known here at all times
                    size = size || 'large';
                    return api_url + '/button/' + md5(url) + '/' + size + '#' + $rootScope.uniqueButton;
                }
                $scope.submit = function ($event) {
                    mobbr.makePayment($scope.url, $event.target);
                }
            }

        }
    }).directive('decorateAmount',function factory(userSession) {
        return {
            restrict: 'C',
            scope: true,
            link: function (scope, element, attrs) {
                setTimeout(function () {
                    var settings = userSession.user;

                    var value = parseFloat(element.text());

                    if (value < 0) {
                        element.addClass('text-error');
                    }
                    if (value.toLocaleString !== undefined) {
                        value = value.toLocaleString(settings.language_iso, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4
                        });
                        element.text(value);
                    }
                });
            }
        }
    }).directive('placeholder', function($timeout){
        var i = document.createElement('input');
        if ('placeholder' in i) {
            return {}
        }
        return {
            link: function(scope, elm, attrs){
                if (attrs.type === 'password') {
                    return;
                }
                $timeout(function(){
                    elm.val(attrs.placeholder);
                    elm.bind('focus', function(){
                        if (elm.val() == attrs.placeholder) {
                            elm.val('');
                        }
                    }).bind('blur', function(){
                            if (elm.val() == '') {
                                elm.val(attrs.placeholder);
                            }
                        });
                });
            }
        }
    }).directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val()===$(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }
    ]).directive('autoFillSync', function($timeout) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs) {
                var origVal = elem.val();
                $timeout(function () {
                    var newVal = elem.val();
                    if(ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                    }
                }, 500);
            }
        }
    });
