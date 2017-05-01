app.directive('fcTextArea', function(utils){
    return {
        restrict: 'AEC',
        templateUrl: 'dist/components/form-elements/textarea/textarea.html',
        scope: {
            label: '=',
            model: '=',
            rows: '='
        },
        link: function(scope, element, attrs, controller) {
            
            /* Modify label if required parameter
            is present in attrs */
            if (attrs.hasOwnProperty('required')) {
                scope.required = true;
            }
            
            /* Watch value for changes and validate
            based on the attributes defined */
            scope.$watch('model', function(n, o) {
                
                if (n === o) {
                    return;
                }
                
                /* Automatically convert all
                text input to uppercase if no caps
                attribute is not provided */
                if (!attrs.hasOwnProperty('nocaps')) {
                    scope.model = utils.upperCase(n);
                }
                
                /* Validate */
                scope.state = utils.validate(n, attrs);
                
            });
            
        }
    };
});
