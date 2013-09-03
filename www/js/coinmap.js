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
        
    // Define the circle
    var circle = new google.maps.Circle({
        map: map,
        clickable: false,
        // metres
        radius: 100000,
        fillColor: '#fff',
        fillOpacity: .6,
        strokeColor: '#313131',
        strokeOpacity: .4,
        strokeWeight: .8
    });
    // Attach circle to marker
    circle.bindTo('center', my_marker, 'position');
    // Get the bounds
    var bounds = circle.getBounds();
    for (var i=0; i < markers.length;i++) {
        if (bounds.contains( markers[i].getPosition())){
            markers[i].setMap(map);
        }
        else{
            markers[i].setmap(null);
        }
    }
   
    
    //var markerCluster = new MarkerClusterer(map, markers);
    
}


function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
    }