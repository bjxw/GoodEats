import React, {Component} from 'react';

import "./css/infoWindow.css";

// This class is a component that is automatically attached to any Marker component for Marker info display
class InfoWindow extends Component{
    constructor(props){
        super(props);

        this.markerWindowClick = this.markerWindowClick.bind(this);

        // Passed through from marker.js and newMarker.js
        this.closeInfoWindow = this.props.closeInfoWindow;

        this.state = {
            place: this.props.place
        }
    }

    // This function prevents any clicks on a Marker's InfoWindow from propagating to the Google Map resulting in a map click
    markerWindowClick(e){
        e.stopPropagation();
    }  

    render(){
        return(
            <div onClick={this.markerWindowClick}>
                <div className="InfoWindowTail"/>
                <div className="InfoWindowStyle">
                    <div className="closeInfoWindowStyle" onClick={this.closeInfoWindow}>
                        X
                    </div>

                    <div>
                        <span className="PlaceNameStyle">
                            {this.state.place.name}
                        </span>
                        
                        <span className="PlaceEditFont">
                            (
                            <span className="PlaceEditStyle" onClick={() => this.props.editMarker(this.state.place)}>edit</span>
                            )
                        </span>
                        
                    </div>

                    <div className="PlaceAddrStyle">
                        {this.state.place.addr} 
                    </div>
                    
                    {this.state.place.description}
                </div>
            </div>
        )
    }
}

export default InfoWindow;