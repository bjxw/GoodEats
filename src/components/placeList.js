import React, {Component} from 'react';

import "./css/placeList.css";

// See https://fontawesome.com/how-to-use/on-the-web/using-with/react for icon usage
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faLeaf} from '@fortawesome/free-solid-svg-icons';

/*
    This class defines the PlaceList component meant to show visible Markers on the Map.
    The PlaceList is passed from map.js and converts the array into a list under the SearchBox.
    To see how this component is used see searchBox.js
*/
class PlaceList extends Component{
    constructor(props){
        super(props);

        this.state = {
            markerToDel: "",
            toDelete: false
        }

        this.chooseMarker = this.chooseMarker.bind(this);
        this.deleteConfirm = this.deleteConfirm.bind(this);
        this.deleteCancel = this.deleteCancel.bind(this);
        this.deleteMarker = this.deleteMarker.bind(this);
    }

    // This method allows users to click on a location in the list and highlight the respective Marker on the Map
    chooseMarker(e){
        this.props.openMarker(e.target.id);
    }
    
    deleteConfirm(marker){
        this.setState({markerToDel: marker}, () => {
            this.setState({toDelete: true});
        });
    }

    deleteCancel(){
        this.setState({toDelete: false});
    }

    deleteMarker(marker){
        this.props.deleteMarker(marker);
        this.deleteCancel();
    }

    render(){
        var placeList = this.props.placeList;
        //console.log(placeList);

        var trashIcon = null;
        if(!this.props.addMarkerMode){
            trashIcon = <FontAwesomeIcon icon={faTrashAlt}/>;
        }

        var confirmWindow = 
        <div className={`ConfirmContainer ${this.state.toDelete ? "": "Hide"}`}>
             <div className="ConfirmWindowStyle">
                <div className="ConfirmText">
                    Are you sure you want to delete {this.state.markerToDel.name}?
                </div>
                <hr className="ConfirmDivide"/>

                <div 
                    className="ConfirmYes"
                    onClick={() => this.deleteMarker(this.state.markerToDel)}
                >
                    Yes
                </div>
                <div 
                    className="ConfirmNo"
                    onClick={this.deleteCancel}
                >
                    No
                </div>
            </div>
        </div>
    
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
                            <div className={`LeafIcon ${marker.isVeggie ? "": "Hide"}`}>
                                {<FontAwesomeIcon icon={faLeaf}/>}
                            </div>

                            <div
                                className="PlaceName"
                                onClick={this.chooseMarker}
                                
                                id={marker.id} //passes id for marker index
                            >
                                {marker.name}
                            </div>

                            <div 
                                className="FloatTrash"
                                onClick={() => this.deleteConfirm(marker)}
                            >
                                {trashIcon}
                            </div>
                        </div>
                    </div>
                ))}
                {confirmWindow}
            </div>
        )
    }
}

export default PlaceList;