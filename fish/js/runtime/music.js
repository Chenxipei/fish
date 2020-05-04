let instance

export class Music{
  constructor(){
    if(instance){
      return instance;
    }
    instance = this;
    this.bgm = wx.createInnerAudioContext();
    this.bgm.loop = true;
    this.bgm.src = 'audios/bgm.mp3';
    this.playBgm()
  }

  playBgm(){
    this.bgm.play();
    console.log("在播了")
  }
}
