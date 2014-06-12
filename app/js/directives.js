'use strict';

/* Directives */
angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {

    return function(scope, elm, attrs) {
      elm.text(version);
    };

  }]).directive('hbsSwitch', [function($timeout) {

    return {
        restrict: 'EA',
        require: 'ngModel',
        template: '<input type="checkbox">',
        replace: true,
        scope: {
            //use an isolated scope to support multiple instances.
            switchId: '@',
            switchState: '@',
            switchAnimate: '@',
            size: '@',
            colorOn: '@',
            colorOff: '@',
            textOn: '@',
            textOff: '@',
            textLabel: '@'
        },
        link: function link(scope, element, attrs, controller) {

            //strap in the switch.
            element.bootstrapSwitch({
                size: scope.size || 'normal',
                onText: scope.textOn || 'ON',
                onColor: scope.colorOn || 'primary',
                offText: scope.textOff || 'OFF',
                offColor: scope.colorOff || 'default',
                labelText: scope.textLabel || '&nbsp',
                animate: (typeof(scope.switchAnimate) === 'undefined' ||
                    scope.switchAnimate === 'true' ||
                    scope.switchAnimate === true)
                    ? true
                    : false
            });

            //check for a state passed in.
            var state = (typeof(scope.switchState) === 'undefined' ||
                scope.switchState === 'true' ||
                scope.switchState === true)
                    ? true
                    : false;

            //set the state.
            element.bootstrapSwitch('state', state, true);


            //listen for changes from controllers or other directives.
            scope.$on("SWITCHBS_OPTION_UPDATE", function (event, args){

                //parse out the args payload.     { id:1, option:'onText', value:'YEP' }
                var id = args.id,
                    option = args.option,
                    value = args.value;

                //look for a specific id to toggle or do all if none.
                if (typeof(id) === 'undefined' || scope.switchId === id.toString()) {

                    //look for a specific id to toggle or do all if none.
                    element.bootstrapSwitch(option, value);
                }

            });

            scope.$on("SWITCHBS_DESTROY", function (event,value){
                //look for a specific id to toggle or do all if none.
                if (typeof(value) === 'undefined' || scope.switchId === value.toString()) {
                    element.bootstrapSwitch('destroy');
                }
            });


            //Toggle the enabled state of the switch.
            scope.$on("SWITCHBS_TOGGLE_ENABLED", function (event,value){
                //look for a specific id to toggle or do all if none.
                if (typeof(value) === 'undefined' || scope.switchId === value.toString()) {
                    scope.switchActive = !scope.switchActive;
                    element.bootstrapSwitch('toggleDisabled', scope.switchActive);
                }
            });

            scope.$on("SWITCHBS_TOGGLE_STATE", function (event,value){
                //look for a specific id to toggle or do all if none.
                if (typeof(value) === 'undefined' || scope.switchId === value.toString()) {
                    scope.switchState = !scope.switchState;
                    element.bootstrapSwitch('toggleState', scope.switchState);
                }
            });


            //listen for changes to the switch from the view.
            element.on('switchChange.bootstrapSwitch', function (e, data) {
                scope.$apply(function() {
                    controller.$setViewValue(data);
                });
                scope.$emit('SWITCHBS_CLICKED', {id:scope.switchId, value:data});
            });

        }
    }
}]);
