import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'; //see https://github.com/google-map-react/google-map-react/blob/master/API.md

import Marker from './marker'; // Marker object used to track locations
import NewMarker from './newMarker';
import SearchBox from './searchBox';

import "./css/map.css"
import MapStyle from "./css/mapStyle"

class GoogleMap extends Component {
    constructor(props){
        super(props);

        //map methods
        this.toggleMarkerMode = this.toggleMarkerMode.bind(this);
        this.addNewMarker = this.addNewMarker.bind(this);
        this.submitMarker = this.submitMarker.bind(this);

        //existing marker methods
        this.openMarker = this.openMarker.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);

        this.closeInfoWindow = this.closeInfoWindow.bind(this);
        this.closeMarkerWindow = this.closeMarkerWindow.bind(this);

        this.editMarker = this.editMarker.bind(this);

        //location look-up methods
        this.showLocation = this.showLocation.bind(this);
        
        this.state = {
            markers: [
                {lat: 34.08421909476845, lng: -118.07298836096781, name:"In-N-Out", addr:"4242 Rosemead Blvd, Rosemead, CA 91770", description:"Cheap Meals", show: false, id: 0}, // in-n-out
                {lat: 34.07993604059942, lng: -118.08234390563354, name:"Bay Island", addr:"3927 Walnut Grove Ave #115, Rosemead, CA 91770", description:"Good Chinese Food", show: false, id: 1}, // bay island
                {lat: 34.07583050324687, lng: -118.07335314159903, name:"Bodhi Veggie Cuisine", addr:"3643 Rosemead Blvd, Rosemead, CA 91770", description:"Solid Vegetarian Options", show: false, id: 2}, // bodhi veggie cuisine
                {lat: 34.10543567839181, lng: -118.07300981856079, name:"Green Zone", addr:"5728 Rosemead Blvd unit 106, Temple City, CA 91780", description:"Bougie Organic Food", show: false, id: 3}, // green zone
                {lat: 34.0897531, lng: -118.0529848, name:"Popeyes", addr:"9744 Lower Azusa Rd, El Monte, CA 91731", description:"Chicken. Need I say more?", show: false, id: 4}, // popeyes
            ],

            //map bools
            addMarkerMode: false,
            showNewMarker: false,
            draggable: true,
            
            //new marker information
            newMarker: {lat: null, lng: null, name:"", description:"", show: false, id: null}
        }
    }

    //this method toggles whether a user can add a new marker to the map or not
    toggleMarkerMode(){
        var marker = this.state.newMarker;
        marker.lat = null;
        marker.lng = null;
        marker.show = false;
        
        this.closeInfoWindow();

        this.setState({newMarker: marker});
        this.setState({addMarkerMode: !this.state.addMarkerMode});
    }

    //this method adds a new marker to the map under the right condition
    addNewMarker(e){ // e = ({ x, y, lat, lng, event })
        if(this.state.addMarkerMode && !this.state.showNewMarker){ //checks for the marker mode by checking modes and making sure user isn't entering data
            console.log('addMarker() fired');

            this.closeInfoWindow();

            //create marker
            var newMarker = this.state.newMarker;
            newMarker.lat = e.lat;
            newMarker.lng = e.lng;
            newMarker.name = "";
            newMarker.description = "";
            newMarker.show = true;
            newMarker.id = this.state.markers.length;

            this.setState({showNewMarker: true});
            this.setState({newMarker: newMarker});
        }
    }

    //this method adds the submitted marker information and updates the map
    submitMarker(marker){
        console.log("submitMarker()");
        console.log(marker);
        var markers = this.state.markers;
        if(marker.id < markers.length){ //editing marker
            markers[marker.id] = marker;
        } else { //submit new marker
            markers = markers.concat(marker);
        }
        console.log(markers);
        
        var newMarker = this.state.newMarker;
        newMarker.show = false;

        this.setState({newMarker: newMarker});
        this.setState({showNewMarker: false});
        
        this.setState({markers});
        this.setState({addMarkerMode: false});
    }

    //this method open an infoWindow for the selected existing marker
    openMarker(marker){
        console.log('openMarker() fired');
        
        //close any possible windows for newMarker
        var newMarker = this.state.newMarker;
        newMarker.show = false;
        this.setState({newMarker: newMarker});
        this.setState({showNewMarker: false});

        var markers = this.state.markers;
        const index = markers.findIndex((e) => e.id === Number(marker));

        //search for the index matching the opened Marker
        for(var i = 0; i < markers.length; i++){
            if(i === index){ //index matches
                markers[i].show = !markers[i].show;
            } else { //close other markers
                markers[i].show = false;
            }
        }

        this.setState({markers});
    }

    //this method prevents the onclick method from bubbling up to parents
    markerWindowClick(e){ 
        e.stopPropagation();
    }

    closeInfoWindow(){
        var markers = this.state.markers;
        for(var i = 0; i < markers.length; i++){
            markers[i].show = false;
        }

        this.setState({markers: markers});
    }

    closeMarkerWindow(){
        var newMarker = this.state.newMarker;
        newMarker.show = false;
        
        this.setState({newMarker: newMarker});
        this.setState({showNewMarker: false});
    }

    editMarker(marker){
        console.log("editMarker()");
        //this.toggleMarkerMode();
        this.closeInfoWindow();
        this.setState({addMarkerMode: true});

        var newMarker = JSON.parse(JSON.stringify(marker));
        newMarker.show = true;
        newMarker.id = marker.id;
        console.log(newMarker);
        
        this.setState({showNewMarker: true});
        this.setState({newMarker: newMarker});
    }

    showLocation(marker){
        marker.show = true;

        this.closeInfoWindow();

        this.setState({showNewMarker: true});
        this.setState({newMarker: marker})
    }

    render(){
        const defaultCenter = { //Centered location for initial map render
            lat: 34.08070866379608,
            lng: -118.0738933692873
        }

        var mapStyle = null;
        if(this.state.addMarkerMode){
            mapStyle = MapStyle.styles
        }

        var mapOptions = {
            draggableCursor: 'pointer',
            styles: mapStyle
        }

        var markers = this.state.markers; // markers to map and render

        //renders the marker to be added
        var newMarker = null;
        if(this.state.showNewMarker){
            newMarker = <NewMarker
                lat = {this.state.newMarker.lat}
                lng = {this.state.newMarker.lng}
                place = {this.state.newMarker}
                show = {this.state.newMarker.show}
                addMarkerMode = {this.state.addMarkerMode}
                closeMarkerWindow = {this.closeMarkerWindow}
                submitMarker = {this.submitMarker}
                id = {this.state.newMarker.id || this.state.markers.length}
            />
        }

        console.log("React render()");
        console.log(this.state.markers);
        console.log(JSON.stringify(this.state.newMarker));
        return(
            <div className="MapStyle">
                {/*Main Google Map Component*/}
                <GoogleMapReact
                    bootstrapURLKeys={{key: ''}}
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    onClick={this.addNewMarker}
                    onChildClick={this.openMarker}
                    draggable={!this.state.showNewMarker}
                    options={mapOptions}
                >
                    {/*This block renders all existing markers from the database*/}
                    {markers.map((marker, index) => (
                        <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                            place={marker}
                            key={index}
                            closeInfoWindow={this.closeInfoWindow}
                            editMarker={this.editMarker}
                        />
                    ))}
              
                    {newMarker /*new marker icon*/}
                </GoogleMapReact>

                {/*Search bar to lookup existing data*/}
                <SearchBox
                    toggleMarkerMode={this.toggleMarkerMode}
                    addMarkerMode={this.state.addMarkerMode}
                    newMarker={this.state.newMarker}
                    showLocation={this.showLocation}
                />
            </div>
        );
    }
};

export default GoogleMap;

