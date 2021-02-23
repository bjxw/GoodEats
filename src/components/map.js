import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'; //see https://github.com/google-map-react/google-map-react/blob/master/API.md

import Marker from './marker'; // Marker object used to track locations
import NewMarker from './newMarker'; // Separate Marker used for place lookup or new marker submission
import SearchBox from './searchBox'; // Window attached to map for adding markers, place lookup, and place list

import "./css/map.css"
import MapStyle from "./css/mapStyle"

class GoogleMap extends Component {
    constructor(props){
        super(props);

        //map methods
        this.toggleMarkerMode = this.toggleMarkerMode.bind(this);
        this.addNewMarker = this.addNewMarker.bind(this);
        this.submitMarker = this.submitMarker.bind(this);
        this.filterPlaces = this.filterPlaces.bind(this);

        //existing marker methods
        this.openMarker = this.openMarker.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);

        this.closeInfoWindow = this.closeInfoWindow.bind(this);
        this.closeMarkerWindow = this.closeMarkerWindow.bind(this);

        //location look-up methods
        this.showPlaceSearch = this.showPlaceSearch.bind(this);
        
        this.state = {
            //list of existing markers on the map
            markers: [
                {lat: 34.08421909476845, lng: -118.07298836096781, name:"In-N-Out", description:"Cheap Meals", show: false, id: 0}, // in-n-out
                {lat: 34.07993604059942, lng: -118.08234390563354, name:"Bay Island", description:"Good Chinese Food", show: false, id: 1}, // bay island
                {lat: 34.07583050324687, lng: -118.07335314159903, name:"Bodhi Veggie Cuisine", description:"Solid Vegetarian Options", show: false, id: 2}, // bodhi veggie cuisine
                {lat: 34.10543567839181, lng: -118.07300981856079, name:"Green Zone", description:"Bougie Organic Food", show: false, id: 3}, // green zone
                {lat: 34.0897531, lng: -118.0529848, name:"Popeyes", description:"Chicken. Need I say more?", show: false, id: 4}, // popeyes
            ],

            placeList:[], //list of markers to be shown on the map *references markers above and is not a copy

            //map bools
            addMarkerMode: false,
            showNewMarker: false,
            
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
        if(this.state.addMarkerMode){ //checks for the marker mode otherwise no-op
            console.log('addMarker() fired');

            this.closeInfoWindow();

            //create marker
            var newMarker = this.state.newMarker;
            newMarker.lat = e.lat;
            newMarker.lng = e.lng;
            newMarker.show = true;
            newMarker.id = this.state.markers.length;

            this.setState({showNewMarker: true});
            this.setState({newMarker: newMarker});
        }
    }

    //this method adds the submitted marker information and updates the map
    submitMarker(marker){
        var markers = this.state.markers;
        markers = markers.concat(marker);

        var newMarker = this.state.newMarker;
        newMarker.show = false;
        this.setState({newMarker: newMarker});
        
        this.setState({markers});
        this.setState({addMarkerMode: false});
        this.setState({showNewMarker: false});
        this.filterPlaces();
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
                console.log(markers);
                console.log(this.state.placeList);
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

    showPlaceSearch(marker){
        marker.show = true;

        this.closeInfoWindow();

        this.setState({showNewMarker: true});
        this.setState({newMarker: marker})
    }

    filterPlaces(e){
        //console.log("filterPlaces() fired");
        var floor = e.bounds.nw;
        var ceil = e.bounds.se;

        // handles x-lat coordinate
        if(floor.lat > ceil.lat){
            let temp = ceil.lat;
            ceil.lat = floor.lat;
            floor.lat = temp;
        }

        // handles y-lng coordinate
        if(floor.lng > ceil.lng){
            let temp = ceil.lng;
            ceil.lng = floor.lng;
            floor.lng = temp;
        }
        // console.log(floor);
        // console.log(ceil);

        var markers = this.state.markers;
        var placeList = [];
        for(var i = 0; i < markers.length; i++){ //check if the marker should be added to the list
            if(markers[i].lat > floor.lat && markers[i].lat < ceil.lat){
                if(markers[i].lng > floor.lng && markers[i].lng < ceil.lng){ 
                    placeList = placeList.concat(markers[i]); //add marker to visible list if passes both checks
                }
            }
        }
        //console.log(placeList);
        this.setState({placeList: placeList});
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
                index = {this.state.markers.length}
            />
        }

        return(
            <div className="MapStyle">
                {/*Main Google Map Component*/}
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'API_KEY_HERE'}}
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    onClick={this.addNewMarker}
                    onChildClick={this.openMarker}
                    onChange={this.filterPlaces}
                    options={mapOptions}
                >
                    {/*This block renders all existing markers from the database*/}
                    {markers.map((marker, index) => (
                        <Marker
                            lat={marker.lat}
                            lng={marker.lng}
                            place={marker}
                            show={marker.show}
                            key={index}
                            closeInfoWindow={this.closeInfoWindow}
                        />
                    ))}
              
                    {newMarker /*new marker icon*/}
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

