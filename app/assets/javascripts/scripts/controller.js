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
      $scope.category = {};
      $scope.inventoryData = {};
      $scope.inventoryList = {};
      $scope.categoryShow = 'on-stock';
      $scope.total = {};
      $scope.lists = [ 
          { 'value' : 'on-stock' , 'category' : 'On Stock'  }, 
          { 'value' : 'direct-purchase' , 'category' : 'Direct Purchase'  }, 
          { 'value' : 'product-order' , 'category' : 'Product Order'  }
      ];
      $scope.category.list = $scope.lists[0];
      
      // Get list of services
      $scope.categories = function categories(){
        CarServer.request("get", "/categories",
        function(response){
          $scope.categoryList = response;
          console.log($scope.categoryList);

        });
      }
      
      $scope.submitStock = function submitStock(){
        console.log($scope.inventoryData);
        CarServer.request("post", '/inventories/submitStock',
          function(response){
            console.log(response);
            $scope.getInventories();
          }, $scope.inventoryData);

        $scope.inventoryData = "";
      }
      // add inventory data

      $scope.showCategoryForm = function showCategoryForm( categoryType ) {
        
        if (categoryType.value == 'on-stock') {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-' + categoryType.value ).show();
        } else if(categoryType.value == 'direct-purchase') {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-' + categoryType.value ).show();
        } else if(categoryType.value == 'product-order') {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-' + categoryType.value ).show();
        } else {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-on-stock' ).show();
        };
      }


      // $scope.typeCategory = function typeCategory(){        
      //   $( '.form-wrapper' ).css( 'display','none' );
      //   $( '.form-on-stock' ).show();
        // if ( list.category_name == "On Stock" ) {
        //         $( '.form-wrapper' ).css( 'display','none' );
        //         $( '.form-on-stock' ).show();
        // } else if( list.category_name == 'Direct Purchase' ){
        //     $( '.form-wrapper' ).css( 'display','none' );
        //     $( '.form-direct-purchase' ).show();
        // } else if( list.category_name == 'Product Order' ){
        //     $( '.form-wrapper' ).css( 'display','none' );
        //     // $( '.form-product-order' ).show();
        // }else{
        //   $( '.form-on-stock' ).show();
        // }
      // }
      
      // $scope.typeCategory();

      // get inventories
      $scope.getInventories = function getInventories(){
        var forTotal =  {}
        CarServer.request("get", '/inventories/getInventories',
          function(response){
            $scope.inventoryList = response;
          });
      }
      // get total
      $scope.getTotal = function getTotal(){
        var total = 0;
        var total = 0;
        for(var i = 0; i < $scope.inventoryList.length; i++){
            var product = $scope.inventoryList[i];
            total += (product.price * product.quantity);
        }
        return total;
      }
      // get stocks
      $scope.getInventoryStocks = function getInventoryStocks(){
        CarServer.request("get",'/inventories/getInventoryStocks',
          function(response){
            console.log(response)
          });
      }


      // load functions
      $scope.getInventoryStocks();
      $scope.getInventories();
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