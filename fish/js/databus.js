//公共资源
let instance;

export class DataBus{
  constructor(){
    if(instance){
      return instance;
    }else{
      instance=this;
      this.gameove = true;
      this.canvas;
      this.ctx;
      this.fishing=[]//渔网
    }
  }
  reset(){
    this.gameove = false;
    this.fishing = [];
    this.timer = null;
  }
}

