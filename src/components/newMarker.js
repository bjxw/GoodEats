import React, {Component} from 'react';
import MarkerWindow from './markerWindow';
import InfoWindow from './infoWindow';

import "./css/newMarker.css";

class NewMarker extends Component{

    render(){
        var window = 
            <InfoWindow place={this.props.place} 
                lat={this.props.place.lat}
                lng={this.props.place.lng}
            />
        if(this.props.addMarkerMode){
            <MarkerWindow name={this.props.place.name} 
                lat={this.props.place.lat}
                lng={this.props.place.lng}
                closeMarkerWindow={this.props.closeMarkerWindow}
                // submitMarker={this.submitMarker}
                // index={this.state.markers.length}
            />
        }
        return(
            <div>
                <div className="NewMarkerStyle"/>
                {this.props.show && window}
            </div>
        );
    }
}

export default NewMarker;