let styles = [
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "-10"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "-10"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": "-10"
            }
        ]
    }
]

const MapStyle = {styles}

export default MapStyle;