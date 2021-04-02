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
      // console.log("handleSelect() fired");
      // console.log(address) // name of restaurant
      const temp = document.createElement('div');
      const placesService = new window.google.maps.places.PlacesService(temp);

      geocodeByAddress(address)
      .then((results) => {
        //console.log(results); // formatted_address & place_id
        const request = {
          placeId: results[0].place_id,
          fields: ["formatted_address", "formatted_phone_number", "name", "opening_hours", "website"]
        }

        var marker = this.props.newMarker;
        //console.log(marker);
        placesService.getDetails(request, (place, status) => {
          //console.log(place);
          marker.name = place.name;

          marker.addr = place.formatted_address;
          marker.addr = marker.addr.substring(0, marker.addr.indexOf(", USA"));

          var hours = place.opening_hours.weekday_text;
          for(var i = 0; i < hours.length; i++){
            var hour = hours[i].substring(hours[i].indexOf(":") + 2);
            switch(i){
              case 0:
                hours.sunday = hour;
                break;
              case 1:
                hours.monday = hour;
                break;
              case 2:
                hours.tuesday = hour;
                break
              case 3:
                hours.wednesday = hour;
                break;
              case 4:
                hours.thursday = hour;
                break;
              case 5:
                hours.friday = hour;
                break;
              case 6:
                hours.saturday = hour
                break;
              default:
                hours = "";
            }
            delete hours[i];
          }
          marker.hours = hours;

          marker.phone = place.formatted_phone_number;
          marker.website = place.website;
          marker.description = "";
          console.log(marker);

          this.props.showPlaceSearch(marker);
        });
        //console.log(marker);
        return getLatLng(results[0]);
      })
      .then((results) => {
        console.log('Success', results);

        var marker = this.props.newMarker;
        marker.lat = results.lat;
        marker.lng = results.lng
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