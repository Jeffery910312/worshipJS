import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "感測心率選擇";
utterance.lang = "zh-TW";


export default class Game2 extends Phaser.Scene {
    constructor() {
        super("game2Scene");
        this.recognition = new webkitSpeechRecognition();
        this.result = "";
        this.changeToGame3 = 0;
    }

    create() {
        
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);

        this.textAgree = this.add.text(965, 1000, '是否感測心率，回答「同意」或「不同意」', { fontFamily: 'Arial', fontSize: 32, color: '#000000' });
        this.textAgree.setOrigin(0.5);
        this.textChoice = this.add.text(450, 800, '您說的話會顯示在這', { fontFamily: 'Arial', fontSize: 32, color: '#FFFFFF' });
        this.textChoice.setOrigin(0.5);
        this.textResult = this.add.text(965, 1040, '', { fontFamily: 'Arial', fontSize: 32, color: '#57b38a' });
        this.textResult.setOrigin(0.5);

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "cmn-Hant-TW";

        this.recognition.onstart = () => {
            this.textChoice.setText('語音辨識中');
        };

        this.recognition.onend = () => {
            if (this.recognition.status === true) {
                this.recognition.start();
            } else if (this.recognition.status === false){
                this.textChoice.setText('停止辨識');
            }
        };

        this.recognition.onresult = (event) => {
            var i = event.resultIndex;
            var j = event.results[i].length - 1;
            this.result = event.results[i][j].transcript;
            this.textChoice.setText('您說：「' + this.result + '」');
            if (this.result.includes("不") || this.result.includes("否")) {
                this.textResult.setText("3秒後重新開始遊戲...");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else if (this.result.indexOf('同意') !== -1) {
                this.textResult.setText('3秒後跳轉...');
                // this.recognition.stop();
                this.changeToGame3 = 1;
            } else {
                this.textResult.setText('再說一次');
            }
        };

        this.recognition.start();

        this.input.keyboard.on('keydown-F', () => {
            this.recognition.stop();
            setTimeout(() => {
            this.scene.start('game3Scene');
            
            }, 1000);
        });
    }

    update() {
        if (!this.spoken) { // If not spoken yet
            speechSynthesis.speak(utterance);
            this.spoken = true; // Set the flag to true
        }

        if (this.changeToGame3 === 1) {
            this.recognition.stop();
            setTimeout(() => {
            this.scene.start('game3Scene');
            
            }, 3000);
        }
    }

}
