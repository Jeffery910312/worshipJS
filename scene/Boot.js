export default class Boot extends Phaser.Scene{
    constructor(){
        super("bootScene")
    }
    preload(){
        this.load.on("progress",(value)=>{
            console.log(value)
        })
        this.load.on("complete",()=>{
            this.scene.start("gameScene")
        })
        this.load.image("guanwe1Mao",'../assets/guanwe1Mao.png')
        this.load.image("guanwe1Wink",'../assets/guanwe1Wink.png')
    }
    create(){
        //anims
    }
}