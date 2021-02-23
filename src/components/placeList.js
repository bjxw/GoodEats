import React, {Component} from 'react';

import "./css/placeList.css";

class PlaceList extends Component{
    constructor(props){
        super(props);

        this.state = {
            place:""
        }

        this.chooseMarker = this.chooseMarker.bind(this);
    }

    chooseMarker(e){
        this.props.openMarker(e.target.id);
    }

    render(){
        var placeList = this.props.placeList
        return(
            <div>
                <span className="PlaceListHeader">
                    Places You're Seeing
                </span>
                <hr className="PlaceListDivide"/>
                {placeList.map((marker) => (
                    <div 
                        className={`PlaceEntry ${marker.show ? "active": ""}`}
                        onClick={this.chooseMarker}
                        key={marker.id} //required to prevent map errors
                        id={marker.id} //passes id for marker index
                    >
                        {marker.name}
                    </div>
                    ))}
            </div>
        )
    }
}

export default PlaceList;