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
                closeInfoWindow={this.props.closeMarkerWindow}
            />
        if(this.props.addMarkerMode){
            window = 
            <MarkerWindow place={this.props.place} 
                lat={this.props.place.lat}
                lng={this.props.place.lng}
                closeMarkerWindow={this.props.closeMarkerWindow}
                submitMarker={this.props.submitMarker}
                id={this.props.id}
            />
        }
        return(
            <div>
                <div className={`NewMarkerStyle`}/>
                {this.props.show && window}
            </div>
        );
    }
}

export default NewMarker;