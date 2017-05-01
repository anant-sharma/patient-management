app.directive('fcSelect', function(utils, $location){
    return {
        restrict: 'AEC',
        templateUrl: 'dist/components/form-elements/select/select.html',
        scope: {
            label: '=',
            model: '=',
            list: '=?',
            screen: '=?',
            mode: '=?'
        },
        link: function(scope, element, attrs, controller) {
            
            /* Modify label if required parameter
            is present in attrs */
            if (attrs.hasOwnProperty('required')) {
                scope.required = true;
            }
            
            /** Diable on edit mode */
            if (scope.mode === 'edit' && attrs.hasOwnProperty('editdisabled')) {
                scope.isDisabled = true;
            }
            
        },
        controller: function($scope) {
            
            $scope.selected = {};
            
            $scope.$watch('model', function(n, o) {
                
                if (n === '') {
                    $scope.selected.value = null;
                    return;
                }
                
                $scope.selected.value = n;
                
            });
            
            $scope.$watch('list', function(n, o) {
                if (n === o) {
                    return;
                }
                
                if (n.indexOf('') === -1) {
                    n.push('');
                }
                
                $scope.selected.value = $scope.model;
            });
            
            $scope.change = function() {
                $scope.model = $scope.selected.value;
            };
            
            /* Gender */
            if ($scope.label === 'Gender') {
                $scope.list = ['Male', 'Female'];
            }
            
        }
    };
});
