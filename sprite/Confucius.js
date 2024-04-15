export default class Confucius extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene,965,550,'confucius')

        scene.add.existing(this)
        scene.physics.add.existing(this)
        // this.setPosition(965,750)

        // this.setScale(0.5)

        this.body.setAllowGravity(false);
       

         
    }
    update(){
        
    }
}