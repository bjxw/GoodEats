import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'; //see https://github.com/google-map-react/google-map-react/blob/master/API.md

import Marker from './marker'; // Marker object used to track locations
import NewMarker from './newMarker'; // Separate Marker used for place lookup or new marker submission
import SearchBox from './searchBox'; // Window attached to map for adding markers, place lookup, and place list

import "./css/map.css";
import MapStyle from "./css/mapStyle";

// This class is the entire Google Map application and contains a majority of the functioning components and methods
class GoogleMap extends Component {
    constructor(props){
        super(props);

        // Map methods
        this.toggleMarkerMode = this.toggleMarkerMode.bind(this);
        this.addNewMarker = this.addNewMarker.bind(this);
        this.submitMarker = this.submitMarker.bind(this);
        this.filterPlaces = this.filterPlaces.bind(this);

        // Existing Marker methods
        this.openMarker = this.openMarker.bind(this);

        this.closeInfoWindow = this.closeInfoWindow.bind(this);
        this.closeMarkerWindow = this.closeMarkerWindow.bind(this);

        this.editMarker = this.editMarker.bind(this);

        // Location look-up methods
        this.showPlaceSearch = this.showPlaceSearch.bind(this);
        
        this.state = {
            // List of existing Markers on the Map
            markers: [
                {lat: 34.08421909476845, lng: -118.07298836096781, name:"In-N-Out", addr:"4242 Rosemead Blvd, Rosemead, CA 91770", description:"Cheap Meals", show: false, id: 0}, // in-n-out
                {lat: 34.07993604059942, lng: -118.08234390563354, name:"Bay Island", addr:"3927 Walnut Grove Ave #115, Rosemead, CA 91770", description:"Good Chinese Food", show: false, id: 1}, // bay island
                {lat: 34.07583050324687, lng: -118.07335314159903, name:"Bodhi Veggie Cuisine", addr:"3643 Rosemead Blvd, Rosemead, CA 91770", description:"Solid Vegetarian Options", show: false, id: 2}, // bodhi veggie cuisine
                {lat: 34.10543567839181, lng: -118.07300981856079, name:"Green Zone", addr:"5728 Rosemead Blvd unit 106, Temple City, CA 91780", description:"Bougie Organic Food", show: false, id: 3}, // green zone
                {lat: 34.0897531, lng: -118.0529848, name:"Popeyes", addr:"9744 Lower Azusa Rd, El Monte, CA 91731", description:"Chicken. Need I say more?", show: false, id: 4}, // popeyes
            ],

            placeList:[], // List of Markers to be shown on the Map *entries are references to the Markers array above
            bounds:{}, // Bounds variable stored to enable filterPlaces() to be called outside of the Map

            // Map bools
            addMarkerMode: false, // Boolean that determines whether or not users can add a Marker
            showNewMarker: false, // Boolean that determines whether or not to display a location/new Marker the user would like to add on the Map
            draggable: true, // Boolean that locks the Map from being dragged or interacted with during Window events
            
            // New marker information stored for locations looked up or new Markers in addMarkerMode
            newMarker: {lat: null, lng: null, name:"", addr:"", description:"", show: false, id: null}
        }
    }

    // This method toggles whether a user can add a new Marker to the Map or not
    toggleMarkerMode(){
        //console.log("toggleMarkerMode() fired");
        var marker = this.state.newMarker;
        marker.lat = null;
        marker.lng = null;
        marker.show = false;
        
        this.closeInfoWindow();

        this.setState({showNewMarker: false}); // Always removes any visible new Markers
        this.setState({newMarker: marker}); // Set the newMarker to a blank, non-visible state for further actions
        this.setState({addMarkerMode: !this.state.addMarkerMode}); // Simply flips the state of editing or not
    }

    // This method adds a new Marker to the Map
    addNewMarker(e){ // e = ({ x, y, lat, lng, event })
        if(this.state.addMarkerMode && !this.state.showNewMarker){ // Checks if the user is in addMarkerMode and not currently working on a new Marker already
            //console.log('addMarker() fired');

            this.closeInfoWindow();

            //create blank slate Marker
            var newMarker = this.state.newMarker;
            newMarker.lat = e.lat;
            newMarker.lng = e.lng;
            newMarker.name = "";
            newMarker.addr = "";
            newMarker.description = "";
            newMarker.show = true;
            newMarker.id = this.state.markers.length;

            this.setState({showNewMarker: true}); // Make the Marker visible
            this.setState({newMarker: newMarker}); // Make sure new Marker info is blank for entries
        }
    }

    // This method adds the submitted Marker to the Map
    submitMarker(marker){ // marker = Marker object *see ./marker.js
        //console.log("submitMarker() fired");

        var markers = this.state.markers;
        if(marker.id < markers.length){ // Edit an existing Marker
            markers[marker.id] = marker;
        } else { // Submit a new Marker
            markers = markers.concat(marker);
        }
        
        // var newMarker = this.state.newMarker;
        // newMarker.show = false;

        // this.setState({newMarker: newMarker});
        this.setState({showNewMarker: false}); // Hide the Marker after submission

        this.setState({addMarkerMode: false}); // Exit addMarkerMode
        this.setState({markers: markers}, () => this.filterPlaces(this.state.bounds)); // Update visible placeList after Marker submission
    }

