import { Scene, Vector3, Engine, ArcRotateCamera, HemisphericLight, MeshBuilder, Mesh, Layer, StandardMaterial, Texture, Color3, PointLight, Axis, Space, UniversalCamera, FlyCamera } from "@babylonjs/core";
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
  
    
    var background = new Layer("back", "textures/back.jpg", scene);
    background.isBackground = true;
    background.texture.level = 0;
  
    //background.texture.wAng = .2;
    //showWorldAxis(100);

    // sun sphere
    var sun =Mesh.CreateSphere("sun", 16, 25, scene);
    sun.position = new Vector3(0, 0, 0);
    var material = new StandardMaterial("sunmaterial", scene);
    material.diffuseTexture = new Texture("textures/8k_sun.jpg", scene, true, false) ;
    sun.material = material;
    material.emissiveColor = new Color3(1, 1, 1);
  
    //var particleSystem = new ParticleSystem("particles", 200, scene);
    //particleSystem.emitter = sun;
    //particleSystem.isLocal = true;
  
    // sun light
    var light0 = new PointLight("Omni0", sun.position, scene);
    light0.diffuse = new Color3(1, 1, 1);

    /*
Planet Sizes
Mercury – 1,516mi (2,440km) radius; about 1/3 the size of Earth
Venus – 3,760mi (6,052km) radius; only slightly smaller than Earth
Earth – 3,959mi (6,371km) radius
Mars – 2,106mi (3,390km) radius; about half the size of Earth
Jupiter – 43,441mi (69,911km) radius; 11x Earth’s size
Saturn – 36,184mi (58,232km) radius; 9x larger than Earth
Uranus – 15,759mi (25,362km) radius; 4x Earth’s size
Neptune – 15,299mi (24,622km) radius; only slightly smaller than Uranus


Mercury (0.307–0.588 AU (45.9–88.0 million km; 28.5–54.7 million mi) from the Sun[89
  Venus (0.718–0.728 AU (107.4–108.9 million km; 66.7–67.7 million mi) from the Sun[89])
  Mars (1.382–1.666 AU (206.7–249.2 million km; 128.5–154.9 million mi) from the Sun)
  Jupiter (4.951–5.457 AU (740.7–816.4 million km; 460.2–507.3 million mi) from the Sun[89]),
  Saturn (9.075–10.07 AU (1.3576–1.5065 billion km; 843.6–936.1 million mi) from the Sun[89]),
  Uranus (18.27–20.06 AU (2.733–3.001 billion km; 1.698–1.865 billion mi) from the Sun[89])
  Neptune (29.89–30.47 AU (4.471–4.558 billion km; 2.778–2.832 billion mi) from the Sun[89]), 


Planet	Rotation Period	Revolution Period
Mercury	58.6 days	87.97 days
Venus	243 days	224.7 days
Earth	0.99 days	365.26 days
Mars	1.03 days	1.88 years
Jupiter	0.41 days	11.86 years
Saturn	0.45 days	29.46 years
Uranus	0.72 days	84.01 years
Neptune	0.67 days	164.79 years
  
    */
  
    // planets:
    var planetMercury = Mesh.CreateSphere("mercury", 16, 1, scene);
    planetMercury.parent = sun;

    var planetVenus = Mesh.CreateSphere("venus", 16, 2.9, scene);
    planetVenus.parent = sun;

    var planetEarth = Mesh.CreateSphere("earth", 16, 3, scene);
    planetEarth.parent = sun;    

    var planetMars = Mesh.CreateSphere("mars", 16, 1.5, scene);
    planetMars.parent = sun;       

    var planetJupiter = Mesh.CreateSphere("jupiter", 16, 33, scene);
    planetJupiter.parent = sun;       

    var planetSaturn = Mesh.CreateSphere("saturn", 16, 27, scene);
    planetSaturn.parent = sun;   
    
    var ringSaturn = MeshBuilder.CreateTorus("saturnRings", {diameter: 50, thickness: 20, tessellation: 32}, scene);
    ringSaturn.parent = sun;   
    //ringSaturn.parent = planetSaturn;  
    ringSaturn.scaling = new Vector3(1, 0.001, 1)  
    
  
    var planetEarthMaterial = new StandardMaterial("planetEathSurface", scene);
    planetEarthMaterial.diffuseTexture = new Texture("textures/earth.jpg", scene, true, false) ;
    planetEarth.material = planetEarthMaterial
    planetEarthMaterial.diffuseColor = new Color3(1, 1, 1);
    planetEarthMaterial.specularColor = new Color3(0, 0, 0);

    var planetMercuryMaterial = new StandardMaterial("planetMercurySurface", scene);
    planetMercuryMaterial.diffuseTexture = new Texture("textures/mercury.jpg", scene, true, false) ;
    planetMercury.material = planetMercuryMaterial;
    planetMercuryMaterial.diffuseColor = new Color3(1, 1, 1);
    planetMercuryMaterial.specularColor = new Color3(0, 0, 0);

    var planetVenusMaterial = new StandardMaterial("planetVenusSurface", scene);
    planetVenusMaterial.diffuseTexture = new Texture("textures/venus.jpg", scene, true, false) ;
    planetVenus.material = planetVenusMaterial;
    planetVenusMaterial.diffuseColor = new Color3(1, 1, 1);
    planetVenusMaterial.specularColor = new Color3(0, 0, 0);    

    var planetMarsMaterial = new StandardMaterial("planetMarsSurface", scene);
    planetMarsMaterial.diffuseTexture = new Texture("textures/mars.jpg", scene, true, false) ;
    planetMars.material = planetMarsMaterial;
    planetMarsMaterial.diffuseColor = new Color3(1, 1, 1);
    planetMarsMaterial.specularColor = new Color3(0, 0, 0);    

    var planetJupiterMaterial = new StandardMaterial("planetJupiterSurface", scene);
    planetJupiterMaterial.diffuseTexture = new Texture("textures/jupiter.jpg", scene, true, false) ;
    planetJupiter.material = planetJupiterMaterial;
    planetJupiterMaterial.diffuseColor = new Color3(1, 1, 1);
    planetJupiterMaterial.specularColor = new Color3(0, 0, 0);  

    var planetSaturnMaterial = new StandardMaterial("planetSaturnSurface", scene);
    planetSaturnMaterial.diffuseTexture = new Texture("textures/saturn.jpg", scene, true, false) ;
    planetSaturn.material = planetSaturnMaterial;
    planetSaturnMaterial.diffuseColor = new Color3(1, 1, 1);
    planetSaturnMaterial.specularColor = new Color3(0, 0, 0);      


    
    var ringSaturnMaterial = new StandardMaterial("ringSaturnSurface", scene);
    ringSaturnMaterial.diffuseTexture = new Texture("textures/saturn_rings.png", scene, true, false) ;
    ringSaturn.material = ringSaturnMaterial;
    ringSaturnMaterial.diffuseColor = new Color3(1, 1, 1);
    ringSaturnMaterial.specularColor = new Color3(0, 0, 0);    


    var planets = [planetMercury, planetVenus, planetEarth, planetMars, planetJupiter, planetSaturn];

  
  
  
    // moon
    var moon = Mesh.CreateSphere("moon", 16, 0.7, scene);
    var moonMaterial = new StandardMaterial("moonmaterial", scene);
    moonMaterial.diffuseTexture = new Texture("textures/2k_moon.jpg", scene, true, false) ;
    moon.material = moonMaterial;
    moon.translate(planetEarth.position, 5, Space.WORLD);
    moon.parent = planetEarth;
  
    // Animations
    var alpha:number[] = [0,0,0,0,0,0];
    var alphaIncr:number[] = [0.005 * 365 / 87.97, 0.005 * 365 / 224.7, 0.005, 0.005 / 1.88, 0.005 / 11.86, 0.005 / 29.46];


    const earthOrbit = 100;
    var orbits: number[] = [(0.307+0.588)/2* earthOrbit, (0.718+0.728)/2 * earthOrbit, earthOrbit, (1.382+1.666)/2 * earthOrbit
    , (4.951+5.457) /2 * earthOrbit
  , (9.075+10.07)/2 * earthOrbit];


    var moonOrbit = 5;
    
    scene.beforeRender = function () {
      var mesh: Mesh = planetEarth.parent as Mesh;

      for(var p=0;p<planets.length;p++) {

        var sinAlpha = Math.sin(alpha[p]);
        var cosAlpha = Math.cos(alpha[p]);
        planets[p].position = new Vector3(orbits[p] * sinAlpha,  mesh.position.y, orbits[p] * cosAlpha);
      }

      ringSaturn.position = planetSaturn.position;

      mesh = moon.parent as Mesh;
      moon.position = new Vector3(moonOrbit * Math.sin(alpha[2]), mesh.position.y,  moonOrbit * Math.cos(alpha[2]) );
        
      for(var i=0;i<alpha.length;i++) {
        alpha[i] += alphaIncr[i]; // 0.005;
        if(alpha[i]> Math.PI * 2) alpha[i] -= Math.PI * 2;
      }
        
      /*
      for(var p=0;p<planets.length;p++) {
      // spin
        planets[p].rotate(Axis.Y, 0.05, Space.WORLD);
        planets[p].rotate(Axis.Y, 0.05, Space.LOCAL);
      }
      */


      moon.rotate(Axis.Y, -0.05, Space.LOCAL);
    };
  
     //Create a Vector3 animation at 30 FPS
    //var animationTorus = new Animation("torusEasingAnimation", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
  
    var animation1 = new Animation("animation1", "position.x", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
    var animation2 = new Animation("animation2", "position.z", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
  
    // Setup camera
    var camera = new ArcRotateCamera("Camera", 0,0, 10,  new Vector3(0,0,0), scene);
    camera.setPosition(new Vector3(600,50,-600));
  
    //var camera = new UniversalCamera("Camera", new Vector3(100,25,-100), scene);   // new Vector3(100,25,-100)
    //var camera = new FollowCamera("Camera", new Vector3(100,50,-100), scene, sun);

    // Parameters: name, position, scene
    //var camera = new FlyCamera("FlyCamera", new Vector3(100,25,-100), scene);
    // Airplane like rotation, with faster roll correction and banked-turns.
    // Default is 100. A higher number means slower correction.
    //camera.rollCorrect = 10;
    // Default is false.
    //camera.bankedTurn = true;
    // Defaults to 90° in radians in how far banking will roll the camera.
    //camera.bankedTurnLimit = Math.PI / 2;
    // How much of the Yawing (turning) will affect the Rolling (banked-turn.)
    // Less than 1 will reduce the Rolling, and more than 1 will increase it.
    //camera.bankedTurnMultiplier = 1;
  
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
    // animation1.setKeys(buildKeysX());
    // animation2.setKeys(buildKeysZ());
  
    // camera.animations.push(animation1);
    // camera.animations.push(animation2);  
  
  
    //scene.beginAnimation(camera, 0, 120, true, 0.1);
    return scene;
  }

  function buildKeysZ() {
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

function buildKeysX() {
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
