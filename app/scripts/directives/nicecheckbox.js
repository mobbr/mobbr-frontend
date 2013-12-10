'use strict';

angular.module('mobbr.directives').directive('nicecheckbox', function factory() {
    return {
        restrict: 'E',
        replace: false,
        transclude:true,
        templateUrl: '../../views/directives/nicecheckbox.html',
        scope:{
            value : '=',
            key : '=',
            user : '='

        },
        link: function (scope, element, attrs) {
            if(scope.value === '1'){
                scope.boolValue = true
            }else{
                scope.boolValue = false;
            }

            scope.$watch('boolValue',function(newValue){
               if(newValue === true){
                   console.log('setting ' + scope.key + ' to 1' );
                   scope.value = '1';
               }else{
                   console.log('setting ' + scope.key + ' to 0' );
                   scope.value = '0'

               }
            });

            scope.toggleCheck = function(){
                scope.boolValue = !scope.boolValue;
            }


            var settingsLabels = {
                'hide_my_incoming_payments':'Hide my incoming payments',
                'hide_my_items' : 'Hide my items',
                'hide_my_outgoing_payments' : 'Hide my outgoing payments',
                'send_json_mention_notification' : 'Send JSON mention notification',
                'send_monthly_reports' : 'Send monthly reports' ,
                'send_newsletter' : 'Send me newsletters to keep me informed' ,
                'send_payment_expired_notification' : 'Send payment expire notifications',
                'send_payment_received_notification' : 'Send payment recieved notifications'



            };

            scope.getLabelFor = function(key){
                var value = settingsLabels[key];
                if(value === undefined){
                    return key;
                } else{
                    return value;
                }

            }
        },




    }
})