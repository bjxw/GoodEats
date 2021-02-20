import {Component} from 'react';

import PlaceSearch from './placeSearch';
import PlaceList from './placeList';

import "./css/searchBox.css"

class SearchBox extends Component{
    // constructor(props){
    //     super(props);
    // }

    render(){
        var addMarkerButtonText = "Add Marker"
        if(this.props.addMarkerMode){
            addMarkerButtonText = "Cancel"
        }

        return(
            <div className="SearchBoxStyle">
                <button 
                    onClick={this.props.toggleMarkerMode}
                    className="ButtonStyle"
                >
                    {addMarkerButtonText}
                </button>

                <PlaceSearch
                    newMarker={this.props.newMarker}
                    showPlaceSearch={this.props.showPlaceSearch}
                    addMarkerMode={this.props.addMarkerMode}
                />

                <PlaceList
                    placeList={this.props.placeList}
                />
            </div>
        )
    }
}

export default SearchBox;