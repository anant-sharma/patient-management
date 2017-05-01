app.controller('patientViewController', function($scope, $location, patientService){
    
    var patientDataTable;
    
    $scope.pageHeader = 'Patients';
    
    /* Initialize parameters to 
    be sent along with query */
    $scope.params = {};
    
    /* Function to fetch content
    by passing params */
    $scope.fetch = function() {
        patientService.get(function(err, response) {
            
            if (err) {
                console.trace(err);
                return;
            }
            
            $scope.data = response;
            
            angular.forEach($scope.data, (obj) => {
                obj.dob = moment(obj.dob).format('DD-MM-YYYY');
            });
            
            /**
             * Initialize Patient
             * Data Table
             */
            setTimeout(function() {
                patientDataTable = $("#patientTable").DataTable({
                    "paging": false,
                    "info": false,
                    "searching": true
                });
                
                $('#patientTable_filter').remove();
            }, 500);
            
        });
    };
    $scope.fetch();
    
    /** Function to search in data table */
    $scope.search = function() {
        patientDataTable.search($scope.q, false, true).draw();
    };
    
    /* Function to redirect to
    add/edit mode */
    $scope.redirect = function(id) {
        
        if (id === 'new') {
            $location.path('/patient/new');
            return;
        }
        
        $location.path('/patient/' + id.id);
    };
    
});

app.controller('patientInputController', function($scope, $location, patientService, 
    $routeParams, toasterService) {
    
    /* Initialize blank obj to contain
    patient information */
    $scope.o = {};
    
    /* Based on id, determines
    whether the view is in add or 
    edit mode. Defaults to add mode */
    $scope.mode = 'add';
    
    if ($routeParams.id != undefined) {
        $scope.mode = 'edit';
        
        /* Get Patient Details */
        patientService.detail($routeParams.id, function(err, response) {
            if (err) {
                console.trace(err);
                return;
            }
            
            angular.forEach(response, function(obj) {
                $scope.o = obj;
            });
            
        });
        
    }
    
    /* Patient Operations */
    $scope.patient = {};
    
    /* Save Details */
    $scope.patient.save = function() {
        
        $scope.errors = [];
        
        patientService.put($scope.o, function(err, response) {
            
            /** Prepare toast object
             */
            var toastObj = {
                type: 'success',
                title: 'Patient Management',
            };
            
            if (err) {
                
                if (err.hasOwnProperty('errors')) {
                    $scope.errors = err.errors;
                    return;
                }
                
                toastObj.type = 'error';
                toastObj.body = 'Some error occurred';
                toasterService.pop(toastObj);
                
                return;
            }
            
            if ($scope.mode === 'add') {
                toastObj.body = 'Record added successfully';
            } else {
                toastObj.body = 'Record updated successfully';
            }
            
            toasterService.pop(toastObj);
            $scope.patient.cancel();
        });
    };
    
    /* Cancel Add */
    $scope.patient.cancel = function() {
        $location.path('/patient');
    };
    
});
