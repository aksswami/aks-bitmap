function coinmap(position) {
    var my_latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    my_latLng = new google.maps.LatLng(41.3, -87.00);
    var mapOptions = {
        zoom: 8,
        center: my_latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var my_marker = new google.maps.Marker({
        position: my_latLng,
        map: map,
        title: 'My Position'
    });


    var markers = [];
    var user_radius = 1000000;
    $.getJSON("http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];(node[%22payment:bitcoin%22=yes];way[%22payment:bitcoin%22=yes];%3E;);out;", function (data) {

        $.each(data.elements, function (key, value) {
            
            var latLng = new google.maps.LatLng(value.lat, value.lon);
            var marker = new google.maps.Marker({
                'position': latLng
            });
            markers.push(marker);
        });

        // Define the circle
        var circle = new google.maps.Circle({
            map: map,
            clickable: false,
            // metres
            radius: user_radius,
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
        //alert("Sdfsf");
        for (var i = 0; i < markers.length; i++) {
            //alert("ancd");
            if (bounds.contains(markers[i].getPosition())) {
                //alert("hello");
                markers[i].setMap(map);
            } else {
                markers[i].setMap(null);
            }
        }

    });




    //var markerCluster = new MarkerClusterer(map, markers);

}


function onError(error) {
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}