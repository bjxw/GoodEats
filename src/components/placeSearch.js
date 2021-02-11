import {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';

class PlaceSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {address: ''};
    }
   
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then((results) => {
          return getLatLng(results[0]);
        })
        .then((latLng) => {
          console.log('Success', latLng);

          var marker = this.props.newMarker;
          marker.lat = latLng.lat;
          marker.lng = latLng.lng;
          this.props.showLocation(marker);
        })
        .catch(error => console.error('Error', error));
    };
   
    render() {
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
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />

              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#3bf2f5', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                      <hr/>
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