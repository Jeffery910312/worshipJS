import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "是否同意感測心率";
utterance.lang = "zh-TW";
utterance.rate = 1.5;


export default class Game2 extends Phaser.Scene {
    constructor() {
        super("game2Scene");
        
        this.changeToGame3 = 0;
    }

    create() {
        
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);

        this.textAgree = this.add.text(965, 1000, '是否感測心率，「同意」或「已測過」或「不同意」', { fontFamily: 'Arial', fontSize: 32, color: '#000000' });
        this.textAgree.setOrigin(0.5);
        this.textResult = this.add.text(965, 1040, '', { fontFamily: 'Arial', fontSize: 32, color: '#57b38a' });
        this.textResult.setOrigin(0.5);

        
        this.input.keyboard.on('keydown-A', ()=> 
        {
            this.textResult.setText('3秒後跳轉...');
            this.input.keyboard.removeListener('keydown-A');
            setTimeout(() => {
                this.scene.start('game3Scene');
            }, 3000);
        });
        
        this.input.keyboard.on('keydown-S', ()=> 
        {
            this.textResult.setText('3秒後跳轉...');
            this.input.keyboard.removeListener('keydown-S');
            setTimeout(() => {
            this.scene.start('game3Scene');
            }, 3000);
        });
        
        this.input.keyboard.on('keydown-D', ()=> 
        {
            this.textResult.setText("3秒後重新開始遊戲...");
            this.input.keyboard.removeListener('keydown-D');
            setTimeout(() => {
                location.reload();
            }, 3000);
        });
        


        this.input.keyboard.on('keydown-F', () => {
            
            setTimeout(() => {
            this.scene.start('game3Scene');
            }, 1000);
            this.input.keyboard.removeListener('keydown-F');
            
        });

        
    }

    update() {
        if (!this.spoken) { // If not spoken yet
            speechSynthesis.speak(utterance);
            this.spoken = true; // Set the flag to true
        }

        // if (this.changeToGame3 === 1) {
        //     this.recognition.stop();
        //     setTimeout(() => {
        //     this.scene.start('game3Scene');
        //     }, 3000);
        // }
        
    }

}
