app.service('patientService', function($http, CONFIG){
    var self = this;
    
    /* Get tabular data corresponding 
    to params */
    this.get = function(cb) {
        
        $http.get(CONFIG.host + '/api/v1/patient').then(function(response) {
            cb(null, response.data);
        });
        
    };
    
    /* Get details of bank
    corresponding to fc/id sent as id */
    this.detail = function(id, cb) {
        
        $http.post(CONFIG.host + '/api/v1/patient', { id: id }).then(function(response) {
            cb(null, response.data);
        });
        
    };
    
    /* Insert data */
    this.put = function(data, cb) {
        
        $http.put(CONFIG.host + '/api/v1/patient', data).then(function(response) {
            cb(null, response.data);
        }, function(response) {
            cb(response.data);
        });
        
    };
    
});
