import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import "@babylonjs/core/Helpers/sceneHelpers"
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { Mesh, MeshBuilder} from '@babylonjs/core/Meshes'
import { Vector3, StandardMaterial, Color3, PointLight, Texture, Space, Axis, Color4, UniversalCamera, FreeCamera, ParticleSystem, Layer } from '@babylonjs/core'
import { Animation } from '@babylonjs/core/Animations'


var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

function createScene() {
  var scene = new Scene(engine);
  //scene.clearColor = new Color4(Color3.Black().r,Color3.Black().g,Color3.Black().b,1);

  /*
  var skybox = Mesh.CreateGround("skyBox", 100.0, 100.0, 1, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.diffuseTexture = new Texture("textures/8k_stars.jpg", scene, true, false) ;
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
  skyboxMaterial.disableLighting = true;
  */


 var background = new Layer("back", "textures/8k_stars_milky_way.jpg", scene);
 background.isBackground = true;
 background.texture.level = 0;
 //background.texture.wAng = .2;
  // Setup camera
  var camera = new ArcRotateCamera("Camera", 0,0, 10,  new Vector3(0,0,0), scene);
  camera.setPosition(new Vector3(100,50,-100));
  //camera.setTarget(new Vector3(1, 1, 1))
  camera.attachControl(canvas, true);



  // sun sphere
  var sun =Mesh.CreateSphere("sun", 16, 5, scene);
  sun.position = new Vector3(0, 0, 0);
  var material = new StandardMaterial("sunmaterial", scene);
  material.diffuseTexture = new Texture("textures/8k_sun.jpg", scene, true, false) ;
  sun.material = material;
  material.emissiveColor = new Color3(1, 1, 0);

  var particleSystem = new ParticleSystem("particles", 200, scene);
  particleSystem.emitter = sun;
  particleSystem.isLocal = true;

  // sun light
  var light0 = new PointLight("Omni0", sun.position, scene);
  light0.diffuse = new Color3(1, 1, 1);

  // planet
  var planet = Mesh.CreateSphere("planet", 16, 1.5, scene);
  planet.parent = sun;
  //planet.scaling.x=-1;
  //planet.scaling.y=-1;

  var planetMaterial = new StandardMaterial("planetSurface", scene);
  planetMaterial.diffuseTexture = new Texture("textures/earth.jpg", scene, true, false) ;
  planet.material = planetMaterial
  planetMaterial.diffuseColor = new Color3(1, 1, 1);
  planetMaterial.specularColor = new Color3(0, 0, 0);


  // moon
  var moon = Mesh.CreateSphere("moon", 16, 0.7, scene);
  var moonMaterial = new StandardMaterial("moonmaterial", scene);
  moonMaterial.diffuseTexture = new Texture("textures/2k_moon.jpg", scene, true, false) ;
  moon.material = moonMaterial;
  moon.translate(planet.position, 5, Space.WORLD);
  moon.parent = planet;

  // Animations
  var alpha = 0;
  var earthOrbit = 20;
  var moonOrbit = 5;
  
  scene.beforeRender = function () {
    var mesh: Mesh = planet.parent as Mesh;
    planet.position = new Vector3(earthOrbit * Math.sin(alpha),  mesh.position.y, earthOrbit * Math.cos(alpha));
    mesh = moon.parent as Mesh;
    moon.position = new Vector3(moonOrbit * Math.sin(alpha), mesh.position.y,  moonOrbit * Math.cos(alpha) );
      
    alpha += 0.005;
      
    // spin
		planet.rotate(Axis.Y, 0.05, Space.WORLD);
		planet.rotate(Axis.Y, 0.05, Space.LOCAL);
		moon.rotate(Axis.Y, -0.05, Space.LOCAL);
  };

  particleSystem.start();
  return scene;
}


function createScene1(): Scene {
  var scene: Scene = new Scene(engine);

  var animationBox = new Animation("myAnimation", "position.z", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

  // An array with all animation keys
  var keys = []; 

  //At the animation key 0, the value of scaling is "1"
  keys.push({frame: 0, value: -1});

  //At the animation key 20, the value of scaling is "0.2"
  keys.push({frame: 20, value: -0.2});

  //At the animation key 100, the value of scaling is "1"
  keys.push({frame: 100, value: -1});

  animationBox.setKeys(keys);

  //var target : Vector3 = Vector3.Zero();
  var target : Vector3 = new Vector3(0,1,0);
  var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, target, scene);
  camera.attachControl(canvas, true);

  var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(2, 1, 0), scene);

  var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 0.5 }, scene);
  //sphere.position = new Vector3(0, 0, -1);

  sphere.animations = [];
  sphere.animations.push(animationBox);

  scene.beginAnimation(sphere, 0, 100, true);

  return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});