let hasGeoDataEnabled  = navigator.geolocation && true;

function getData(handler){
  if(hasGeoDataEnabled){
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        return handler({
            type:"Point",
            coordinates:[
                        position.coords.longitude,
                        position.coords.latitude
                         ]
        });
      },
      (error)=>{
        switch(error.code){
          case error.PERMISSION_DENIED:
              hasGeoDataEnabled = false;
              return handler(null);
          case error.POSITION_UNAVAILABLE:
               return handler(null);
          case error.TIMEOUT:
                return handler(null);
          case error.UNKNOWN_ERROR:
              hasGeoDataEnabled=false;
              return handler(null);
          default:
              hasGeoDataEnabled=false;
              return handler(null)
        }
      }
    );
  }else{
    return handler(null);
  }
}

export default getData;
