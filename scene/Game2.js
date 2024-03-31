import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";

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

        var textAgree = this.add.text(700, 1000, '是否同意感測心率，回答同意或不同意', { fontFamily: 'Arial', fontSize: 32, color: '#57b38a' });
        var textChoice = this.add.text(800, 400, '您說的話會顯示在這', { fontFamily: 'Arial', fontSize: 32, color: '#57b38a' });
        var textResult = this.add.text(800, 600, '結果', { fontFamily: 'Arial', fontSize: 32, color: '#57b38a' });

        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = "cmn-Hant-TW";

        this.recognition.onstart = () => {
            textChoice.setText('語音辨識中');
        };

        this.recognition.onend = () => {
            if (this.recognition.status === true) {
                this.recognition.start();
            } else {
                textChoice.setText('停止辨識');
            }
        };

        this.recognition.onresult = (event) => {
            var i = event.resultIndex;
            var j = event.results[i].length - 1;
            this.result = event.results[i][j].transcript;
            textChoice.setText(this.result);
            if (this.result.includes("不") || this.result.includes("否")) {
                textResult.setText("3秒後重新開始遊戲...");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else if (this.result.indexOf('同意') !== -1) {
                textResult.setText('3秒後跳轉...');
                this.recognition.stop();
                this.changeToGame3 = 1;
            } else {
                textResult.setText('再說一次');
            }
        };

        this.recognition.start();

        this.input.keyboard.on('keydown-B', () => {
            this.scene.start('gameScene');
        });
    }

    update() {
        if (this.changeToGame3 === 1) {
            setTimeout(() => {
            this.scene.start('game3Scene');
            }, 3000);
        }
    }

    // 在场景销毁时停止语音识别
    shutdown() {
        this.recognition.stop();
    }
}
