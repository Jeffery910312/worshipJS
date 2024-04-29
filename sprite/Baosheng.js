export default class Baosheng extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene,2100,530,'baosheng')

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setScale(0.3)

        this.body.setAllowGravity(false);
       
    }
    update(){
        
    }
}