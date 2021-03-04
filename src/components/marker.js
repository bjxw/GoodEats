import React, {Component} from 'react';
import InfoWindow from './infoWindow';

import "./css/marker.css";

/* 
    This class defines the Marker component placed on the Map. 
    It contains Marker info passed from map.js and an InfoWindow component as seen in infoWIndow.js 
*/
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