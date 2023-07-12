import React from "react";
import GoogleMapReact from 'google-map-react';

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 59.92754765620491, 
      lng: 30.321851534261327,
    },
    zoom: 12
  };

  return (
    // Important! Always set the container height explicitly
    <div style={
        { height: '134px', 
          width: '328px',
          marginLeft: '16px',
          borderRadius: '8px',
          overflow: "hidden" 
        }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/*<AnyReactComponent
          lat={59.92754765620491}
          lng={30.321851534261327}
      />*/}
      </GoogleMapReact>
    </div>
  );
}
