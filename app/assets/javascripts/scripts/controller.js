app
  .controller('dashBoardCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("dashBoardCtrl");
    }
  ])
  .controller('inventoryViewCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("inventoryViewCtrl");
    }
  ])
  .controller('inventoryAddCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("inventoryAddCtrl");
      $scope.categoryList = {};
      $scope.inventoryData = {};
      // Get list of services
      $scope.categories = function categories(){
        CarServer.request("get", "/categories",
        function(response){
          $scope.categoryList = response;
          console.log($scope.categoryList);
        });
      }
      
      $scope.inventorySave = function inventorySave(){
        CarServer.request("post", '/inventories',
          function(response){
            console.log(response);
          }, $scope.inventoryData);
      }
      // add inventory data

      $scope.categories();
    }
  ])
  .controller('expenseAddCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("expenseAddCtrl");
    }
  ])
  .controller('expenseViewCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("expenseViewCtrl");
    }
  ])
  .controller('esitmationAddCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("esitmationAddCtrl");
    }
  ])
  .controller('estimationViewCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("estimationViewCtrl");
    }
  ])
  .controller('summaryViewCtrl', [
    "$scope",
    "$http",
    "CarServer",
    function controller($scope, $http, CarServer)
    {
      console.log("summaryViewCtrl");
    }
  ]);