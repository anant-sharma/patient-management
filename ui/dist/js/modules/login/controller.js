app.controller('loginController', function($scope, $location, authService) {
    
    $('.main-header').hide();
    $('.main-sidebar').hide();
    $('.content-wrapper').css({ "margin-left": "0px" });
    $('.main-footer').css({ "margin-left": "0px" });
    
    $scope.o = {};
    
    $scope.login = function() {
        
        $scope.errorMsg = '';
        
        authService.login($scope.o).then(function(response) {
            
            if (response.data.hasOwnProperty('error')) {
                $scope.errorMsg = response.data.error;
                return;
            }
            
            authService.saveToken(response.data);
            $location.path('/patient');
            
        }, function(response) {
            
            if (response.data.hasOwnProperty('error')) {
                $scope.errorMsg = response.data.error;
                return;
            }
            
        });
        
    };
    
    if (authService.isAuthed()) {
        authService.refreshToken();
        $location.path('/patient');
    }
    
});
