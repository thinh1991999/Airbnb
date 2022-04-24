import GoogleMapReact from "google-map-react";
import { useEffect, useRef, useState } from "react";
import Marker from "../Marker/Marker";

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

  useEffect(() => {
    setMapSize(mapRef.current.getBoundingClientRect());
  }, []);

  return (
    <div className="fixed pt-[200px] right-0 top-0 bottom-0 w-[500px] z-10">
      <div ref={mapRef} className="w-full h-full">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDkyVccFb7LHI00Vv0TGfx_wxzEQ-AG1Qc",
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          onChildClick={() => console.log(123)}
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
    </div>
  );
}

export default Map;
