import { Mesh, Vector3 } from "@babylonjs/core";

export class World
{
  public static readonly ELAST_COEFF = 0.75;
  public static readonly  G = 0.1;
}

export class SphericBody
{

  public grphAcc : Mesh;
  public grphSpeed : Mesh;
  public grphBody: Mesh;

  private initPos : Vector3;
  private initSpeed: Vector3;
  private initAcc: Vector3;


  //public ax : number=0;
  //public ay : number=0;
  public acc: Vector3 = new Vector3(0,0,0);
  //public dx : number=0;
  //public dy : number=0;
  private speed: Vector3 = new Vector3(0,0,0);


  public density : number=0;

  public radius = 0;

  private worldDimensions:Vector3 = new Vector3();


  constructor(speed:Vector3,acc:Vector3,density:number, radius:number, grphBody:Mesh, grphSpeed:Mesh, grphAcc:Mesh, worldDimensions:Vector3 )
  {
    this.grphBody = grphBody;
    this.grphAcc = grphAcc;
    this.grphSpeed = grphSpeed;

    this.initPos = new Vector3(grphBody.position.x,grphBody.position.y,grphBody.position.z);
    this.initAcc = new Vector3(acc.x, acc.y, acc.z);
    this.initSpeed = new Vector3(speed.x,speed.y,speed.z);
    this.setVector(this.initSpeed, this.speed);


    this.density = density;

    this.radius = radius;


    this.setVector(worldDimensions, this.worldDimensions);
  }

  getMass() : number
  {
    var m= this.radius * this.radius;
    if(this.density)
      m *= this.density;
    return m;
  }


  getMomentum():number
  {
    return this.getMass() * Math.sqrt( this.speed.x * this.speed.x + this.speed.y*this.speed.y + this.speed.z*this.speed.z);
  }

  x()
  {
    return this.grphBody.position.x;

  }

  y()
  {
    return this.grphBody.position.y;
  }

  z()
  {
    return this.grphBody.position.z;
  }


  getRadius()
  {
    return this.radius;
  }

  resetInitPos()
  {
    this.setVector(this.grphBody.position, this.initPos);
  }


  reset()
  {
    this.setVector(this.initPos, this.grphBody.position);
    this.zeroVector(this.acc)
    this.setVector(this.initSpeed,this.speed);
  }

  sumVector(a:Vector3,b:Vector3,result:Vector3)
  {
    result.x=a.x+b.x;
    result.y=a.y+b.y;
    result.z=a.z+b.z;
  }

  setVector(source:Vector3, dest:Vector3)
  {
    dest.x = source.x;
    dest.y = source.y;
    dest.z = source.z;
  }

  zeroVector(v:Vector3)
  {
    v.x = 0;
    v.y = 0;
    v.z = 0;
  }

  move()
  {

    console.log(`spd/1 ${this.grphBody.name} ${this.speed}`);
    this.sumVector(this.acc,this.speed,this.speed);
    console.log(`spd/2 ${this.grphBody.name} ${this.speed}`);


    // Rimbalzo
    if(Math.abs(this.x() + this.speed.x) > this.worldDimensions.x - this.radius) {
        this.speed.x = - World.ELAST_COEFF * this.speed.x;
    }

    if( Math.abs(this.y() + this.speed.y) > this.worldDimensions.y - this.radius ) {
        this.speed.y = - World.ELAST_COEFF * this.speed.y;
    }

    if( Math.abs(this.z() + this.speed.z) > this.worldDimensions.z - this.radius) {
      this.speed.z = - World.ELAST_COEFF * this.speed.z;
    }

    // Spostamento
    var pos = new Vector3(this.x() + this.speed.x, this.y() + this.speed.y, this.z() + this.speed.z);
    this.setVector(pos,this.grphBody.position);
    console.log(`pos ${this.grphBody.name} ${this.grphBody.position}`);
    
    this.setVectors();

    
  }

