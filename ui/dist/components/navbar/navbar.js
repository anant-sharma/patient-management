app.directive('navbarContainer', function(){
    return {
        restrict: 'E',
        templateUrl: 'dist/components/navbar/navbar-container.html',
        scope: {},
        controller: function($scope, authService, $rootScope, $location) {
            
            $scope.user = {};
            $scope.o = {};
            
            $scope.evaluate = function() {
                if (authService.isAuthed()) {
                    $scope.user = authService.parseJwt();
                }
            };
            $scope.evaluate();
            
            $rootScope.$on('authService.token.save', function(event, data) {
                $scope.evaluate();
            });
            
            $scope.logout = function() {
                authService.logout();
            };
            
            if ($location.path() === '/login') {
                $('.main-header').hide();
            }
            
        }
    };
});
