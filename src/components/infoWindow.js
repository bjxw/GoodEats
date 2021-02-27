import React, {Component} from 'react';

import "./css/infoWindow.css";

class InfoWindow extends Component{
    constructor(props){
        super(props);

        this.markerWindowClick = this.markerWindowClick.bind(this);
    }

    markerWindowClick(e){
        e.stopPropagation();
    }  

    render(){
        return(
            <div onClick={this.markerWindowClick}>
                <div className="InfoWindowTail"/>
                <div className="InfoWindowStyle">
                    <div className="closeInfoWindowStyle" onClick={this.props.closeInfoWindow}>
                        X
                    </div>

                    <div>
                        <span className="PlaceNameStyle">
                            {this.props.place.name}
                        </span>
                        
                        <span className="PlaceEditFont">
                            (
                            <span className="PlaceEditStyle" onClick={() => this.props.editMarker(this.props.place)}>edit</span>
                            )
                        </span>
                        
                    </div>

                    <div className="PlaceAddrStyle">
                        {this.props.place.addr} 
                    </div>
                    
                    {this.props.place.description}
                </div>
            </div>
        )
    }
}

export default InfoWindow;