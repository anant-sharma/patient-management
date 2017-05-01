app.factory('authInterceptor', function($window, $location, $q, spinnerService){
    var xhrCreations = 0;
    var xhrResolutions = 0;
    
    function isLoading() {
        return xhrResolutions < xhrCreations;
    }
    
    function updateStatus() {
        
        if (isLoading()) {
            spinnerService.show();
        } else {
            spinnerService.hide();
        }
        
    }
    
    return {
        request: function(config) {
            
            // Get Token
            var token = $window.localStorage['jwtToken'];
            
            /* If token is present
            add token to api header */
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            
            xhrCreations++;
            updateStatus();
            
            return config;
        },
        responseError: function(res) {
            
            xhrResolutions++;
            updateStatus();
            
            if (res.status === 401) {
                $location.path('/login');
            }
            
            return $q.reject(res);
        },
        response: function(res) {
            
            xhrResolutions++;
            updateStatus();
            
            return res;
        }
    };
});
