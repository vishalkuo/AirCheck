var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.775, lng: -122.434},
  });

}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

var grad = [
'rgba(0, 255, 255, 0)',
'rgba(0, 255, 255, 1)',
'rgba(0, 191, 255, 1)',
'rgba(0, 127, 255, 1)',
'rgba(0, 63, 255, 1)',
'rgba(0, 0, 255, 1)',
'rgba(0, 0, 223, 1)',
'rgba(0, 0, 191, 1)',
'rgba(0, 0, 159, 1)',
'rgba(0, 0, 127, 1)',
'rgba(63, 0, 91, 1)',
'rgba(127, 0, 63, 1)',
'rgba(191, 0, 31, 1)',
'rgba(255, 0, 0, 1)'
]


function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.4);
}



$(document).ready(function(){

      function getOp(){
        $.ajax("http://localhost:4567/cityJSON", {
            success: function(data) {
                ret = []
                for (i in data){
                    ret.push({
                        location: new google.maps.LatLng(data[i]['latitude'], data[i]['longitude']), weight: data[i]['weight'] / 100
                    })
                }
                new google.maps.visualization.HeatmapLayer({
                                        data: ret,
                                        map: map,
                                        radius: 60,
                                        maxIntensity: 1.0
                                      });
            }, error: function(){
                console.log("error")
            }
        })
      }

      getOp()

      function getWeather(){
        $.ajax("http://localhost:4567/getWeather", {
            success: function(data){
                ret = []
                for (i in data){
                    ret.push({
                        location: new google.maps.LatLng(data[i]['latitude'], data[i]['longitude']), weight: data[i]['weight'] / 100
                    })
                }
                new google.maps.visualization.HeatmapLayer({
                                        data: ret,
                                        map: map,
                                        radius: 60,
                                        maxIntensity: 1.0
                                      });
            }, error: function(){
                console.log("Error")
            }

        })
      }


    $('#get_started').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top
        }, 500);
        return false;
    });


})

