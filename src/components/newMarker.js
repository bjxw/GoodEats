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
            <MarkerWindow name={this.props.place.name} 
                lat={this.props.place.lat}
                lng={this.props.place.lng}
                closeMarkerWindow={this.props.closeMarkerWindow}
                submitMarker={this.props.submitMarker}
                index={this.props.index}
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