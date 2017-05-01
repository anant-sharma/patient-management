app.service('utils', function(validationService) {
    var self = this;
    
    /* This function takes care 
    of boolean issues */
    self.processBool = function(x) {
        
        if (typeof(x) === 'boolean') {
            return x;
        }
        
        if (typeof(x) === 'string') {
            
            /* Change x to Uppercase
            for uniform comparison */
            x = x.toUpperCase();
            
            /* Set values for which
            to consider true */
            var trueArr = ['TRUE', 'YES', 'Y'];
            
            /* Find x in above array */
            if (trueArr.indexOf(x) > -1) {
                return true;
            }
            
        }
        
        /* If nothing matches */
        return false;
    };
    
    /* This function converts passed
    string to uppercase */
    self.upperCase = function(x) {
        
        if (typeof x === 'string') {
            return x.toUpperCase();
        }
        
        return x;
    };
    
    /* This function validates the
    data and returns object containing
    status and error in case */
    self.validate = function(value, attrs) {
        
        /* Define return object */
        var response = {
            status: 'success',
            error: ''
        };
        
        var x;
        
        for (var key in attrs) {
            
            if (response.status === 'fail') {
                break;
            }
            
            switch (key) {
                
                /* Required Validation Case */
                case 'required':
                    x = validationService.required(value);
                    
                    if (!x) {
                        response.status = 'fail';
                        response.error = 'This field is mandatory';
                    }
                    
                    break;
                    
                /* Alphanumeric Validation Case */
                case 'alphanumeric':
                    x = validationService.alphanumeric(value);
                    
                    if (!x) {
                        response.status = 'fail';
                        response.error = 'Only alphanumeric values allowed';
                    }
                    
                    break;
                    
                /* No Multispace Validation Case */
                case 'nomultispace':
                    x = validationService.multispace(value);
                    
                    if (x) {
                        response.status = 'fail';
                        response.error = 'Multiple space not allowed';
                    }
                    
                    break;
                    
                /* Numeric Validation Case */
                case 'numeric':
                    x = validationService.numeric(value);
                    
                    if (!x) {
                        response.status = 'fail';
                        response.error = 'Only numeric values allowed';
                    }
                    
                    break;
                
                default: break;
            }
            
        }
        
        return response;
        
    };
    
    /**
     * Adjust viewport height
     */
    self.fixLayout = function() {
        
        // Window Height
        var t = $(window).height();
        
        // Set height
        $('.content-wrapper').css('min-height', `${t - 101}px`);
        $('.content-wrapper').css('margin-left', '0px');
        $('.main-footer').css('margin-left', '0px');
        
    };
    
});
