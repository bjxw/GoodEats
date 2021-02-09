import React from 'react'
import InfoWindow from './infoWindow'

const Marker = ({show, place}) => { //show and place props passed from map.js
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: show ? 'red' : 'blue',
        cursor: 'pointer',
        zIndex: 10,
    }

    return(
        <div>
            <div style={markerStyle}/>
            {show && <InfoWindow place={place}/>}
        </div>
    )
}

export default Marker;