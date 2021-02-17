import React from 'react';

import "./css/infoWindow.css";

const InfoWindow = (props) =>{
    const {place} = props;

    return(
        <div>
            <div className="InfoWindowTail"/>
            <div className="InfoWindowStyle">
                {place.name} <br/>
                {place.description}
            </div>
        </div>
    );
}

export default InfoWindow;