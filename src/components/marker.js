import React, {Component} from 'react';
import InfoWindow from './infoWindow';

import "./css/marker.css";

class Marker extends Component{
    render(){
        return(
            <div>
                <div className="MarkerStyle"/>
                {this.props.show && <InfoWindow place={this.props.place}/>}
            </div>
        )
    }
}

export default Marker;