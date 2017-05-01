'use strict';

app.constant('CONFIG', {
    host: window.location.origin
});

app.run(function($rootScope, $location, authService, utils, $timeout) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        
        if ($location.path() !== '/login') {
            
            if (!authService.isAuthed()) {
                $location.path('/login');
                return;
            }
            
            $('.main-header').show();
            $('.main-sidebar').hide();
        }
        
    });
    
    $rootScope.$on("$locationChangeSuccess", function() {
        
        $timeout(function() {
            utils.fixLayout();
        }, 1000);
        
    });
});

app.config(function($routeProvider, $httpProvider){
	
	$routeProvider
	
	    /* Patient Screen Configuration */
        .when('/patient', {
            templateUrl: "dist/partials/patient/view.html",
            controller: 'patientViewController',
        })
        .when('/patient/new', {
            templateUrl: "dist/partials/patient/input.html",
            controller: 'patientInputController',
        })
        .when('/patient/:id', {
            templateUrl: "dist/partials/patient/input.html",
            controller: 'patientInputController',
        })
        
        /* Login Screen Configuration */
        .when('/login', {
            templateUrl: "dist/partials/login/login.html",
            controller: 'loginController'
        })
        
        .otherwise({
            redirectTo: '/login'
        });
        
    $httpProvider.interceptors.push('authInterceptor');
});
