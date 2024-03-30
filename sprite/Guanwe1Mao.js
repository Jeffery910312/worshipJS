export default class Guanwe1Mao extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene,0,0,'guanwe1Mao')

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setPosition(965,300)

        // this.setScale(0.5)

        this.body.setAllowGravity(false);
       

         
    }
    update(){
        
    }
}