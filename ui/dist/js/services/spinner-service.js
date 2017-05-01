app.service('spinnerService', function($window){
    var self = this;
    
    this.show = function() {
        
        $('body').css('overflow', 'hidden');
        
        var width = $(window).width();
        
        var height = $(window).height();
        
        $('.fc-spinner').css({ width: width, height: height });
        
        var xTop = (height - 50) / 2;
        
        var xLeft = (width - 50) / 2;
        
        $('.fc-spinner-circular').css({ top: xTop, left: xLeft });
        
        $('.fc-spinner').show();
        
    };
    
    this.hide = function() {
        
        $('body').css('overflow', 'auto');
        
        $('.fc-spinner').hide();
        
    };
});
