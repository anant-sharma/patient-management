app.service('toasterService', function(toaster, $rootScope) {
    
    this.pop = function(obj) {
        
        toaster.pop({
            type: obj.type,
            title: obj.title,
            body: obj.body,
            timeout: 6000,
            showCloseButton: true
        });
        
    };
    
});
