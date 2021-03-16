import {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'; //see https://github.com/hibiken/react-places-autocomplete

import "./css/placeSearch.css";

/*
  This class defines the PlaceSearch component which functions as a search bar that allows users to
  either look up a location or use a location to autofill a new Marker's information in addMarkerMode().
*/
class PlaceSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: ''
      };
    }
   
    // This method fills the address field acquired from react-places-autocomplete
    handleChange = address => {
      this.setState({ address });
    };
   
    /*
      This method handles the selection of a location in the list. This functions
      by taking the address and passing it through Google API to fetch further
      information. It then stores this information and passes it back to
      newMarker in map.js
    */
    handleSelect = address => {
      var marker = this.props.newMarker;
      marker.name = address.split(',')[0];
      marker.description = "";
      // this.props.showPlaceSearch(marker);
      geocodeByAddress(address)
      .then((results) => {
        console.log(results);
        marker.addr = results[0].formatted_address;
        marker.addr = marker.addr.substring(0, marker.addr.indexOf(", USA"));
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        console.log('Success', latLng);

        //var marker = this.props.newMarker;
        marker.lat = latLng.lat;
        marker.lng = latLng.lng;
        console.log(marker);
        this.props.showPlaceSearch(marker);
      })
      .catch(error => console.error('Error', error));

      this.setState({address: ''});
    };
   
    render() {
      var searchBoxPlaceholder = 'Find A Place ...';
      if(this.props.addMarkerMode){
        searchBoxPlaceholder = 'Add A Place ...';
      }
      return (
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: searchBoxPlaceholder,
                  className: 'location-search-input PlaceInputStyle',
                })}
              />

              <div className="autocomplete-dropdown-container PlaceDropdownStyle">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // This style colors results in the search list
                  const style = suggestion.active
                    ? { backgroundColor: '#3bf2f5', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                      key={suggestion.description}
                      className="DropdownPlaceStyle"
                    >
                      <span>{suggestion.description}</span>
                      <hr className="DropdownBreakStyle"/>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      );
    }
  }

  export default PlaceSearch;