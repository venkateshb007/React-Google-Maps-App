// CustomBabylonMap.js
import React, { useEffect, useRef } from "react";
import { Engine, Scene } from "react-babylonjs";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import "../App.css";

const CustomBabylonMap = ({ capturedImages }) => {
  const canvasRef = useRef(null);
  let engine = null;
  let scene = null;
  let box = null; //adding a variable to keep track of the cuboid

  useEffect(() => {
    const createScene = (textures) => {
      const newScene = new BABYLON.Scene(engine);
      newScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 4,
        Math.PI / 4,
        8,
        BABYLON.Vector3.Zero(),
        newScene
      );
      camera.attachControl(canvasRef.current, true);
      camera.wheelPrecision = 0;
      camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;

      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        newScene
      );

      // Recreating the cuboid with the latest texture
      if (box) {
        box.dispose();
      }
      box = BABYLON.MeshBuilder.CreateBox(
        "box",
        { width: 4, height: 4, depth: 4 },
        newScene
      );
      const material = new BABYLON.StandardMaterial("material", newScene);
      if (textures.length > 0) {
        material.diffuseTexture = new BABYLON.Texture(
          textures[textures.length - 1].url,
          newScene
        );
      }
      box.material = material;

      return newScene;
    };

    const initializeScene = () => {
      const canvas = canvasRef.current;
      const width = 500;

      canvas.width = width;

      engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
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
