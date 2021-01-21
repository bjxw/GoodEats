import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react' //Google map package
import Marker from './marker'; //Marker component
require('dotenv').config()


class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.markerClick = this.markerClick.bind(this);
    }

    markerClick(position) {
        var markerPos = {
            lat: position.lat,
            lng: position.lng
        }
        console.log(position);
        console.log(markerPos);
    }

    static defaultProps = {
        center: {
            lat: 34.08,
            lng: -118.07
        },
        zoom: 12
    }

    render(){
        return(
            <div style={{height: '90vh', width: '90%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_API_KEY}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onClick={this.markerClick}
                >

                </GoogleMapReact>
            </div>
        );
    }
};

export default GoogleMap;
