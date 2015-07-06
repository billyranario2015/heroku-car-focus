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
    "$timeout",
    function controller($scope, $http, CarServer , $timeout)
    {
      console.log("inventoryAddCtrl");
      $scope.categoryList = {};
      $scope.category = {};
      $scope.inventoryData = {};
      $scope.inventoryList = {};
      $scope.categoryShow = 'on-stock';
      $scope.total = {};
      $scope.dataEdit = {};

      $scope.orderHolder = [];
      $scope.addOnStock = [];

      $scope.lists = [ 
          { 'value' : 'on-stock' , 'category' : 'On Stock'  }, 
          { 'value' : 'direct-purchase' , 'category' : 'Direct Purchase'  }, 
          { 'value' : 'product-order' , 'category' : 'Product Order'  }
      ];
      $scope.category.list = $scope.lists[0];
      var totalAmount = 0;
      
      // Get list of services
      $scope.categories = function categories(){
        CarServer.request("get", "/categories",
        function(response){
          $scope.categoryList = response;
          console.log($scope.categoryList);

        });
      }

      // Add On Stock to Basket 
       $scope.addToBasketStock = function addToBasketStock(){
        console.log( 'Added to On Stock basket' );
        console.log($scope.inventoryData);
        var today = new Date();
        var randomID = new Date().getTime() + '-' + Math.random().toString(36).slice(2);
        var totalQuantityPrice = parseFloat( $scope.inventoryData.price ) * parseFloat( $scope.inventoryData.quantity );
        var htmlList = '<li>'
                     + '<button priceQtyValue="'+totalQuantityPrice+'" id="' + randomID + '" class="btn btn-default btn-remove-stock-order" data-toggle="tooltip" data-placement="left" title="Click to Remove"><i class="fa fa-minus"></i></button>' 
                     + '<label><a href="#" id="'+ randomID +'" data-toggle="modal" class="edit-selection" data-target="#modal-edit-selection" >'+ $scope.inventoryData.product_name +'</a></label>'
                     + '<span class="price pull-right">Php <span class="price-value">' + totalQuantityPrice + '</span></span>'
                     + '</li>';
        $( '#basket-ordered-lists' ).append( htmlList );

        $scope.addOnStock.push({ 
          'cartID' : randomID,
          'category_id' : $scope.inventoryData.category_id ,  
          'transaction_date' : today.toISOString().substring(0, 10) ,
          'price' : $scope.inventoryData.price ,
          'product_name' : $scope.inventoryData.product_name ,
          'product_details' : $scope.inventoryData.product_details ,
          'product_type ' : $scope.inventoryData.product_type   ,
          'quantity' : $scope.inventoryData.quantity ,
        });

        $scope.inventoryData.price = "";
        $scope.inventoryData.product_name = "";
        $scope.inventoryData.product_details = "";
        $scope.inventoryData.product_type = "";
        $scope.inventoryData.quantity = "";

        getTotal( totalQuantityPrice , '+' );
       
       }


      // Add Direct Purchase to Basket 
      $scope.addToBasketDirPurch = function addToBasketDirPurch(){
        console.log( 'Added to On Stock basket' );
        console.log($scope.inventoryData);
        var today = new Date();
        var randomID = new Date().getTime() + '-' + Math.random().toString(36).slice(2);
        var totalQuantityPrice = parseFloat( $scope.inventoryData.price ) * parseFloat( $scope.inventoryData.quantity );
        var htmlList = '<li>'
                     + '<button priceQtyValue="'+totalQuantityPrice+'" id="' + randomID + '" class="btn btn-default btn-remove-stock-order" data-toggle="tooltip" data-placement="left" title="Click to Remove"><i class="fa fa-minus"></i></button>' 
                     + '<label><a href="#" id="'+ randomID +'" data-toggle="modal" class="edit-selection" data-target="#modal-edit-selection" >'+ $scope.inventoryData.product_name +'</a></label>'
                     + '<span class="price pull-right">Php <span class="price-value">' + totalQuantityPrice + '</span></span>'
                     + '</li>';
        $( '#basket-ordered-lists' ).append( htmlList );  
        getTotal( totalQuantityPrice , '+' );

        $scope.inventoryData.or_number = "";
        $scope.inventoryData.incharge = "";
        $scope.inventoryData.cash_on_hand = "";
        $scope.inventoryData.store = "";
        $scope.inventoryData.product_name = "";
        $scope.inventoryData.product_details = "";
        $scope.inventoryData.price = "";
        $scope.inventoryData.quantity = "";  
      }

      // Add Product Order to Basket 
      $scope.addToBasketProdOrder = function addToBasketProdOrder(){
        console.log( 'Added to Prodct Order basket' );
        console.log($scope.inventoryData);
        var today = new Date();
        var randomID = new Date().getTime() + '-' + Math.random().toString(36).slice(2);
        var totalQuantityPrice = parseFloat( $scope.inventoryData.price ) * parseFloat( $scope.inventoryData.quantity );
        var htmlList = '<li>'
                     + '<button priceQtyValue="'+totalQuantityPrice+'" id="' + randomID + '" class="btn btn-default btn-remove-stock-order" data-toggle="tooltip" data-placement="left" title="Click to Remove"><i class="fa fa-minus"></i></button>' 
                     + '<label><a href="#" id="'+ randomID +'" data-toggle="modal" class="edit-selection" data-target="#modal-edit-selection" >'+ $scope.inventoryData.product_name +'</a></label>'
                     + '<span class="price pull-right">Php <span class="price-value">' + totalQuantityPrice + '</span></span>'
                     + '</li>';
        $( '#basket-ordered-lists' ).append( htmlList );  
        getTotal( totalQuantityPrice , '+' );
        
        $scope.inventoryData.product_name = "";
        $scope.inventoryData.quantity = "";
        $scope.inventoryData.price = "";
        $scope.inventoryData.product_type = "";
        $scope.inventoryData.product_details = "";
      }


       // To Remove the Added Product
       $( 'body' ).delegate( '.btn-remove-stock-order' , 'click' , function(){
          var ID = $( this ).attr( 'id' );
          var pqv = $( this ).attr( 'priceQtyValue' );
          var priceValue = parseFloat( pqv );
          getTotal( priceValue , '-' );

          $.each( $scope.addOnStock , function(i){
              if($scope.addOnStock[i].cartID === ID) {
                  $scope.addOnStock.splice(i,1);
                  return false;
              }
          });
          console.log($scope.addOnStock);
          $( '#' + ID ).parent().remove();
       } );

       // Pass data to modal edit form
       $( 'body' ).delegate( '.edit-selection' , 'click' , function(){
        var ID = $( this ).attr( 'id' );
         $.each( $scope.addOnStock , function(i){
            console.log( $scope.addOnStock[i] );
            if ( $scope.addOnStock[i].cartID == ID ) {
              $timeout(function(){
                $scope.dataEdit.cartID = ID;
                $scope.dataEdit.price = $scope.addOnStock[i].price;
                $scope.dataEdit.product_name = $scope.addOnStock[i].product_name;
                $scope.dataEdit.product_details = $scope.addOnStock[i].product_details;
                $scope.dataEdit.product_type = $scope.addOnStock[i].product_type;
                $scope.dataEdit.quantity = $scope.addOnStock[i].quantity;
              },10);
            };

          });
       } );

       // Make all Changes for ordered items 
       $scope.updateOrderedProduct = function updateOrderedProduct() {
          console.log( $scope.dataEdit );
          $.each( $scope.addOnStock , function(i){
              $scope.addOnStock[i] = $scope.dataEdit;
          });
       } 

       function getTotal( orderValue , operation ) {
        var total = 0;
        if ( operation == '+' ) {
          total = totalAmount + orderValue;
        } else if( operation == '-' ) {
          total = totalAmount - orderValue;
        }
        totalAmount = total;
        $( '#totalBasketPrice' ).text( total.toFixed(2) );
      }

      // add inventory data
      $scope.showCategoryForm = function showCategoryForm( categoryType ) {
        
        if (categoryType.value == 'on-stock') {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-' + categoryType.value ).show();
          $( '#basket-ordered-lists li' ).remove();
          $scope.inventoryData = "";

        } else if(categoryType.value == 'direct-purchase') {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-' + categoryType.value ).show();
          $( '#basket-ordered-lists li' ).remove();
          $scope.inventoryData = "";

        } else if(categoryType.value == 'product-order') {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-' + categoryType.value ).show();
          $( '#basket-ordered-lists li' ).remove();
          $scope.inventoryData = "";

        } else {
          $( '.form-wrapper' ).css( 'display','none' );
          $( '.form-on-stock' ).show();
        };
        totalAmount = 0;
      }
      $scope.showCategoryForm(false);

      // Insert All Selected Products
      $scope.storeSelectedData = function storeSelectedData() {
        console.log( $scope.addOnStock );
      }

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