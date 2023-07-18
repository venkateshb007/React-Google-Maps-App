import React, { useMemo, useRef, useState } from "react";
import "../App.css";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import {GOOGLE_MAPS_API_KEY} from "../config"
import CustomBabylonMap from "./CustomBabylonMap";

function CustomMap() {
  const center = useMemo(() => ({ lat: 20, lng: 77 }), []);

  const mapContainerRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const handleCaptureImage = () => {
    const mapContainer = mapContainerRef.current;

    if (!mapContainer) {
      console.error("Google Map container is not available");
      return;
    }

    // Disable map zooming
    mapContainer.setOptions({
      gestureHandling: "none",
    });

    // Get the map's center and zoom
    const center = mapContainer.getCenter();
    const zoom = mapContainer.getZoom();

    // Create a Google Static Maps URL with the center and zoom
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat()},${center.lng()}&zoom=${zoom}&size=800x600&key=${GOOGLE_MAPS_API_KEY}`;

    // Create a unique identifier for the captured image
    const imageId = Date.now();

    // Add the captured image URL and its identifier to the state
    setCapturedImages((prevImages) => [
      ...prevImages,
      { id: imageId, url: imageUrl },
    ]);

    // Enable map zooming after capturing the image
    mapContainer.setOptions({
      gestureHandling: "greedy",
    });
  };

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="google-maps-container">
        <GoogleMap
          mapContainerClassName="google-map"
          center={center}
          zoom={5}
          options={{
            gestureHandling: "greedy",
          }}
          onLoad={(map) => {
            mapContainerRef.current = map;
          }}
        ></GoogleMap>

        
        <div className="cuboid-Container">
          <div className="cuboid">
            <CustomBabylonMap
              capturedImages={capturedImages}
              onImageCaptured={handleCaptureImage}
            />
          </div>
          <button onClick={handleCaptureImage} className="btn-capture">
            Capture Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CustomMap);