  prepareForInteract()
  {
    if(this.initAcc!=null)
    {
      this.setVector(this.initAcc, this.acc);
      this.initAcc = null;
    }
    else
      this.zeroVector(this.acc);
  }

  setVectors()
  {
    var f = 10;
    var x = this.grphBody.position.x;
    var y = this.grphBody.position.y;
    var z = this.grphBody.position.z;
    // TODO:
    //this.grphSpd.points([x,y, x+this.dx*f, y+this.dy*f]);
    //this.grphAcc.points([x,y, x+this.ax*f*10, y+this.ay*f*10]);

  }
}



export function collisionManagement(objects: SphericBody[], onCollision:any)
{
  for(var i=0;i<objects.length;i++)
    for(var j=0;j<objects.length;j++)
      if(i!=j && i>=j) {
          var o1 = objects[i];
          var o2 = objects[j];

          var x = o1.x()-o2.x();
          var y = o1.y()-o2.y();
          var z = o1.z()-o2.z();

          if((x*x+y*y+z*z) < (o1.getRadius()+o2.getRadius())*(o1.getRadius()+o2.getRadius()))
          {
            // Collisione
            //animationOn = false;

            if(typeof onCollision === "function")
              onCollision();

            //var p1 = o1.getMomentum();
            //var p2 = o2.getMomentum();
          }
      }
}

export function interaction(bodies: SphericBody[])
{
  bodies.forEach((element: SphericBody) => {
    element.prepareForInteract();
  });
  for(var i1=0;i1<bodies.length;i1++) {
    for(var i2=0;i2<bodies.length;i2++)
      if(i1>i2) {
        interact(bodies[i1], bodies[i2]);
          
      }
  }
}



var logged = false;

function interact(o1:SphericBody,o2:SphericBody)
{
  var x = o1.x()-o2.x();
  var y = o1.y()-o2.y();
  var z = o1.z()-o2.z();

  var r = x*x + y*y + z*z;
  var module = Math.sqrt(r);

  
  var f = World.G / r ;

  // componenti assolute di f lungo gli assi
  var fxi = f * Math.abs(x / module);
  var fyi = f * Math.abs(y / module);
  var fzi = f * Math.abs(z / module);
 


  var fx1=fxi,fy1=fyi,fz1=fzi;
  var fx2=fxi,fy2=fyi,fz2=fzi;

  // se o1 è più lontano dall'origine di o2, la forza diventa negativa
  if(x>0) fx1 = - fxi; else fx2 = - fxi;
  if(y>0) fy1 = - fyi; else fy2 = - fyi;
  if(z>0) fz1 = - fzi; else fz2 = - fyi;

  o1.acc.x += fx1 * o2.getMass();
  o1.acc.y += fy1 * o2.getMass();
  o1.acc.z += fz1 * o2.getMass();

  o2.acc.x += fx2 * o1.getMass();
  o2.acc.y += fy2 * o1.getMass();
  o2.acc.z += fz2 * o1.getMass();

  console.log(`acc ${o1.grphBody.name} ${o1.acc}`);
  console.log(`acc ${o2.grphBody.name} ${o2.acc}`);
  

}


export class CircularMover
{
  public alpha:number=0;
  public dalpha:number=0.01;
  public radius:number=50;

  public body : SphericBody;

  private axis = [true,false,true];

  constructor(axis: boolean[])
  {
    this.axis = axis;
  }

  step() : boolean
  {
    var r = [0,0];

    r[0] = this.radius * Math.sin(this.alpha);
    r[1] = this.radius * Math.cos(this.alpha);

    var i=0;
    
    if(this.axis[0]) {
      this.body.grphBody.position.x = r[i];
      i++;
    }
    if(this.axis[1]) {

      this.body.grphBody.position.y = r[i];
      i++;
    }
    if(this.axis[2]) {

      this.body.grphBody.position.z = r[i];
      i++;
    }
    this.alpha += this.dalpha;

    

    return this.alpha <= Math.PI * 2;
    

  }
}