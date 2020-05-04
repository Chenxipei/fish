//
import { DataBus } from '../databus.js';
let databus = new DataBus();
export class Obstacle{
  constructor(){
    this.num = 0
    this.text = 'counk:'
    this.color = '#fff'
    this.font = "20px 华文彩云"
    this.isScore = true
  }
  render() {
    databus.ctx.font = this.font;
    databus.ctx.fillText(this.text+this.num,10,50)
    databus.ctx.fillStyle=this.color;
  }
}