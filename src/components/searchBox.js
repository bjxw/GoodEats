import {Component} from 'react';

import PlaceSearch from './placeSearch';

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
                    showLocation={this.props.showLocation}
                />
            </div>
        )
    }
}

export default SearchBox;