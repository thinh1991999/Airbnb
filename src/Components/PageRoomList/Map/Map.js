import GoogleMapReact from "google-map-react";
import { useEffect, useRef, useState } from "react";
import Marker from "../Marker/Marker";
import "./Map.css";

function Map({ currentItems }) {
  const [center, setCenter] = useState({
    lat: 21.027763,
    lng: 105.83416,
  });
  const [childLoc, setChildLoc] = useState([
    {
      lat: 21.014874,
      lng: 105.814665,
    },
    {
      lat: 21.059736,
      lng: 105.804015,
    },
    {
      lat: 21.044036,
      lng: 105.878909,
    },
    {
      lat: 20.990195,
      lng: 105.878909,
    },
    {
      lat: 21.049483,
      lng: 105.863449,
    },
  ]);
  const [zoom, setZoom] = useState(11);
  const [mapSize, setMapSize] = useState(null);
  const mapRef = useRef(null);

  const handleHoverMap = () => {
    // window.
  };

  useEffect(() => {
    setMapSize(mapRef.current.getBoundingClientRect());
  }, []);

  return (
    <div
      id="map"
      ref={mapRef}
      className="w-full h-full"
      onMouseEnter={handleHoverMap}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDkyVccFb7LHI00Vv0TGfx_wxzEQ-AG1Qc",
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {childLoc.map((item, index) => {
          if (index >= currentItems?.length) return;
          return (
            <Marker
              key={index}
              index={index}
              lat={item.lat}
              lng={item.lng}
              data={currentItems[index]}
              mapSize={mapSize}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
