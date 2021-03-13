import React, {Component} from 'react';
import MarkerWindow from './markerWindow';
import InfoWindow from './infoWindow';

import "./css/newMarker.css";

/*
    This class defines the new Marker component on the map which has dual functionality: location lookup and Marker submission.
    This dual functionality is determined by the addMarkerMode() boolean in map.js.
    Depending on addMarkerMode(), an InfoWindow will be shown to display a location's information if looked up in the SearchBar
    or it will show a MarkerWindow which is the submission form used to add a new Marker to the Map
*/
class NewMarker extends Component{

    render(){
        var window = 
            // InfoWindow block
            <InfoWindow place={this.props.place} 
                closeInfoWindow={this.props.closeMarkerWindow}
            />
        if(this.props.addMarkerMode){ // Convert the InfoWindow to a MarkerWindow
            window = 
            <MarkerWindow place={this.props.place}
                closeMarkerWindow={this.props.closeMarkerWindow}
                submitMarker={this.props.submitMarker}
                id={this.props.id}
            />
        }
        return(
            <div>
                <div className={`NewMarkerStyle`}/>
                {this.props.place.show && window}
            </div>
        );
    }
}

export default NewMarker;