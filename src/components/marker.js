import React, {Component} from 'react';
import InfoWindow from './infoWindow';

import "./css/marker.css";

class Marker extends Component{
    render(){
        return(
            <div>
                <div className={`MarkerStyle ${this.props.show ? "active": ""}`}/>
                {
                    this.props.show && 
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