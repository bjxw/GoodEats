import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'; //see https://github.com/google-map-react/google-map-react/blob/master/API.md
import Marker from './marker';
import MarkerWindow from './markerWindow';

class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.addMarker = this.addMarker.bind(this);
        this.openMarker = this.openMarker.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.state = {
            markers: [
                {lat: 34.08421909476845, lng: -118.07298836096781, name:"In-N-Out", show: false, id: 0}, // in-n-out
                {lat: 34.07993604059942, lng: -118.08234390563354, name:"Bay Island", show: false, id: 1}, // bay island
                {lat: 34.07583050324687, lng: -118.07335314159903, name:"Bodhi Veggie Cuisine", show: false, id: 2}, // bodhi veggie cuisine
                {lat: 34.10543567839181, lng: -118.07300981856079, name:"Green Zone", show: false, id: 3}, // green zone
                {lat: 34.090687695735866, lng: -118.0529254379374, name:"Popeyes", show: false, id: 4}, // popeyes
            ],

            showMarkerWindow: false,
            markerWindowXY: {lat: 0, lng: 0}
        }
    }

    addMarker(e){
        console.log('addMarker() fired');
        console.log(e); //OUTPUTS: ({ x, y, lat, lng, event })

        const marker = {lat: e.lat, lng: e.lng};
        var markers = this.state.markers;
        markers = markers.concat(marker);
        
        var showMarkerWindow = !this.state.showMarkerWindow;
        this.setState({showMarkerWindow})
        this.setState({markerWindowXY: marker});
        //console.log(markers);
        this.setState({markers});
    }

    openMarker(marker){
        console.log('openMarker() fired');
        var markers = this.state.markers;
        const index = markers.findIndex((index) => index.id === marker);

        for(var i = 0; i < markers.length; i++){
            if(i === index){
                console.log("index matches");
                markers[i].show = !markers[i].show;
            } else {
                markers[i].show = false;
            }
        }

        //console.log(markers);
        this.setState({markers});
    }

    markerWindowClick(e){
        e.stopPropagation();
    }

    render(){
        const defaultCenter = {
            lat: 34.08070866379608,
            lng: -118.0738933692873
        }

        var markers = this.state.markers;
        
        var markerWindow = null;
        if(this.state.showMarkerWindow){
            markerWindow = 
            <MarkerWindow
                lat={this.state.markerWindowXY.lat}
                lng={this.state.markerWindowXY.lng}
            />
        }
        return(
            <div style={{height: '95vh', width: '90vw'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: ''}}
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    onClick={this.addMarker}
                    onChildClick={this.openMarker}
                    options={{draggableCursor:'pointer'}}
                >
                    {markers.map((marker) =>(
                        <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                            name={marker.name}
                            place={marker}
                            show={marker.show}
                        />
                    ))}

                    {markerWindow}
                </GoogleMapReact>

                
            </div>
            
        );
    }
};

export default GoogleMap;

