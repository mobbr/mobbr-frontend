angular.module('mobbr.services.msg', [

    ]).factory('Msg', function () {

        var Msg = {
            addWarning: function (msg) {
                this.message(arguments, 'warning');
            },
            addError: function () {
                this.message(arguments, 'error');
            },
            addNotification: function () {
                this.message(arguments, 'info');
            },
            setResponseMessage: function (level, title, response) {
                var messageText = null;
                if (response != null) {
                    if (response.message != undefined && response.message != null) {
                        if (response.message.text != null && response.message.text != undefined && response.message.text != '') {
                            messageText = response.message.text;
                        }
                        if (response.message.type != null && response.message.type != undefined && response.message.type != '') {
                            level = response.message.type;
                        }
                    } else if (response.data != undefined && response.data != null && response.data.message != null) {
                        if (response.data.message.text != null && response.data.message.text != undefined && response.data.message.text != '') {
                            messageText = response.data.message.text;
                        }
                        if (response.data.message.type != undefined && response.data.message.type != null && response.data.message.type != '') {
                            level = response.data.message.type;
                        }
                    }
                }

                this.message([title, messageText], level);
            },
            message: function (args, level) {
                // internal, use add methods
                var title, message;
                if (args.length == 2 && args[1] != null && args[1] != undefined) {
                    title = args[0];
                    message = args[1];
                } else {
                    title = level;
                    message = args[0];
                }
                $.pnotify({
                    title: title,
                    text: message,
                    type: level
                });
            }

        }

        return Msg;
    }
)