    // This method opens an InfoWindow for the selected Marker
    openMarker(marker){
        //console.log('openMarker() fired');
        
        // Close any possible Window for newMarker
        var newMarker = this.state.newMarker;
        newMarker.show = false;
        this.setState({newMarker: newMarker});
        this.setState({showNewMarker: false});

        var markers = this.state.markers;
        const index = markers.findIndex((e) => e.id === Number(marker)); // Get the index of the Marker to open

        // Search for the index matching the opened Marker
        for(var i = 0; i < markers.length; i++){
            if(i === index){ // Index matches
                markers[i].show = !markers[i].show;
            } else { // Close all other markers
                markers[i].show = false;
            }
        }

        this.setState({markers});
    }

    // This methods closes all open InfoWindows
    closeInfoWindow(){
        var markers = this.state.markers;
        for(var i = 0; i < markers.length; i++){
            markers[i].show = false;
        }

        this.setState({markers: markers});
    }

    // This method closes the InfowWindow for newMarker
    closeMarkerWindow(){
        var newMarker = this.state.newMarker;
        newMarker.show = false;
        
        this.setState({newMarker: newMarker});
        this.setState({showNewMarker: false});
    }

    // This method allows for the editing of existing Markers
    editMarker(marker){
        //console.log("editMarker() fired");
        this.closeInfoWindow();
        this.setState({addMarkerMode: true});

        var newMarker = marker;
        newMarker.show = true;
        newMarker.id = marker.id;
        //console.log(newMarker);
        
        this.setState({showNewMarker: true});
        this.setState({newMarker: newMarker});
    }

    // This method places a green location Marker for a place a user has looked up in the SearchBar
    showPlaceSearch(marker){
        marker.show = true;

        this.closeInfoWindow();

        this.setState({showNewMarker: true});
        this.setState({newMarker: marker});
    }

    // This method filters the current Markers within the visible bounds to display as visible places in the SearchBar
    filterPlaces(bounds){
        console.log("filterPlaces() fired");
        //console.log(bounds);
        console.log(this.state.markers);
        this.setState({bounds: bounds}); // Update bounds to the current one
        var floor = bounds.nw; // Determines the lower coordinate values
        var ceil = bounds.se; // Determines the higher coordinate values

        // Handles x-lat coordinate
        if(floor.lat > ceil.lat){
            let temp = ceil.lat;
            ceil.lat = floor.lat;
            floor.lat = temp;
        }

        // Handles y-lng coordinate
        if(floor.lng > ceil.lng){
            let temp = ceil.lng;
            ceil.lng = floor.lng;
            floor.lng = temp;
        }
        // console.log(floor);
        // console.log(ceil);

        var markers = this.state.markers;
        var placeList = [];
        for(var i = 0; i < markers.length; i++){ // Check if the Marker should be added to the list
            if(markers[i].lat > floor.lat && markers[i].lat < ceil.lat){
                if(markers[i].lng > floor.lng && markers[i].lng < ceil.lng){ // Passes both bounds check
                    placeList = placeList.concat(markers[i]);
                }
            }
        }

        this.setState({placeList: placeList});
    }

    render(){
        const defaultCenter = { // Centered location for initial Map render
            lat: 34.08070866379608,
            lng: -118.0738933692873
        }

        // This block below applies Map styles to indicate mode change
        var mapStyle = null;
        if(this.state.addMarkerMode){
            mapStyle = MapStyle.styles
        }

        // Applies specified options to the Map
        var mapOptions = {
            draggableCursor: 'pointer',
            styles: mapStyle
        }

        var markers = this.state.markers; // Markers to render on the Map

        // This block establishes the new Marker which is used interchangeably as a location Marker and a new Marker
        var newMarker = null;
        if(this.state.showNewMarker){
            newMarker = <NewMarker
                lat = {this.state.newMarker.lat}
                lng = {this.state.newMarker.lng}
                place = {this.state.newMarker}
                addMarkerMode = {this.state.addMarkerMode}
                closeMarkerWindow = {this.closeMarkerWindow}
                submitMarker = {this.submitMarker}
                id = {this.state.newMarker.id >= 0 ? this.state.newMarker.id : this.state.markers.length} // Include index 0 otherwise results in array addition
            />
        }

        //console.log("React render()");
        //console.log(this.state.markers);
        //console.log(JSON.stringify(this.state.newMarker));
        return(
            <div className="MapStyle">
                {/*Main Google Map Component*/}
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'API_KEY_HERE'}}
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    onClick={this.addNewMarker}
                    onChildClick={this.openMarker}
                    draggable={!this.state.showNewMarker}
                    onChange={(e) => this.filterPlaces(e.bounds)}
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
              
                    {newMarker /*New Marker*/}
                </GoogleMapReact>

                {/*Search bar to lookup existing data*/}
                <SearchBox
                    toggleMarkerMode={this.toggleMarkerMode}
                    addMarkerMode={this.state.addMarkerMode}
                    newMarker={this.state.newMarker}
                    showPlaceSearch={this.showPlaceSearch}
                    placeList={this.state.placeList}
                    openMarker={this.openMarker}
                />
            </div>
        );
    }
};

export default GoogleMap;