app.directive('fcDatePicker', function() {
    return {
        restrict: 'AEC',
        templateUrl: 'dist/components/form-elements/datepicker/datepicker.html',
        scope: {
            label: '=',
            model: '=',
            format: '=?'
        },
        link: function (scope, element, attrs) {
            
            var picker = $(element).find('input')
            picker.datepicker({
                autoclose: true,
                format: scope.format || 'dd-mm-yyyy'
            });
            
            picker.on('changeDate', function(e) {
                scope.model = moment(e.date).format('YYYY-MM-DD HH:mm:ss');
                scope.$apply();
            });
            
            scope.$watch('model', function(n, o) {
                
                if (n === o) {
                    return;
                }
                
                scope.model = moment(n).format('YYYY-MM-DD HH:mm:ss');
                var k = moment(n).format('DD-MM-YYYY');
                picker.datepicker('update', k);
            });
            
            /* Modify label if required parameter
            is present in attrs */
            if (attrs.hasOwnProperty('required')) {
                scope.required = true;
            }
            
        }
    };
});
