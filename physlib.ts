import { Mesh, Vector3 } from "@babylonjs/core";


export class SphericBody
{
  private ELAST_COEFF = 0.75;
  

  public grphAcc : Mesh;
  public grphSpeed : Mesh;
  public grphBody: Mesh;

  //public inix : number=0;
  //public iniy : number=0;
  private initPos : Vector3;

  //public _ax : number=0;
  //public _ay : number=0;
  private initAcc : Vector3;
  //public _dx : number=0;
  //public _dy : number=0;
  private initSpeed: Vector3;


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
    this.initAcc = new Vector3(acc.x,acc.y,acc.z);
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

    this.sumVector(this.acc,this.speed,this.speed);

    // Rimbalzo
    if(this.x() + this.speed.x > this.worldDimensions.x - this.radius || this.x() + this.speed.x < this.radius) {
        this.speed.x = - this.ELAST_COEFF * this.speed.x;
    }

    if(this.y() + this.speed.y > this.worldDimensions.y - this.radius || this.y() + this.speed.y < this.radius) {
        this.speed.y = - this.ELAST_COEFF * this.speed.y;
    }

    if(this.z() + this.speed.z > this.worldDimensions.z - this.radius || this.z() + this.speed.z < this.radius) {
      this.speed.z = - this.ELAST_COEFF * this.speed.z;
    }

    // Spostamento
    var pos = new Vector3(this.x() + this.speed.x, this.y() + this.speed.y, this.z() + this.speed.z);
    this.setVector(pos,this.grphBody.position)
    this.setVectors();
  }

  prepareForInteract()
  {
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
  debugger;
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

const G = 0.05;

var logged = false;

function interact(o1:SphericBody,o2:SphericBody)
{
  var x = o1.x()-o2.x();
  var y = o1.y()-o2.y();
  var z = o1.z()-o2.z();

  // Angolo del vettore f
  //var alpha = Math.atan(Math.abs(y/x));

  var r = x*x + y*y + z*z;
  var module = Math.sqrt(r);
  
  var f = G / r ;

  // componenti di f lungo gli assi
  var fxi = f * x / module;
  var fyi = f * y / module;
  var fzi = f * z / module;

  var fx=fxi,fy=fyi,fz=fzi;

  if(x>0) fx = - fxi;
  if(y>0) fy = - fyi;
  if(z>0) fz = - fzi;

  o1.acc.x += fx * o2.getMass();
  o1.acc.y += fy * o2.getMass();
  o1.acc.z += fz * o2.getMass();

  if(x<0) fx = fxi; else fx = -fxi;
  if(y<0) fy = fyi; else fy = -fyi;
  if(z<0) fz = fzi; else fz = -fzi;


  o2.acc.x += fx * o1.getMass();
  o2.acc.y += fy * o1.getMass();
  o2.acc.z += fz * o1.getMass();
  

}