import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './marker';

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
                    bootstrapURLKeys={{key: 'AIzaSyAfrPjevhok2PCbpj__UOeHKxSo5P1KXRg'}}
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
