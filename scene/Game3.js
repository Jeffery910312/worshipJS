export default class Game3 extends Phaser.Scene{
    
    constructor(){
        super("game3Scene")
    }

    create()
    {
        var text3 = this.add.text(800, 200, '同意後跳轉到感測的頁面', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
    }
}