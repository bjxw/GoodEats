import {Component} from 'react';

import "./css/searchBox.css"

class SearchBox extends Component{
    constructor(props){
        super(props);
    }

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
                <input
                    className="SearchBarStyle"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter A Location"
                />
            </div>
        )
    }
}

export default SearchBox;