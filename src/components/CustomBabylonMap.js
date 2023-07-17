import React, { useEffect, useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import "../CustomAppStyles.css";
import Config from "./Config"; // Updated import


const CustomBabylonMap = ({ images }) => {
  const mapCanvasRef = useRef(null);

  useEffect(() => {
    let engine = null;
    let scene = null;

    // Create the 3D scene using Babylon.js
    const createScene = (textures) => {
      const newScene = new BABYLON.Scene(engine);
      newScene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Set clearColor to transparent

      // Add 3D objects, lights, and cameras to the scene

      return newScene;
    };

    // Initialize the 3D scene and render it on the canvas
    const initializeScene = () => {
      const canvas = mapCanvasRef.current;

      // Set up the Babylon.js engine and create the scene

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener("resize", () => {
        engine.resize();
      });
    };

    initializeScene();

    return () => {
      if (scene) {
        scene.dispose();
      }
      if (engine) {
        engine.dispose();
      }
    };
  }, [images]);

  return <canvas className="custom-map-canvas" ref={mapCanvasRef} tabIndex={0} />;
};

export default CustomBabylonMap;
