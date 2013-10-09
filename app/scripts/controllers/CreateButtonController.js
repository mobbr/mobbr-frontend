'use strict';

angular.module('mobbr.controllers').controller('CreateButtonController', function ($scope, $rootScope, CreateButton,Msg) {

    $scope.detectTitle = true;
    $scope.detectDescription = true;
    $scope.mobbrConfiguration = '';
    $scope.form ;
    $scope.newForm = function(){
        $scope.form = {
            "url": '',
            "title": '',
            "description": '',
            "copyright": '',
            "language": '',
            "image": '',
            "showScriptWhileEditing": false,
            "idBase": '',
            "contributors": [],
            "button": ''
        };
    }
    $scope.newForm();

    $scope.nobutton = function(){
        return  "[NO_BUTTON]";
    }

    $scope.buttons = [
        {"id": "normal_button", "name": "Normal button", "function": "button", "url": "/img/buttons/mobbr_button50x60.png"},
        {"id": "big_button", "name": "Big button", "function": "buttonLarge", "url": "/img/buttons/mobbr64.png"},
        {"id": "slim_button", "name": "Slim button", "function": "buttonSlim", "url": "/img/buttons/mobbr_button110x20.png"},
        {"id": "small_button", "name": "Small button", "function": "buttonSmall", "url": "/img/buttons/mobbr32.png"},
        {"id": "flat_button", "name": "Flat button", "function": "buttonFlat", "url": "/img/buttons/mobbrrecht120x21.png"},
        {"id": "NO_BUTTON", name: 'No button, only metadata','function':$scope.nobutton(),url:""}
    ];

    $scope.step = function (){
        if($scope.form.button === ''){
            return 1;
        }else  if($scope.form.title === '' ){
            return 2;
        }else if($scope.mobbrConfiguration != ''){
            return 6;
        }else if($scope.filterParticipants($scope.form.contributors).length > 0 ){
            return 5;
        }else{
            return 3;
        }

    }

    $scope.workingRetrieveUrl = false;
    $scope.retrieveUrl = function () {
        if ($scope.form.url && $scope.form.url != '') {

            // input is url so retrieve json
            $scope.workingRetrieveUrl = true;
            CreateButton.checkUrl({'url':$scope.form.url},function(response){
                $scope.workingRetrieveUrl = false;
                if(response.result != null){
                    $scope.processJson(response.result);

                    Msg.setResponseMessage( 'info','Checked URL for payment script',response);
                }else{
                    Msg.setResponseMessage( 'error', 'Error checking URL for payment script',response);
                }
            },function(response){
                $scope.workingRetrieveUrl = false;
                Msg.setResponseMessage( 'error', 'Error checking url for payment script',response);
            });

        }


    }

    $scope.resultaat = {data:undefined};

    $scope.processJson = function(parsedJson){

        $scope.form.idBase = parsedJson['id-base'];
        if(parsedJson['url'] != undefined){
            $scope.form.url = parsedJson['url'];
        }
        $scope.form.title = parsedJson['title'];
        $scope.form.description = parsedJson['description'];
        $scope.form.contributors =parsedJson['participants'];
        if($scope.form.contributors == undefined || $scope.form.contributors.length == 0){
            $scope.add_new_contributor();
        }
        $scope.form.copyright = parsedJson['copyright'];
        $scope.form.language = parsedJson['language'];

        $scope.form.image = parsedJson['image'];

        $scope.resultaat.data = parsedJson;
    }

    $scope.detectTitleChanged = function(){
        if($scope.detectTitle && $scope.resultaat.data != undefined){
            $scope.form.title = JSON.parse($scope.resultaat.data)['title'];
        }
    }

    $scope.detectDescriptionChanged = function(){
        if($scope.detectDescription && $scope.resultaat.data != undefined){
            $scope.form.description = JSON.parse($scope.resultaat.data)['description'];
        }
    }

    $scope.add_new_contributor = function () {
        if($scope.form.contributors == undefined){
            $scope.form.contributors = [];
        }
        $scope.form.contributors.push({"id": "", "role": "", "share": ""})
    }

    $scope.remove_contributeur = function (index) {
        $scope.form.contributors.splice(index,1);
    }

    $scope.generateContributeurJsonFormatted = function () {
        var participantFields = ['id', 'role', 'share'];


        var jsonObject = {json:""};
        if ($scope.form.idBase != '') {
            wrap(jsonObject,'id-base', $scope.form.idBase);
        }


        if ($scope.form.title != '' && !$scope.detectTitle) {
            wrap(jsonObject,'title', $scope.form.title);
        }
        if ($scope.form.description != '' && !$scope.detectDescription) {
            wrap(jsonObject,'description', $scope.form.description);
        }
        if ($scope.form.language && $scope.form.language != '' && $scope.form.language != 'no_language') {
            wrap(jsonObject,'language', $scope.form.language);
        }
        if ($scope.form.copyright && $scope.form.copyright != '') {
            wrap(jsonObject,'copyright', $scope.form.copyright);
        }
        if ($scope.form.image && $scope.form.image != '') {
            wrap(jsonObject,'image', $scope.form.image);
        }

        var filteredParticipants = $scope.filterParticipants($scope.form.contributors);

        if (filteredParticipants.length > 0) {

            if (jsonObject.json.length > 0) {
                jsonObject.json += wrapBlackSpan(',<br />');
            }
            jsonObject.json += wrapGreenSpan('"participants"');
            jsonObject.json += wrapBlackSpan(' : ');
            jsonObject.json += wrapBlackSpan('[ <br />');


            var participantsJson = '';
            for (var i = 0; i < filteredParticipants.length; i++) {
                var participant = filteredParticipants[i];
                var thisBlock = '';

                for (var fieldId = 0; fieldId < participantFields.length; fieldId++) {
                    var field = participantFields[fieldId];
                    thisBlock += wrapAndReturn(field, participant[field]);
                    if (fieldId < participantFields.length - 1) {
                        thisBlock += wrapBlackSpan(',<br />');
                    }
                }

                if (participantsJson.length != 0) {
                    participantsJson += wrapBlackSpan(',<br />');
                } else {

                }
                participantsJson += block(thisBlock);
            }
            jsonObject.json += participantsJson + wrapBlackSpan('] <br />');
        }

        if (jsonObject.json != "") {
            return block(jsonObject.json);

        }
    }

    function block(element) {
        return '<div style="padding-left:20px;">' +
            '<div>' + wrapBlackSpan('{') + '</div>' +
            '<div style="padding-left:40px;">' + element + '</div>' +
            '<div>' + wrapBlackSpan('}') + '</div>' +
            '</div>';
    }

    function wrapAndReturn(property, value) {
        return wrapGreenSpan('"' + property + '"') + wrapBlackSpan(' : ') + wrapGreenSpan('"' + value + '"');
    }

    function wrap(object,property, value) {
        if(object.json.length > 0){
            object.json += wrapBlackSpan(', <br />');
        }
        object.json += wrapGreenSpan('"' + property + '"') + wrapBlackSpan(' : ') + wrapGreenSpan('"' + value + '"');
    }

    function wrapGreenSpan(element) {
        return  '<span class="str">' + element + '</span>';
    }

    function wrapBlackSpan(element) {
        return wrapBlack(element, 'pun');
    }

    function wrapBlack(element, styleClass) {
        return '<span class="' + styleClass + '">' + element + '</span>';
    }

    $scope.filterParticipants = function (origArray) {
        var filteredParticipants = [];
        for (var i = 0; i < origArray.length; i++) {
            var participant = origArray[i];
            if (participant.id != "") {
                filteredParticipants.push(participant);
            }
        }
        return filteredParticipants;
    }

    $scope.generateContributeurJson = function () {


        var jsonObject = {};
        if ($scope.form.idBase != '') {
            jsonObject['id-base'] = $scope.form.idBase;
        }
        var filteredParticipants = $scope.filterParticipants($scope.form.contributors);

        if (filteredParticipants.length > 0) {
            jsonObject['participants'] = filteredParticipants;
        }

        if ($scope.form.title != '' && !$scope.detectTitle) {
            jsonObject['title'] = $scope.form.title;
        }
        if ($scope.form.description != '' && !$scope.detectDescription) {
            jsonObject['description'] = $scope.form.description;
        }

        if ($scope.form.language != '' && $scope.form.language != 'no_language') {
            jsonObject['language'] = $scope.form.language;
        }
        if ($scope.form.copyright != '') {
            jsonObject['copyright'] = $scope.form.copyright;
        }
        if ($scope.form.image != '') {
            jsonObject['image'] = $scope.form.image;
        }

        var json = angular.toJson(jsonObject);
        if (json != "{}") {
            return json;
        } else {
            return "";
        }
    }

    $scope.generatedHeaderLink = '';
    $scope.workingConfiguration = false;
    $scope.chooseConfiguration = function(config){
        $scope.mobbrConfiguration = '';
        $scope.workingConfiguration = true;
        if(config === 'mobbr'){
            CreateButton.storeJson({'json':$scope.generateContributeurJson()},function(response){
                $scope.workingConfiguration = false;
                if(response.result != null && response.result.length > 0){
                    $scope.generatedHeaderLink = ''
                    if($scope.form.button != $scope.nobutton()){
                        $scope.generatedHeaderLink += '<script type="text/javascript" src="https://mobbr.com/mobbr-button.js/"></script>\n';
                    }
                    $scope.generatedHeaderLink += '<link rel="participation" href="' +response.result+ '"/>';
                    $scope.mobbrConfiguration = config;

                    Msg.setResponseMessage( 'info','Stored payment script',response);

                }  else{
                    Msg.setResponseMessage( 'info','Could not store payment script',response);
                }
            },function(response){
                $scope.workingConfiguration = false;
                Msg.setResponseMessage( 'error', 'Could not store payment script',response);
            });

        }else{
            CreateButton.validateJson({'json':$scope.generateContributeurJson()},function(response){
                $scope.workingConfiguration = false;
                if(response.result === true){
                    Msg.setResponseMessage( 'info','Payment script validated',response);

                    $scope.mobbrConfiguration = config;
                }else{
                    Msg.setResponseMessage( 'info','Invalid payment script',response);
                }
            },function(response){
                $scope.workingConfiguration = false;
                Msg.setResponseMessage( 'error', 'Invalid payment script',response);
            });

        }
    }

    $scope.generateButtonScript = function () {
        if($scope.step() >= 6){
            return '<script type="text/javascript">mobbr.' + $scope.form.button + '(\'' + $scope.form.url + '\');</script>';
        }
        return '';
    }

    $scope.generateMetaScript = function () {
        var metaScript = ''
        if($scope.form.button != $scope.nobutton()){
            metaScript += '<script type="text/javascript" src="https://mobbr.com/mobbr-button.js/"></script>\n';
        }
        metaScript += '<meta name="participation" content=\'' + $scope.generateContributeurJson() + '\'/>';

        return metaScript;
    }
});