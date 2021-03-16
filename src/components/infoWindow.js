import React, {Component} from 'react';

import "./css/infoWindow.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faMap} from '@fortawesome/free-regular-svg-icons';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

// This class is a component that is automatically attached to any Marker component for Marker info display
class InfoWindow extends Component{
    constructor(props){
        super(props);

        this.markerWindowClick = this.markerWindowClick.bind(this);
    }

    // This function prevents any clicks on a Marker's InfoWindow from propagating to the Google Map resulting in a map click
    markerWindowClick(e){
        e.stopPropagation();
    }  

    render(){
        var editTag = null;
        if(this.props.editMarker){
            editTag =
            <span className="PlaceEditFont">
                (
                <span className="PlaceEditStyle" onClick={() => this.props.editMarker(this.props.place)}>
                    edit
                </span>
                )
            </span>
        }

        return(
            <div onClick={this.markerWindowClick}>
                <div className="InfoWindowTail"/>
                <div className="InfoWindowStyle">
                    <div className="closeInfoWindowStyle" onClick={this.props.closeInfoWindow}>
                        X
                    </div>

                    <div className="InfoWindowTitle">
                        {this.props.place.name}
                        
                        {editTag}
                    </div>

                    <div className="PlaceAddrContainer">
                        <div className="LocationIcon">
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        </div>
                        <div className="PlaceAddrStyle">
                            {this.props.place.addr} 
                        </div>
                        
                    </div>
                    
                    {this.props.place.description}
                </div>
            </div>
        )
    }
}

export default InfoWindow;