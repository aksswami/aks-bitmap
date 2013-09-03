function coinmap(position) {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    
    var my_marker = new google.maps.Marker({
      position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      map: map,
      title: 'My Position'
    });
    
    var address = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); 
    var markers = [];
    $.getJSON("http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];(node[%22payment:bitcoin%22=yes];way[%22payment:bitcoin%22=yes];%3E;);out;", function(data){
        
        $.each(data.elements, function(key, value){
            var latLng = new google.maps.LatLng(value.lat,value.lon);
            var marker = new google.maps.Marker({'position': latLng});
            markers.push(marker);       
        });
        
    });
   
    
    //var markerCluster = new MarkerClusterer(map, markers);
    //alert("hello");
/*var markers = new L.MarkerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 32});*/

    var geocoder= new google.maps.Geocoder();
    var radius = 8000000;//parseInt(document.getElementById('radius').value, 10)*1000;
    geocoder.geocode(  {'latLng': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
     // map.setCenter(results[0].geometry.location);
     /* var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });*/
        var circle = null;
        
      if (circle) circle.setMap(null);
      circle = new google.maps.Circle({center: new google.maps.LatLng(25.0411352, 121.6149205),
                                     radius: radius,
                                     fillOpacity: 0.35,
                                     fillColor: "#FF0000",
                                     map: map});
        alert("hello");
      var bounds = new google.maps.LatLngBounds();
      for (var i=0; i<markers.length;i++) {
        if (google.maps.geometry.spherical.computeDistanceBetween(markers[i].getPosition(),my_marker.getPosition()) < radius) {
          bounds.extend(markers[i].getPosition())
          markers[i].setMap(map);
        } else {
          markers[i].setMap(null);
        }
      }
      map.fitBounds(bounds);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function codeAddress(address, gmarkers, my_marker) {

}
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    }