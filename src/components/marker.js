import React, {Component} from 'react';
import InfoWindow from './infoWindow';

import "./css/marker.css";

class Marker extends Component{
    render(){
        return(
            <div>
                <div className={`MarkerStyle ${this.props.place.show ? "active": ""}`}/>
                {
                    this.props.place.show && 
                    <InfoWindow 
                        place={this.props.place}
                        closeInfoWindow = {this.props.closeInfoWindow}
                        editMarker = {this.props.editMarker}
                    />
                }
            </div>
        )
    }
}

export default Marker;