import { Scene, Vector3, Engine, ArcRotateCamera, HemisphericLight, MeshBuilder, Mesh, Layer, StandardMaterial, Texture, Color3, PointLight, Axis, Space, UniversalCamera } from "@babylonjs/core";
import { Animation, CircleEase, EasingFunction } from '@babylonjs/core/Animations';


export function createScene(engine: Engine, canvas: any) {
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
    //showWorldAxis(100);

    // sun sphere
    var sun =Mesh.CreateSphere("sun", 16, 5, scene);
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
      if(alpha> Math.PI * 2) alpha -= Math.PI * 2;
        
      // spin
          planet.rotate(Axis.Y, 0.05, Space.WORLD);
          planet.rotate(Axis.Y, 0.05, Space.LOCAL);
          moon.rotate(Axis.Y, -0.05, Space.LOCAL);
    };
  
     //Create a Vector3 animation at 30 FPS
    //var animationTorus = new Animation("torusEasingAnimation", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
  
    var animation1 = new Animation("animation1", "position.x", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
    var animation2 = new Animation("animation2", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
  
    // Setup camera
    //var camera = new ArcRotateCamera("Camera", 0,0, 10,  new Vector3(0,0,0), scene);
    //camera.setPosition(new Vector3(100,50,-100));
  
    var camera = new UniversalCamera("Camera", new Vector3(5,25,-100), scene);   // new Vector3(100,25,-100)
    //var camera = new FollowCamera("Camera", new Vector3(100,50,-100), scene, sun);
  
    camera.setTarget(new Vector3(0, 0, 0))
    camera.attachControl(canvas, true);
  
    // Animation keys
    //var keysTorus = [];
    //keysTorus.push({ frame: 0, value: camera.position });
    // per il comportamento voluto, x==-z perché il quadrante difronte allo spettatore ha x>0 e z<0
    //keysTorus.push({ frame: 60, value: new Vector3(20,10,-20) });
    //keysTorus.push({ frame: 120, value: new Vector3(100,25,-100) });
    //animationTorus.setKeys(keysTorus);
    // Creating an easing function
    //var easingFunction = new CircleEase();
  
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    //easingFunction.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
    // Adding the easing function to the animation
    //animationTorus.setEasingFunction(easingFunction);
    //camera.animations.push(animationTorus);
  
    // Caso calcolato:
    animation1.setKeys(buildKeysX());
    animation2.setKeys(buildKeysZ());
    //animation1.setKeys([{frame: 0, value: 100}, {frame: 20, value: 50}, {frame: 100, value: 100}]);
    //animation2.setKeys([{frame: 0, value: -100}, {frame: 20, value: -50}, {frame: 100, value: -100}]);
  
    camera.animations.push(animation1);
    camera.animations.push(animation2);  
  
  
    scene.beginAnimation(camera, 0, 120, true, 0.1);
    return scene;
  }

  function buildKeysZ()
{
  var keys = [];
  keys.push({frame: 0, value: -100});
  keys.push({frame: 1, value: -95});
  keys.push({frame: 2, value: -90});
  keys.push({frame: 3, value: -85});
  keys.push({frame: 4, value: -80});
  keys.push({frame: 5, value: -75});
  keys.push({frame: 6, value: -70});
  keys.push({frame: 7, value: -65});
  keys.push({frame: 8, value: -60});
  keys.push({frame: 9, value: -55});
  keys.push({frame: 10, value: -50});
  keys.push({frame: 11, value: -45});
  keys.push({frame: 12, value: -40});
  keys.push({frame: 13, value: -35});
  keys.push({frame: 14, value: -30});
  keys.push({frame: 15, value: -25});
  keys.push({frame: 16, value: -20});
  keys.push({frame: 17, value: -15});
  keys.push({frame: 18, value: -10});
  keys.push({frame: 19, value: -5});
  return keys;
}

function buildKeysX()
{
  var keys = [];
  keys.push({frame: 0, value: 5});
  keys.push({frame: 1, value: 5.263});
  keys.push({frame: 2, value: 5.556});
  keys.push({frame: 3, value: 5.882});
  keys.push({frame: 4, value: 6.25});
  keys.push({frame: 5, value: 6.667});
  keys.push({frame: 6, value: 7.143});
  keys.push({frame: 7, value: 7.692});
  keys.push({frame: 8, value: 8.333});
  keys.push({frame: 9, value: 9.091});
  keys.push({frame: 10, value: 10});
  keys.push({frame: 11, value: 11.111});
  keys.push({frame: 12, value: 12.5});
  keys.push({frame: 13, value: 14.286});
  keys.push({frame: 14, value: 16.667});
  keys.push({frame: 15, value: 20});
  keys.push({frame: 16, value: 25});
  keys.push({frame: 17, value: 33.333});
  keys.push({frame: 18, value: 50});
  keys.push({frame: 19, value: 100});
    
  return keys;
}