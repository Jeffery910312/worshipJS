export default class Game3 extends Phaser.Scene{
    
    constructor(){
        super("game3Scene")
    }

    create()
    {
        var text3 = this.add.text(950, 200, 'scene3', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
    }
}