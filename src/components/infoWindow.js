import React from 'react';

const InfoWindow = (props) =>{
    const {place} = props;
    const infoWindowStyle = {
        position: 'relative',
        bottom: 170,
        left: '-40px',

        width: 220,
        height: 105,

        backgroundColor: 'white',
        boxShadow: '2px 2px 7px 1px rgba(0, 0, 0, 0.3)',

        padding: 10,
        fontSize: 14,
        
        zIndex: 99,
    };

    const infoWindowTail = {
        position: 'relative',

        left: '-4px',
        bottom: 35,

        width: 20,
        height: 20,

        backgroundColor: 'white',
        boxShadow: '1px 1px rgba(0, 0, 0, 0.3)',
        transform: 'rotate(45deg)',

        zIndex: 100
    }

    return(
        <div>
            <div style={infoWindowTail}/>
            <div style={infoWindowStyle}>
                {place.id}: {place.name}
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