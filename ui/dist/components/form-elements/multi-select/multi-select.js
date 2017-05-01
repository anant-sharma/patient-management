app.directive('fcMultiSelect', function(){
    return{
        restrict: 'AEC',
        templateUrl: 'dist/components/form-elements/multi-select/multi-select.html',
        scope: {
            label: '=',
            model: '=',
            list: '=?'
        },
        link: function(scope, element, attrs, controller) {
            
            /* Modify label if required parameter
            is present in attrs */
            if (attrs.hasOwnProperty('required')) {
                scope.required = true;
            }
            
        },
        controller: function($scope) {
            
            $scope.selected = {};
            
            $scope.$watch('model', function(n, o) {
                if (n === o) {
                    return;
                }
                $scope.selected.value = $scope.model;
            });
            
            $scope.$watch('list', function(n, o) {
                if (n === o) {
                    return;
                }
                $scope.selected.value = $scope.model;
            });
            
            $scope.$watch('selected.value', function(n, o) {
                if (n === o) {
                    return;
                }
                $scope.model = n;
            });
            
            /* Define conditional drop down constants */
            
            /* ATM Plan Status */
            if ($scope.label === 'ATM Plan Status') {
                $scope.list = ['EOD', 'Finalize Plan', 'Fully Load', 'No Load', 'Not Planned'];
            }
            
            /* Cash Collection Days [from Banks] */
            if ($scope.label === 'Cash Collection Days [from Banks]' || $scope.label === 'Cash Loading Days [by CRAs]') {
                $scope.list = moment.weekdays();
            }
            
        }
    };
});
