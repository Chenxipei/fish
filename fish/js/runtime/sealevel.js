import { DataBus } from '../databus.js';
let databus = new DataBus();
export class Sealeve {
  constructor() {
    this.img = wx.createImage();
    this.img.src = "images/sealevel.png";
    this.x = 0;
    this.y = 0;
    this.w = 800;
    this.h = 27;
    this.newx=0
    this.speed = 2;
  }
//databus.canvas.width-this.w  databus.canvas.height-this.h
  render() {
    if(this.newx>(this.w-databus.canvas.width)){
      this.newx=0
    }
    this.newx = this.newx+this.speed
    databus.ctx.drawImage(this.img,this.x, this.y, this.w, this.h,-this.newx ,databus.canvas.height-this.h,this.w ,  this.h )
  }
}