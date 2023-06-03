import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import "@babylonjs/core/Helpers/sceneHelpers"
import { Mesh, MeshBuilder } from '@babylonjs/core/Meshes'
import { Vector3, StandardMaterial, Color3, DynamicTexture } from '@babylonjs/core'
import { createScene } from './createScene';

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

var scene: Scene = createScene(engine,canvas);

engine.runRenderLoop(() => {
    scene.render();
});

function showWorldAxis(size: number) {
  var makeTextPlane = function(text: string, color: string, size: number) {
      var dynamicTexture = new DynamicTexture("DynamicTexture", 50, scene, true);
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
      var plane = Mesh.CreatePlane("TextPlane", size, scene, true);
       var material = new StandardMaterial("TextPlaneMaterial", scene);
       plane.material = material;
       material.backFaceCulling = false;
      material.specularColor = new Color3(0, 0, 0);
      material.diffuseTexture = dynamicTexture;
  return plane;
   };
  var axisX = MeshBuilder.CreateLines("axisX", {points: [ 
    Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0), 
    new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
    ]}, scene);
  axisX.color = new Color3(1, 0, 0);
  var xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);
  var axisY = MeshBuilder.CreateLines("axisY", {points: [
      Vector3.Zero(), new Vector3(0, size, 0), new Vector3( -0.05 * size, size * 0.95, 0), 
      new Vector3(0, size, 0), new Vector3( 0.05 * size, size * 0.95, 0)
      ]}, scene);
  axisY.color = new Color3(0, 1, 0);
  var yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);
  var axisZ = MeshBuilder.CreateLines("axisZ", {points:[
      Vector3.Zero(), new Vector3(0, 0, size), new Vector3( 0 , -0.05 * size, size * 0.95),
      new Vector3(0, 0, size), new Vector3( 0, 0.05 * size, size * 0.95)
      ]}, scene);
  axisZ.color = new Color3(0, 0, 1);
  var zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
};