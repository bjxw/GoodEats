// imported components
import {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'; //see https://github.com/hibiken/react-places-autocomplete

// imported stylesheets
import "./css/placeSearch.css";

/*
  This class defines the PlaceSearch component which functions as a search bar that allows users to
  either look up a location or use a location to autofill a new Marker's information in addMarkerMode().
*/
class PlaceSearch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        address: '',
        marker: this.props.newMarker
      };

      this.handleChange = this.handleChange.bind(this);
      this.hoursToObject = this.hoursToObject.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
    }
   
    // This method fills the address field acquired from react-places-autocomplete
    handleChange = address => {
      this.setState({ address });
    };

    hoursToObject(hours){
      console.log("hoursToObject() fired");
      //console.log(hours);
      var newHours = {};
      for(var i = 0; i < hours.length; i++){
        var hour = hours[i].substring(hours[i].indexOf(":") + 2);
        switch(i){
          case 0:
            newHours.sunday = hour
            break;
          case 1:
            newHours.monday = hour
            break;
          case 2:
            newHours.tuesday = hour;
            break
          case 3:
            newHours.wednesday = hour;
            break;
          case 4:
            newHours.thursday = hour;
            break;
          case 5:
            newHours.friday = hour;
            break;
          case 6:
            newHours.saturday = hour
            break;
          default:
            hours = "";
        }
      }
      return newHours;
    }

    /*
      This method handles the selection of a location in the list. This functions
      by taking the address and passing it through Google API to fetch further
      information. It then stores this information and passes it back to
      newMarker in map.js
    */
    handleSelect = address => { //address = name of restaurant
      // console.log("handleSelect() fired");
      // instantiate Goolge Places service
      const temp = document.createElement('div');
      const placesService = new window.google.maps.places.PlacesService(temp);

      var marker = this.state.marker;
      //this.props.closeMarkerWindow();

      geocodeByAddress(address) // address = name of the place
      .then((results) => { // results = array of information but only place_id is used
        var placeId = results[0].place_id;

        // request defines the ID of a place and fields to be pulled from Google Places
        const request = {
          placeId: placeId,
          fields: ["formatted_address", "formatted_phone_number", "name", "opening_hours", "website"]
        }

        placesService.getDetails(request, (place, status) => { // place = {request.fields}
          //console.log(place);
          marker.name = place.name;

          marker.addr = place.formatted_address;
          marker.addr = marker.addr.substring(0, marker.addr.indexOf(", USA"));

          var hours = place.opening_hours.weekday_text;
          marker.hours = this.hoursToObject(hours);;

          marker.phone = place.formatted_phone_number;
          marker.website = place.website;
          marker.description = "";
        })

        return getLatLng(results[0]);
      })
      .then((latLng) => { //latLng = {lat, lng}
        //console.log('Success', latLng);

        marker.lat = latLng.lat;
        marker.lng = latLng.lng
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
                //disabled={this.props.newMarker.show ? "disabled" : ""}
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