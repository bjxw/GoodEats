# 1/19/2021
- GoodEats is born

# 1/21/2021
- Project first uploaded to GitHub!
- README created. To be finalized later

# 1/22/2021
- Deciding between google-map-react vs google-maps-react packages
- Added markers to the map from pre-set array

# 1/27/2021
- Markers can now be added by clicking on the map
- Markers have infoWindows attached for info display

# 1/28/2021
- Fixed formatting and UI/UX for infoWindow

# 1/29/2021
- Added a MarkerWindow to submit new markers with information

# 2/2/2021
- Finished MarkerWindow for marker submission

# 2/4/2021
- Added an X to allow Window closing for UI/UX
- Added more description info to Markers
- Added a button for new Marker additions as opposed to free-clicking

# 2/5/2021
- Added npm package bootstrap
- Added App.js CSS
- Added favico

# 2/8/2021
- Added CSS to all components except marker.js
- Fixed marker interaction with "Add Marker" mode

# 2/9/2021
- Added search bar UI and moved "Add Marker" button

# 2/10/2021
- Added Google Places package and UI for search bar
- Added Google Maps styles for marker mode
- Added marker showing for location search 

# 2/16/2021
- Refactored MarkerWindow code to become separate components

# 2/18/2021
- Finished placeSearch functionality to allow users to look up locations through the search bar

# 2/19/2021
- visibleMarker branch base functionality finished
- visibleMarker does not update the list on a Marker submission

# 2/22/2021
- Added responsive UI to placeList and map markers respectively
- visibleMarkers UI/UX "completed"

# 2/26/2021
- Started editMarker branch and editing options
- Issues with editing when swapping from editing existing marker back to normal map
- Issues with editing the 0th indexed marker due to logic operator
- Issues with editing the form and clicks bubbling up to parent map

# 3/2/2021
- Removed drag clicks persisting on markerWindows
- Fixed editMarker edits creating new markers instead of updating
- Removed buggy 'edit' clicks caused from clicking edit in edit mode
- Fixed missed merge with "visibleMarkers" branch
- editMarker partially working
- Failed to merge all current branches up to editMarker causing hiccups
- Remerged all branches but need to fix markerEdit
- editMarkers fully functional after fixing all bugs

# 3/4/2021
- Discovered arrow function was needed to prevent 'this' callback errors for placeList
- Fixed hr breaks in placeSearch dropdown

# 3/5/2021
- Added scrolling restrictions to map options for out of bounds prevention

# 3/8/2021
- Fixing CSS for future deletion icon in PlaceList

# 3/9/2021
- Adding trash icons for deletion
- Working on deletion method for Markers
- Deletion markers works. Need to investigate indexing in database

# 3/11/2021
- New favico with proper transparency
- Made GoodEats title unselectable for presentation
- Fixed minor issue where dragging disabled entirely on newMarkerShow
- Choosing Markers now centers the map on given location

# 3/12/2021
- Unclear if refactoring code will entirely work. Put on hold
- Fixing various bugs on master branch (editing then adding new marker replaces the edited marker, infoWindow showing during an edit)
- Fixed edit option showing on newMarker
- Added a vegetarian symbol

# 3/15/2021
- Added proper implementation of vegetarian restaurants
- Added deletion confirmation for markers

# 3/16/2021
- Adding updated CSS to InfoWindows
- Adding Places Details into placeSearch
- Figuring out custom places vs Google Places

# 3/17/2021
- Added more infoWindow components
- Added scrolling CSS for infoWindows
- Broken placeSearch newMarker fill found

# 3/19/2021
- Fixed placeSearch not working

# 3/22/2021
- Adding hours table for new markers

# 3/24/2021
- Timepicker component created
- Moving hoursTable to separate component and linking to markerWindow
- Connected hoursTable UI to markerWindow

# 3/25/2021
- hoursTable can now be entered manually for newMarkers

# 3/29/2021
- Ensuring operating hours are passed smoothly across any operation

# 4/1/2021
- Hours are managed across base functions (create, edit, read)
- Working on passing marker info from editing to placeSearch (ID fixed but details persist)

# 4/2/2021
- Fixed minor issues with spacing in TimePicker's minute and AMPM gap
- Working on bug where placeSearch'ing after editing doesn't create the correct newMarker

# 4/5/2021
- Replaced erroneous line for address autofill
- Fixed vegetarian options when updating

# 4/6/2021
- Fixed placeSearch autofill thanks to getDerivedStateFromProps

# TODO
- Fix placeSearch submission bug where new marker refers to an existing marker (places to look: placeList duplicate keys?)
    - Deleting a marker causes array index vs id mismatch (solved by using mongodb backend?)
    - Deleting a marker then adding a new one causes this bug (the existing marker is always last on the list)
    - Scrolling on and off placeList causes duplication/addition bug (existing marker is the one getting cloned/taking over)
- Fix text overflow in infoWindows
- Backend database (*deletion cases)
- Refactor/clean code (always)