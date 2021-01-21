import {Component} from 'react';

class Marker extends Component{
    constructor(props){
        super(props);
        this.createPin = this.createPin.bind(this);
        this.state={
            lat: 0,
            lng: 0
        }
    }

    createPin(pos){
        this.state.lat = pos.lat;
        this.state.lng = pos.lng;
    }

    render(){
        return{
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
            fillColor: 'red',
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 2,
            scale: 1,
            lat: this.state.lat,
            lng: this.state.lng
        }
    }
}

export default Marker;