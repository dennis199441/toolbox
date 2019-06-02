import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from "react-google-maps"

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVNpbblMGWwj56V1Hp05MXj_RNqKdEXHM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `200%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `200%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap defaultZoom={11} defaultCenter={{ lat: props.lat, lng: props.lng }} >
    {
      props.isMarkerShown && 
      props.markers.map(marker => (
        <Marker
          position={{ lat: marker.lat, lng: marker.lng }}
          key={marker.id}
        />
      ))
    }
    {props.isCircleShown && 
      <Circle 
        defaultCenter={{ lat: props.lat, lng: props.lng }} 
        radius={10000} // 10km
        options={{
          fillColor: 'blue',
          strokeColor:"blue"
        }}
      />
    }
  </GoogleMap>
);

class CommunityMap extends React.PureComponent {
  state = {
    lat: -33.890542, // users' location
    lng: 151.274856, // users' location
    markers: [
      {lat: -33.890542, lng: 151.274856}, 
      {lat: -33.923036, lng: 151.259052},
      {lat: -34.028249, lng: 151.157507},
      {lat: -33.800101, lng: 151.287478},
      {lat: -33.950198, lng: 151.259302},
    ],
    isMarkerShown: true,
    isCircleShown: true,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MapComponent
        lat={this.state.lat}
        lng={this.state.lng}
        markers={this.state.markers}
        isMarkerShown={this.state.isMarkerShown}
        isCircleShown={this.state.isCircleShown}
        onMarkerClick={this.handleMarkerClick} 
      />
    )
  }
}

export default CommunityMap;