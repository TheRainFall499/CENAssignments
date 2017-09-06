angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.addList = undefined;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.clearAdd = function(){
        $scope.addList = {"code": null, "name": null, "coordinates": {"latitude": null, "longitude": null}, "address": null};
    };
    $scope.addListing = function() {
        //alert("triggered addListing()")
        $scope.addList = {"code": $scope.addList.code, "name": $scope.addList.name, "coordinates": {"latitude": $scope.addList.latitude, "longitude": $scope.addList.longitude}, "address": $scope.addList.address};
        $scope.listings.push($scope.addList);
    };
    $scope.deleteListing = function(index) {
        $scope.listings.splice($scope.listings.indexOf(index), 1);
        $scope.detailedInfo = undefined;
    };
    $scope.showDetails = function(index) {
        $scope.detailedInfo = index;
    };
  }
]);