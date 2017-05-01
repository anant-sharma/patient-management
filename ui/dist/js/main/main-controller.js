app.controller('mainController', function($scope, authService, $location) {
    
    if (!authService.isAuthed()) {
        $location.path('/login');
    } else {
        authService.refreshToken();
    }
    
});