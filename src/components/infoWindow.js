import React from 'react';

import "./css/infoWindow.css";

const InfoWindow = (props) =>{
    const {place} = props;

    return(
        <div>
            <div className="InfoWindowTail"/>
            <div className="InfoWindowStyle">
                {place.id}: {place.name} <br/>
                {place.description}
            </div>
        </div>
    );
}

export default InfoWindow;

/* <div style={{ fontSize: 16 }}>
    {place.name}
</div>
<div style={{ fontSize: 14 }}>
    <span style={{ color: 'grey' }}>
    {place.rating}
    {' '}
    </span>
    <span style={{ color: 'orange' }}>
    {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
    </span>
    <span style={{ color: 'lightgrey' }}>
    {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
    </span>
</div>
<div style={{ fontSize: 14, color: 'grey' }}>
    {place.types[0]}
</div>
<div style={{ fontSize: 14, color: 'grey' }}>
    {'$'.repeat(place.price_level)}
</div>
<div style={{ fontSize: 14, color: 'green' }}>
    {place.opening_hours.open_now ? 'Open' : 'Closed'}
</div> */