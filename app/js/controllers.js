'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
  .controller('ControllerSwitchBS', ['$scope', function($scope) {

        //local scope variables.
        $scope.boolButton = 1;
        $scope.toggleSwitch = true;
        $scope.toggleCustom1 = true;
        $scope.switchSize = 'normal';
        $scope.switchColor = 'primary';
        $scope.switchLabelText = '';
        $scope.switchChange = '';
        $scope.switchState1 = '';

        $scope.bindTest = 'Test';

        //toggle functions.
        $scope.toggleActivation = function (id) {
            $scope.$broadcast('SWITCHBS_TOGGLE_ENABLED', id);
        };

        $scope.toggleState = function (id) {
            $scope.$broadcast('SWITCHBS_TOGGLE_STATE', id);
        };

        $scope.toggleReadOnly = function (id) {
            $scope.$broadcast('SWITCHBS_TOGGLE_READONLY', id);
        };

        //update functions.
        $scope.buttonText = function (id) {
            $scope.$broadcast('SWITCHBS_OPTION_UPDATE', { id: id, option:'onText', value:'YEP' });
            $scope.$broadcast('SWITCHBS_OPTION_UPDATE', { id: id, option:'offText', value:'NOPE' });
        };

        $scope.buttonSize = function (id, size) {
            $scope.$broadcast('SWITCHBS_OPTION_UPDATE', { id: id, option:'size', value:size });
        };

        $scope.buttonColors = function (id, colorOn, colorOff) {
            $scope.$broadcast('SWITCHBS_OPTION_UPDATE', { id: id, option:'onColor', value:colorOn });
            $scope.$broadcast('SWITCHBS_OPTION_UPDATE', { id: id, option:'offColor', value:colorOff });
        };

        $scope.buttonLabel = function (id, text) {
            $scope.$broadcast('SWITCHBS_OPTION_UPDATE', { id: id, option:'labelText', value:text });
        };

        $scope.buttonDestroy = function (id) {
            $scope.$broadcast('SWITCHBS_DESTROY', id);
        };

        //click handler for all switches on the form.
        $scope.$on("SWITCHBS_CLICKED", function (event,value){

            //look for a specific switch click event.
            if (value.id === 'switchChange') {
                $scope.switchChange = value.value;
                alert('you changed the value to ' + value.value);
            }
        });

  }]);
