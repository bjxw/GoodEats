import React, {Component} from 'react';

import "./css/infoWindow.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {faMapMarkerAlt, faPhoneAlt, faGlobe, faStickyNote, faLeaf} from '@fortawesome/free-solid-svg-icons';

// This class is a component that is automatically attached to any Marker component for Marker info display
class InfoWindow extends Component{
    constructor(props){
        super(props);

        this.markerWindowClick = this.markerWindowClick.bind(this);
    }

    // This function prevents any clicks on a Marker's InfoWindow from propagating to the Google Map resulting in a map click
    markerWindowClick(e){
        e.stopPropagation();
    }  

    render(){
        var editTag = null;
        if(this.props.editMarker){
            editTag =
            <span className="PlaceEditFont">
                (
                <span className="PlaceEditStyle" onClick={() => this.props.editMarker(this.props.place)}>
                    edit
                </span>
                )
            </span>
        }

        var date = new Date().getDay() - 1;
        if(date === -1) date = 6;
        var todaysHours;
        if(this.props.place.hours){
             switch(date){
                case 0:
                    todaysHours = this.props.place.hours.sunday;
                    break;
                case 1:
                    todaysHours = this.props.place.hours.monday;
                    break;
                case 2:
                    todaysHours = this.props.place.hours.tuesday;
                    break;
                case 3:
                    todaysHours = this.props.place.hours.wednesday;
                    break;
                case 4:
                    todaysHours = this.props.place.hours.thursday;
                    break;
                case 5:
                    todaysHours = this.props.place.hours.friday;
                    break;
                case 6:
                    todaysHours = this.props.place.hours.saturday;
                    break;
                default:
                    todaysHours="";
            }
        }
        
        return(
            <div onClick={this.markerWindowClick}>
                <div className="InfoWindowTail"/>
                <div className="InfoWindowStyle">
                    <div className="closeInfoWindowStyle" onClick={this.props.closeInfoWindow}>
                        X
                    </div>

                    <div className="InfoWindowTitle">
                        {this.props.place.name}
                        
                        {editTag}
                    </div>

                    <div className="PlaceInfoContainer">
                        {this.props.place.addr && 
                            <div className="PlaceInfoLabel">
                                <div className="Icon">
                                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                </div>
                                <div className="PlaceInfoStyle">
                                    {this.props.place.addr} 
                                </div>
                            </div>
                        }
                        

                        {todaysHours &&
                            <div className="PlaceInfoLabel">
                                <div className="Icon">
                                    <FontAwesomeIcon icon={faClock}/>
                                </div>
                                <div className="PlaceInfoStyle">
                                    {todaysHours}
                                </div>
                            </div>
                        }
                        
                        {this.props.place.phone &&
                            <div className="PlaceInfoLabel">
                                <div className="Icon">
                                    <FontAwesomeIcon icon={faPhoneAlt}/>
                                </div>
                                <div className="PlaceInfoStyle">
                                    {this.props.place.phone}
                                </div>
                            </div>
                        }
                        
                        {this.props.place.website && 
                            <div className="PlaceInfoLabel">
                                <div className="Icon">
                                    <FontAwesomeIcon icon={faGlobe}/>
                                </div>
                                <div className="PlaceInfoStyle">
                                    {this.props.place.website}
                                </div>
                            </div>
                        }
                        
                        {this.props.place.description &&
                            <div className="PlaceInfoLabel">
                                <div className="Icon">
                                    <FontAwesomeIcon icon={faStickyNote}/>
                                </div>
                                <div className="PlaceInfoStyle">
                                    {this.props.place.description}
                                </div>
                            </div>
                        }
                        

                        {this.props.place.isVeggie &&
                            <div className="PlaceInfoLabel">
                                <div className="Icon">
                                    <FontAwesomeIcon icon={faLeaf} size="sm"/>
                                </div>
                                <div className="PlaceInfoStyle">
                                    <div>Vegetarian Options Available</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoWindow;