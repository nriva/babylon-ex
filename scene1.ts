import { Scene, Vector3, Engine, ArcRotateCamera, HemisphericLight, MeshBuilder, Mesh } from "@babylonjs/core";
import { Animation, CircleEase, EasingFunction } from '@babylonjs/core/Animations';

export function createScene1(engine: Engine, canvas:any): Scene {
    var scene: Scene = new Scene(engine);
  
    var animation1 = new Animation("animation1", "scaling.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    var animation2 = new Animation("animation1", "scaling.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
  
    animation1.setKeys([{frame: 0, value: -1}, {frame: 20, value: -0.2}, {frame: 100, value: -1}]);
    animation2.setKeys([{frame: 0, value: -1}, {frame: 20, value: -0.2}, {frame: 100, value: -1}]);
  
    //var target : Vector3 = Vector3.Zero();
    var target : Vector3 = new Vector3(0,1,0);
    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, target, scene);
    camera.attachControl(canvas, true);
  
    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(2, 1, 0), scene);
  
    var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 0.5 }, scene);
    //sphere.position = new Vector3(0, 0, -1);
  
    sphere.animations = [];
    sphere.animations.push(animation1);
    sphere.animations.push(animation2);
  
    scene.beginAnimation(sphere, 0, 100, true,0.2);
  
    return scene;
  }
  