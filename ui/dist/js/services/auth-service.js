app.service('authService', function($window, $http, $timeout, $rootScope, $location, CONFIG){
    var self = this;
    
    self.login = function(data) {
        return $http.post(CONFIG.host + '/auth', data);
    };
    
    self.parseJwt = function(token) {
        if (!token) {
            token = self.getToken();
        }
        
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    };
    
    self.saveToken = function(data) {
        $window.localStorage['jwtToken'] = data.access_token;
        
        /* Broadcast token reception */
        $rootScope.$emit("authService.token.save");
        
        /* Refresh Token before expiry */
        $timeout(function() {
            self.refreshToken();
        }, Number(data.expires_in) * 1000 - 100);
        
    };
    
    self.getToken = function() {
        return $window.localStorage['jwtToken'];
    };
    
    self.refreshToken = function() {
        
        $http.get(CONFIG.host + '/api/v1/refresh')
        .then(function(response) {
            self.saveToken(response.data);
        });
        
    };
    
    self.isAuthed = function() {
        var token = self.getToken();
        
        if (token && token != 'undefined') {
            var params = self.parseJwt(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            return false;
        }
    };
    
    self.logout = function() {
        $window.localStorage.removeItem('jwtToken');
        $location.path('/login');
    };
    
});
