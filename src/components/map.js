import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'; //see https://github.com/google-map-react/google-map-react/blob/master/API.md
import Marker from './marker'

class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.addMarker = this.addMarker.bind(this);
        this.state = {
            markers: [
                {lat: 34.08421909476845, lng: -118.07298836096781}, // in-n-out
                {lat: 34.07993604059942, lng: -118.08234390563354}, // bay island
                {lat: 34.07583050324687, lng: -118.07335314159903}, // bodhi veggie cuisine
                {lat: 34.10543567839181, lng: -118.07300981856079}, // green zone
                {lat: 34.090687695735866, lng: -118.0529254379374}, // popeyes
            ]
        }
    }

    addMarker(e){
        //console.log(e); //OUTPUTS: ({ x, y, lat, lng, event })
    }

    render(){
        const defaultCenter = {
            lat: 34.08070866379608,
            lng: -118.0738933692873
        }

        var markers = this.state;
        console.log(markers);

        return(
            <div style={{height: '95vh', width: '90vw'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'hidden'}}
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    onClick={this.addMarker}
                >
                    {this.state.markers.map((marker) =>(
                        <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                        />
                    ))}
                </GoogleMapReact>
            </div>
            
        );
    }
};

export default GoogleMap;

