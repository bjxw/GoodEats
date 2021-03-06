// imported components
import {Component} from 'react';

// created components
import PlaceSearch from './placeSearch';
import PlaceList from './placeList';

// import stylesheets
import "./css/searchBox.css"

/*
    This class defines the SearchBox component which houses components related to map information and lookups.
    Refer to the component in map.js to see its usage.
*/
class SearchBox extends Component{

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
                    closeMarkerWindow={this.props.closeMarkerWindow}
                />

                <PlaceList
                    placeList={this.props.placeList}
                    openMarker={this.props.openMarker}
                    deleteMarker={this.props.deleteMarker}
                    addMarkerMode={this.props.addMarkerMode}
                />
            </div>
        )
    }
}

export default SearchBox;