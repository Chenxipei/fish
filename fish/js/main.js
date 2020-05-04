import { DataBus } from './databus.js';
import { Seabed } from './runtime/seabed.js';
import { Sealeve } from './runtime/sealevel.js';
import { Button } from './runtime/button.js';
import { Music } from './runtime/music.js';
import { Obstacle } from './runtime/obstacle.js';
import { Fish } from './runtime/fish.js';
import { Fishing } from './runtime/fishing.js';
let databus = new DataBus();
// let music = new Music();
export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    databus.canvas = this.canvas;
    databus.ctx = this.ctx
    this.init()
    this.registerEvent()
  }
  init() {
    this.bg = new Seabed();
    this.se = new Sealeve();
    this.ob = new Obstacle
    this.fish = new Fish()
    this.btn = new Button();
    this.reqFishing()
    this.startGame();
  }
  check() {
    //鱼的边框模型，模拟鱼的时时位置
    const fishBorder = {
      top: this.fish.y,
      bottom: this.fish.y + this.fish.h,
      left: this.fish.x,
      right: this.fish.x + this.fish.w
    };
    //循环遍历所有的障碍物
    for (let i = 0; i < databus.fishing.length; i++) {
      //创建障碍物边框模型
      const obstacle = databus.fishing[i];
      const obstacleBorder = {
        top: obstacle.y,
        bottom: obstacle.y + obstacle.h,
        left: obstacle.x,
        right: obstacle.x + obstacle.w
      };

      if (this.isCheck(fishBorder, obstacleBorder)) {
        console.log('抓到鱼');
        databus.gameove = false;
        return;
      }
    }
    if (this.fish.newy + this.fish.h >= databus.canvas.height - this.se.h) {
      console.log('撞击地板啦');
      databus.gameove = false; //设置游戏状态，停止游戏
      return;
    }
       //加分逻辑
       if (this.fish.x > databus.fishing[0].x + databus.fishing[0].img.width &&
        this.ob.isScore) {
        wx.vibrateShort({
          success: function () {
            console.log('振动成功');
          }
        });
        this.ob.isScore = true;
        this.ob.num++;
      }
  }
  isCheck(fish, obstacle) {
    let s = false; //未碰撞状态
    if (fish.top > obstacle.bottom ||
      fish.bottom < obstacle.top ||
      fish.right < obstacle.left ||
      fish.left > obstacle.right
    ) {
      s = true;
    }
    return !s;
  }
  startGame() {
    this.check()
    if (databus.gameove) {
      this.bg.render();
      this.se.render();
      this.ob.render();
      this.fish.render()
      
      //判断渔网
      if (databus.fishing[0].x + databus.fishing[0].img.width <= 0 && databus.fishing.length == 4) {
        databus.fishing.shift()
        databus.fishing.shift()
      }
      //判断渔网
      if (databus.fishing[0].x <= (databus.canvas.width - databus.fishing[0].img.width) / 2 && databus.fishing.length == 2) {
        this.reqFishing();
      }
      //渲染渔网
      databus.fishing.forEach(item => {
        item.render();
      })
      requestAnimationFrame(() => {
        this.startGame()
      })
    }else{
     
      this.btn.render();
      console.log('停止')
      databus.reset()
      cancelAnimationFrame(databus.timer);
      wx.triggerGC();
    }
  }
  //创建渔网
  reqFishing() {
    let minTop = databus.canvas.height / 8;
    let maxTop = databus.canvas.height / 2;
    let top = minTop + Math.random() * (maxTop - minTop);
    databus.fishing.push(new Fishing(top, 'images/pi_up.png', 'up'))
    databus.fishing.push(new Fishing(top, 'images/pi_down.png', 'down'))
  }
  //触摸方法
  registerEvent(){
    wx.onTouchStart(()=>{
      if(!databus.gameove){
        databus.gameove = true
        this.init()
      }else{
        this.fish.y = this.fish.newy
        this.fish.time = 0
      }
    })
  }
}

