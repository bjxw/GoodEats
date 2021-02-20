import React, {Component} from 'react';

import "./css/placeList.css";

class PlaceList extends Component{
    render(){
        var placeList = this.props.placeList
        return(
            <div>
                <span className="PlaceListHeader">
                    Places You're Seeing
                </span>
                <hr/>
                {placeList.map((marker, index) => (
                    <div key={index}>
                        {marker.name}
                    </div>
                    ))}
            </div>
        )
    }
}

export default PlaceList;