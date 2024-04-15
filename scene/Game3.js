import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";
// import Game2 from "./Game2.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "請持續握住保生大帝的手";
utterance.lang = "zh-TW";
utterance.rate = 1.5;

export default class Game3 extends Phaser.Scene{
    
    constructor(){
        super("game3Scene")
    }

    create()
    {
        setTimeout(() => {
        this.scene.remove('game2Scene');
        },3500);
        
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);
        // this.game2 = new Game2(this);

        // 添加音效
        this.soundCorrect = this.sound.add('correct');

        this.text3 = this.add.text(965, 1020, '請持續握住保生大帝的手', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
        this.text3.setOrigin(0.5);

        // 直接作为场景对象属性添加进度条
        this.progressBarBg = this.add.sprite(560, 200, 'progressBar');
        this.progressBarBg.setOrigin(0, 0.5);
        this.progressBarBg.alpha = 0.5;

        this.progressBar = this.add.sprite(560, 200, 'progressBar').setVisible(false);
        this.progressBar.setOrigin(0, 0.5); // 设置进度条的原点为左侧中心

        // 初始进度为0
        this.progress = 0;
        this.progressBarWidth = this.progressBar.width;

        // 模拟等待2分钟的计时器
        this.waitTimer = this.time.addEvent({
            delay: 150, // 等待时间2分钟
            callback: function() {
                this.progress += 0.001; // 每次增加1%的进度
                if (this.progress >= 1) {
                    this.progress = 1; // 进度达到100%后停止更新
                    this.waitTimer.remove(); // 移除计时器
                    this.soundCorrect.play();
                }

                // 更新进度条长度
                this.progressBar.setDisplaySize(this.progress * this.progressBarWidth, this.progressBar.height);
                this.progressBar.setVisible(true);
            },
            callbackScope: this,
            loop: true // 循环计时器，直到达到指定的总时间
        });

        // this.input.keyboard.on('keydown-F', ()=> 
        // {
        //     this.scene.add('game2Scene', this.game2, true);
        // });

    }

     update() {
        if (!this.spoken) { // If not spoken yet
            speechSynthesis.speak(utterance);
            this.spoken = true; // Set the flag to true
        }
    }
}