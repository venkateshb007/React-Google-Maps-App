import React, { useEffect, useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import "../App.css";


const CustomBabylonMap = ({ capturedImages, onImageCaptured }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let engine = null;
    let scene = null;

    const createScene = (textures) => {
      const newScene = new BABYLON.Scene(engine);
      newScene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Set clearColor to transparent

      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 4,
        Math.PI / 4,
        8,
        BABYLON.Vector3.Zero(),
        newScene
      );
      camera.attachControl(canvasRef.current, true);
      camera.wheelPrecision = 0; // Disable zooming with the mouse scroll
      camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius; // Keep the camera at a fixed radius

      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        newScene
      );

      const box = BABYLON.MeshBuilder.CreateBox(
        "box",
        { width: 4, height: 4, depth: 4 },
        newScene
      );
      const material = new BABYLON.StandardMaterial("material", newScene);
      if (textures.length > 0) {
        // Use the latest captured image URL as the texture
        material.diffuseTexture = new BABYLON.Texture(textures[textures.length - 1].url, newScene);
      }
      box.material = material;

      return newScene;
    };

    const initializeScene = () => {
      const canvas = canvasRef.current;
      const width = 500; // Set the desired width for the canvas

      canvas.width = width; // Set the canvas width

      engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      scene = createScene(capturedImages);

      engine = new BABYLON.Engine(canvasRef.current, true);
      scene = createScene(capturedImages);

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
  }, [capturedImages]);

  return <canvas className="canvas-container" ref={canvasRef} tabIndex={0} />;
};

export default CustomBabylonMap;