import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "將孔子的供品替換成另一個喜歡的供品";
utterance.lang = "zh-TW";

export default class Game3 extends Phaser.Scene{
    
    constructor(){
        super("game3Scene")
    }

    create()
    {
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);
        


        this.text3 = this.add.text(965, 1020, '將孔子的供品替換成另一個喜歡的供品', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
        this.text3.setOrigin(0.5);
    }

     update() {
        if (!this.spoken) { // If not spoken yet
            speechSynthesis.speak(utterance);
            this.spoken = true; // Set the flag to true
        }
    }
}