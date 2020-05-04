//渔网
import { DataBus } from '../databus.js';
let databus = new DataBus();
export class Fishing {
  constructor(top,src,imgType) {

    this.x = databus.canvas.width;
    this.y = 0;
    this.w = 86;
    this.h = 406;
    this.img = wx.createImage();
    this.img.src = src;
    this.imgType = imgType
    this.speed = 2;
    this.top = top
  }

  render() {
   if(this.imgType=='up'){
    this.y= this.top-this.h//随机距离减去自身高度
   }else{
     let height = databus.canvas.height/5;
     this.y = this.top + height
   }
    this.x = this.x-this.speed//速度
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.y,this.w,this.h )
  }
}
