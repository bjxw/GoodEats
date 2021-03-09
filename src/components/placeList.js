import React, {Component} from 'react';

import "./css/placeList.css";

// See https://fontawesome.com/how-to-use/on-the-web/using-with/react for icon usage
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

/*
    This class defines the PlaceList component meant to show visible Markers on the Map.
    The PlaceList is passed from map.js and converts the array into a list under the SearchBox.
    To see how this component is used see searchBox.js
*/
class PlaceList extends Component{
    constructor(props){
        super(props);

        this.state = {
            place:""
        }

        this.chooseMarker = this.chooseMarker.bind(this);
    }

    // This method allows users to click on a location in the list and highlight the respective Marker on the Map
    chooseMarker(e){
        this.props.openMarker(e.target.id);
    }
    

    render(){
        var placeList = this.props.placeList;
        const trashIcon = <FontAwesomeIcon icon={faTrashAlt}/>
        return(
            <div>
                <span className="PlaceListHeader">
                    Places You're Seeing
                </span>
                <hr className="PlaceListDivide"/>
                {placeList.map((marker) => (
                    <div 
                        className={`PlaceEntry ${marker.show ? "active": ""}`}
                        key={marker.id} //required to prevent map errors
                    >
                        <div className="PlaceContainer">
                            <div
                                className="PlaceName"
                                onClick={this.chooseMarker}
                                
                                id={marker.id} //passes id for marker index
                            >
                                {marker.name}
                            </div>
                            <div 
                                className="FloatTrash"
                                onClick={() => this.props.deleteMarker(marker)}
                            >
                                {trashIcon}
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
        )
    }
}

export default PlaceList;