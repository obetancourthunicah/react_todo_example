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
            break;
          case error.POSITION_UNAVAILABLE:
               return handler(null);
            break;
          case error.TIMEOUT:
                return handler(null);
            break;
          case error.UNKNOWN_ERROR:
              hasGeoDataEnabled=false;
              return handler(null);
              break;
        }
      }
    );
  }else{
    return handler(null);
  }
}

export default getData;
