import React, { useMemo, useRef, useState } from "react";
import "../CustomAppStyles.css";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { googleMapsApiKey } from "../config.js";

import CustomBabylonMap from "./CustomBabylonMap";

function CustomMap() {
  const center = useMemo(() => ({ lat: 20, lng: 77 }), []);

  const mapContainerRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  const handleViewImage = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const handleRemoveImage = (imageId) => {
    setCapturedImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== imageId);
      return updatedImages;
    });
  };

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
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat()},${center.lng()}&zoom=${zoom}&size=800x600&key=${googleMapsApiKey}`;

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
      <div className="map-container">
        <GoogleMap
          mapContainerClassName="map-content"
          center={center}
          zoom={5}
          options={{
            gestureHandling: "greedy",
          }}
          onLoad={(map) => {
            mapContainerRef.current = map;
          }}
        ></GoogleMap>

        <div className="cuboid">
          <div className="cube">
            <CustomBabylonMap
              capturedImages={capturedImages}
              onImageCaptured={handleCaptureImage}
            />
          </div>
          <button onClick={handleCaptureImage} className="capture-button">
            Capture Image
          </button>
        </div>
      </div>

      <div className="captured-images">
        {capturedImages.map((image, index) => (
          <div key={image.id} className="captured-image">
            <img src={image.url} alt={`Captured ${index + 1}`} />
            <div className="image-actions">
              <button onClick={() => handleRemoveImage(image.id)}>
                Cancel
              </button>
              <button onClick={() => handleViewImage(image.url)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CustomMap);
