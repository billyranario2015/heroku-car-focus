app
  .factory( "CarServer" , [
    "$http",
    function factory ( $http ) {
      var host = "https://glacial-everglades-2781.herokuapp.com";

      this.request  = function request ( method , path , callback , data ) {
        $http[ method ]( host + path , ( data || { } ) )
        .success( function ( response ) {
          callback( response );
        } );
      }

      return this;
    }
  ]);