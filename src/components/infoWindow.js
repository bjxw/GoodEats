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
                    <div className="closeWindowStyle" onClick={this.props.closeInfoWindow}>
                        X
                    </div>

                    {this.props.place.name} <br/>
                    {this.props.place.description}
                </div>
            </div>
        )
    }
}

export default InfoWindow;