import { Scene, Vector3, Engine, ArcRotateCamera, HemisphericLight, MeshBuilder, Mesh, StandardMaterial, Texture, Color3, PointLight, ITextureCreationOptions } from "@babylonjs/core";
import { Animation, CircleEase, EasingFunction } from '@babylonjs/core/Animations';

export function createScene(engine: Engine, canvas:any): Scene {
    var scene: Scene = new Scene(engine);

        // sun light
      var light0 = new PointLight("Omni0",  new Vector3(100, -100, 100), scene);
      light0.diffuse = new Color3(1, 1, 1);

    var planetSaturn = Mesh.CreateSphere("saturn", 16, 27, scene);
   
    
    var ringSaturn = MeshBuilder.CreateTorus("saturnRings", {diameter: 50, thickness: 20, tessellation: 32}, scene); 
    ringSaturn.scaling = new Vector3(1, 0.001, 1) ;

    var planetSaturnMaterial = new StandardMaterial("planetSaturnSurface", scene);

    
     planetSaturnMaterial.diffuseTexture = new Texture("textures/saturn.jpg", scene, true, false) ;
    planetSaturn.material = planetSaturnMaterial;
    planetSaturnMaterial.diffuseColor = new Color3(1, 1, 1);
    planetSaturnMaterial.specularColor = new Color3(0, 0, 0);      


    
    var ringSaturnMaterial = new StandardMaterial("ringSaturnSurface", scene);
    let options: ITextureCreationOptions = {noMipmap: true
      , invertY: false};
    ringSaturnMaterial.diffuseTexture = new Texture("textures/saturn_rings.png", scene, options) ;
    ringSaturn.material = ringSaturnMaterial;
    ringSaturnMaterial.diffuseColor = new Color3(1, 1, 1);
    ringSaturnMaterial.specularColor = new Color3(0, 0, 0);       

    // Setup camera
    var camera = new ArcRotateCamera("Camera", 0,0, 10,  new Vector3(0,0,0), scene);
    camera.setPosition(new Vector3(0,100,0));
    camera.setTarget(new Vector3(0, 0, 0))
    camera.attachControl(canvas, true);    
  
    return scene;
  }
  