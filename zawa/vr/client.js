// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import {MouseRayCaster} from 'ovrui';
import * as THREE from 'three';
import ThreeDOFRayCaster from '../src/native_components/inputs/3dof/ThreeDOFRayCaster';
import RollerCoaster from '../src/native_components/RollerCoaster';
import Fog from '../src/native_components/Fog';

function init(bundle, parent, options) {
  const scene = new THREE.Scene();
  const threeDOFRayCaster =  new ThreeDOFRayCaster(scene);
  const rollerCoaster = new RollerCoaster(scene);
  const fog = new Fog(scene);

  let cameraPosition = threeDOFRayCaster._getCameraNewPosition();
  const vr = new VRInstance(bundle, 'zawa', parent, {
    // Add custom options here
    raycasters: [
      threeDOFRayCaster,
      new MouseRayCaster(),
    ],
    nativeModules: [
      rollerCoaster,
      fog,
    ],
    cursorVisibility: 'auto',
    scene: scene,
    ...options,
  });

  vr.render = function(time) { 
    // Any custom behavior you want to perform on each frame goes here
    rollerCoaster.frame(time);    // start play roller coaster
    const cameraNewPosition = threeDOFRayCaster._getCameraNewPosition();
    const cameraNewPositionInRoller = rollerCoaster.getPosition();
    const cameraNewRotationInRoller = rollerCoaster.getRotation();
    // console.log(cameraNewRotationInRoller);

    if(cameraNewPosition != cameraPosition) {
      // console.log(cameraNewPosition);
      
      vr.rootView.context.bridge._worker.postMessage({
        type: "newPosition", 
        position: cameraNewPosition,
      });
      cameraPosition = cameraNewPosition;
    }

    if(rollerCoaster.getStatus() && cameraNewPositionInRoller != cameraPosition) {
      // console.log(cameraNewPosition);
      vr.rootView.context.bridge._worker.postMessage({
        type: "rollerPosition", 
        position: cameraNewPositionInRoller,
      });

      vr.rootView.context.bridge._worker.postMessage({
        type: "rollerRotation", 
        rotation: cameraNewRotationInRoller,
      });
      cameraPosition = cameraNewPositionInRoller;
    }
  };


  // Begin the animation loop  
  vr.start();
  return vr;
}

// function onVRMessage(e) {
//   switch (e.data.type) {
//     case 'teleport':
//       effectController.teleport = e.data.data;
//       break;
//     default:
//     return;
//   }
// }


window.ReactVR = {init};
