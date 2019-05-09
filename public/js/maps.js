const LAGUNA_COORDINATE = {
    lat: 14.372112,
    lng: 121.270716
};

var mapItems = []

function initMap() {
   let map_overview = new MapClass('map_overview')
   mapItems.push(map_overview)
   let map_simulate = new MapClass('map_simulation')
   mapItems.push(map_simulate)
}


class MapClass {
    map
    stations = []
    
    constructor(id){
        this.map =  new google.maps.Map(document.getElementById(id), {
            center: LAGUNA_COORDINATE,
            zoom: 11,
            maxZoom: 16 ,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        });
    
        var bounds = new google.maps.LatLngBounds();
    
        var boundsListener = google.maps.event.addListener((this.map), 'bounds_changed', function (event) {
            this.setZoom(11);
            google.maps.event.removeListener(boundsListener);
        });
    
    
        var lineSymbol = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 4
        };
        this.setMap()
    }

    setMap(){
        let stations = getCoordinatesPerStation()
        Object.keys(stations).map((key) => {
            let station = stations[key]
            let stationObject = new WaterStation(google, this.map, station )
            this.stations.push(stationObject)
        })
    }

}