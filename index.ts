import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import "@babylonjs/core/Helpers/sceneHelpers"
import { Mesh } from '@babylonjs/core/Meshes'
import { Vector3, StandardMaterial, Color3, DynamicTexture, Texture, PointLight, UniversalCamera, ArcRotateCamera } from '@babylonjs/core'
import { SphericBody, interaction, collisionManagement, CircularMover } from './physlib'
//import { createScene } from './createScene';

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

var scene: Scene = createScene(engine,canvas);

var b1 : SphericBody;
var b2 : SphericBody;
var b3 : SphericBody;


engine.runRenderLoop(() => {
    scene.render();
});

function createScene(engine: Engine, canvas:any): Scene
{
  var scene = new Scene(engine);
  showWorldAxis(200);

    // sun sphere
    var sun =Mesh.CreateSphere("sun", 16, 40, scene);
    sun.position = new Vector3(0, 0, 0);
    var material = new StandardMaterial("sunmaterial", scene);
    material.diffuseTexture = new Texture("textures/8k_sun.jpg", scene, true, false) ;
    sun.material = material;
    material.emissiveColor = new Color3(1, 1, 0);
  
    //var particleSystem = new ParticleSystem("particles", 200, scene);
    //particleSystem.emitter = sun;
    //particleSystem.isLocal = true;
  
    // sun light
    var light0 = new PointLight("Omni0", sun.position, scene);
    light0.diffuse = new Color3(1, 1, 1);

    var wd:Vector3 = new Vector3(500,500,500);


    
  
    // planet
    var planet = Mesh.CreateSphere("planet", 16, 5, scene);
    planet.position = new Vector3(0,0,150);
    //planet.scaling.x=-1;
    //planet.scaling.y=-1;
  
    var planetMaterial = new StandardMaterial("planetSurface", scene);
    planetMaterial.diffuseTexture = new Texture("textures/earth.jpg", scene, true, false) ;
    planet.material = planetMaterial
    planetMaterial.diffuseColor = new Color3(1, 1, 1);
    planetMaterial.specularColor = new Color3(0, 0, 0);


    
    var planet2 = Mesh.CreateSphere("planet2", 16, 5, scene);
    planet2.position = new Vector3(150,0,0);
    var planetMaterial2 = new StandardMaterial("planetSurface2", scene);
    planetMaterial2.diffuseTexture = new Texture("textures/2k_moon.jpg", scene, true, false) ;
    planet2.material = planetMaterial2
    planetMaterial2.diffuseColor = new Color3(1, 1, 1);
    planetMaterial2.specularColor = new Color3(0, 0, 0);
    

    var camera = new ArcRotateCamera("Camera",0,0, 10, new Vector3(0, 0, 0), scene);   // new Vector3(100,25,-100)
    camera.setTarget(new Vector3(0, 0, 0))
    camera.setPosition( new Vector3(250,250,250));
    camera.attachControl(canvas, true);

    b1 = new SphericBody(new Vector3(0,0,0), new Vector3(0,0,0), 5, 20, sun, null, null, wd);
    b2 = new SphericBody(new Vector3(0,0,0), new Vector3(-50,0,0), 5, 7, planet, null, null, wd);
    b3 = new SphericBody(new Vector3(0,0,0), new Vector3(0,0,-50), 5, 5, planet2, null, null, wd);
  
    var bodies=[b1, b2, b3];


    var animating = true;
    /*
    var cm1 : CircularMover = new CircularMover([true,false,true]);
    var cm2 : CircularMover = new CircularMover([true,true,false]);
    var cm3 : CircularMover = new CircularMover([false,true,true]);

    cm1.body = b1;
    cm2.body = b2;
    cm3.body = b3;

    Uso:
        animating = cm1.step()
        if(animating)
          animating = cm2.step()
        if(animating)
          animating = cm3.step();


  */

    scene.beforeRender = function () {
      if(!animating)
        return;

        interaction(bodies);
      bodies.forEach((b)=>b.move());
        
      
      collisionManagement(bodies, function(){ 
        animating=false; console.log("Stop!!!") })

    };


  return scene;
}

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
  var axisX = Mesh.CreateLines("axisX", [ 
    Vector3.Zero(), new Vector3(size, 0, 0), new Vector3(size * 0.95, 0.05 * size, 0), 
    new Vector3(size, 0, 0), new Vector3(size * 0.95, -0.05 * size, 0)
    ], scene);
  axisX.color = new Color3(1, 0, 0);
  var xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new Vector3(0.9 * size, -0.05 * size, 0);
  var axisY = Mesh.CreateLines("axisY", [
      Vector3.Zero(), new Vector3(0, size, 0), new Vector3( -0.05 * size, size * 0.95, 0), 
      new Vector3(0, size, 0), new Vector3( 0.05 * size, size * 0.95, 0)
      ], scene);
  axisY.color = new Color3(0, 1, 0);
  var yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new Vector3(0, 0.9 * size, -0.05 * size);
  var axisZ = Mesh.CreateLines("axisZ", [
      Vector3.Zero(), new Vector3(0, 0, size), new Vector3( 0 , -0.05 * size, size * 0.95),
      new Vector3(0, 0, size), new Vector3( 0, 0.05 * size, size * 0.95)
      ], scene);
  axisZ.color = new Color3(0, 0, 1);
  var zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new Vector3(0, 0.05 * size, 0.9 * size);
};
