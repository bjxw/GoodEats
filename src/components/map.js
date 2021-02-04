import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'; //see https://github.com/google-map-react/google-map-react/blob/master/API.md
import Marker from './marker';
import MarkerWindow from './markerWindow';

class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.toggleMarkerMode = this.toggleMarkerMode.bind(this);
        this.addNewMarker = this.addNewMarker.bind(this);
        this.submitMarker = this.submitMarker.bind(this);
        this.closeMarkerWindow = this.closeMarkerWindow.bind(this);
        this.openMarker = this.openMarker.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.state = {
            markers: [
                {lat: 34.08421909476845, lng: -118.07298836096781, name:"In-N-Out", description:"Cheap Meals", show: false, id: 0}, // in-n-out
                {lat: 34.07993604059942, lng: -118.08234390563354, name:"Bay Island", description:"Good Chinese Food", show: false, id: 1}, // bay island
                {lat: 34.07583050324687, lng: -118.07335314159903, name:"Bodhi Veggie Cuisine", description:"Solid Vegetarian Options", show: false, id: 2}, // bodhi veggie cuisine
                {lat: 34.10543567839181, lng: -118.07300981856079, name:"Green Zone", description:"Bougie Organic Food", show: false, id: 3}, // green zone
                {lat: 34.090687695735866, lng: -118.0529254379374, name:"Popeyes", description:"Chicken. Need I say more?", show: false, id: 4}, // popeyes
            ],

            addMarkerMode: false,
            showMarkerWindow: false,
            showNewMarker: false,
            newMarker: {lat: 0, lng: 0, name:"", description:"", show: false, id: null}
        }
    }

    toggleMarkerMode(){
        this.setState({addMarkerMode: !this.state.addMarkerMode})
    }

    addNewMarker(e){ // e = ({ x, y, lat, lng, event })
        if(this.state.addMarkerMode){
            console.log('addMarker() fired');

            var markers = this.state.markers;
            for(var i = 0; i < this.state.markers.length; i++){ //closes any opened info windows to reduce confusion
                markers[i].show = false;
            }

            //create marker
            var marker = this.state.newMarker;
            marker.lat = e.lat;
            marker.lng = e.lng;
            marker.id = this.state.markers.length;

            this.setState({newMarker: marker});
            this.setState({showNewMarker: true});
            this.setState({showMarkerWindow: true});
        }
    }

    submitMarker(marker){
        var markers = this.state.markers;
        markers = markers.concat(marker);
        this.setState({markers});
        this.setState({showMarkerWindow: false});
        this.setState({addMarkerMode: false});
    }

    closeMarkerWindow(){
        this.setState({showNewMarker: false})
        this.setState({showMarkerWindow: false});
    }

    openMarker(marker){
        console.log('openMarker() fired');
        var markers = this.state.markers;

        const index = markers.findIndex((e) => e.id === Number(marker));
        
        this.setState({showMarkerWindow: false});
        this.setState({showNewMarker: false});

        for(var i = 0; i < markers.length; i++){
            if(i === index){ //index matches
                markers[i].show = !markers[i].show;
            } else { //close other markers
                markers[i].show = false;
            }
        }

        this.setState({markers});
    }

    markerWindowClick(e){ //this method prevents the onclick method from bubbling up to parents
        e.stopPropagation();
    }

    render(){
        const defaultCenter = { //Centered location for initial map render
            lat: 34.08070866379608,
            lng: -118.0738933692873
        }

        var markers = this.state.markers; // markers to map and render

        var addMarkerButtonText = "Add Marker"
        if(this.state.addMarkerMode){
            addMarkerButtonText = "Cancel"
        }

        var newMarker = null;
        if(this.state.showNewMarker){
            newMarker = 
            <Marker
                lat = {this.state.newMarker.lat}
                lng = {this.state.newMarker.lng}
            />
        }

        var markerWindow = null;
        if(this.state.showMarkerWindow){ //render new marker window 
            markerWindow = 
            <MarkerWindow
                lat={this.state.newMarker.lat}
                lng={this.state.newMarker.lng}
                submitMarker={this.submitMarker}
                closeMarkerWindow={this.closeMarkerWindow}
                index={this.state.markers.length}
            />
        }

        return(
            <div style={{height: '95vh', width: '90vw'}}>
                <button onClick={this.toggleMarkerMode}>
                    {addMarkerButtonText}
                </button>
                <GoogleMapReact
                    bootstrapURLKeys={{key: ''}}
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    onClick={this.addNewMarker}
                    onChildClick={this.openMarker}
                    options={{draggableCursor:'pointer'}}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                            place={marker}
                            show={marker.show}
                            key={index}
                        />
                    ))}

              
                    {newMarker}
                    {markerWindow}
                </GoogleMapReact>
            </div>
        );
    }
};

export default GoogleMap;

