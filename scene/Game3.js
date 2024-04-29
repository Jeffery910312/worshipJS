import Confucius from "../sprite/Confucius.js";
import Baosheng from "../sprite/Baosheng.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "請持續握住保生大帝的手，等待進度條完成。";
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
        this.baosheng = new Baosheng(this);
        this.dialog = new Dialog(this);

        // 儲存原始的 x 和 y 位置以供後續使用
        let originalX = this.confucius.x;
        let originalY = this.confucius.y;

        // 將 'confucius' 精靈水平翻轉
        this.confucius.flipX = true;

        // 將 'confucius' 移動到指定的座標 (2000, 545)
        this.tweens.add({
            targets: this.confucius,
            x: 2100,
            y: 545,
            duration: 1000, // 以毫秒為單位
            ease: 'Power2',
            onComplete: () => {
                // 暫停 0.5 秒
                this.time.delayedCall(500, () => {
                    // 將 'confucius' 精靈水平翻轉回原始方向
                    this.confucius.flipX = false;
                    this.tweens.add({
                    targets: this.baosheng,
                    x: 1150,
                    duration: 1000, // 动画持续时间（毫秒）
                    ease: 'Power2',
                    yoyo: false,
                    repeat: 0
                    });

                    // 將 'confucius' 移回原始位置
                    this.tweens.add({
                        targets: this.confucius,
                        x: originalX,
                        y: originalY,
                        duration: 1000, // 以毫秒為單位
                        ease: 'Power2'
                    });
                });
                
            }
        });


        


        this.text3 = this.add.text(965, 1020, '請持續握住保生大帝的手', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
        this.text3.setOrigin(0.5);

        // 直接作为场景对象属性添加进度条
        this.progressBarBg = this.add.sprite(560, 900, 'progressBar');
        this.progressBarBg.setOrigin(0, 0.5);
        this.progressBarBg.alpha = 0.5;

        this.progressBar = this.add.sprite(560, 900, 'progressBar').setVisible(false);
        this.progressBar.setOrigin(0, 0.5); // 设置进度条的原点为左侧中心

        // 初始进度为0
        this.progress = 0;
        this.progressBarWidth = this.progressBar.width;

        // 模拟等待2分钟的计时器
        this.waitTimer = this.time.addEvent({
            // delay: 150, // 等待时间2分钟
            delay: 10, // 等待10秒
            callback: function() {
                this.progress += 0.001; // 每次增加1%的进度
                if (this.progress >= 1) {
                    this.progress = 1; // 进度达到100%后停止更新
                    this.waitTimer.remove(); // 移除计时器
                    this.text3.setText("感測完畢,等待結果完成");
                    utterance.text = "感測完畢";
                    speechSynthesis.speak(utterance);
                    setTimeout(() => {
                        this.scene.start('game4Scene');
                    }, 5000);
                }

                // 更新进度条长度
                this.progressBar.setDisplaySize(this.progress * this.progressBarWidth, this.progressBar.height);
                this.progressBar.setVisible(true);
            },
            callbackScope: this,
            loop: true // 循环计时器，直到达到指定的总时间
        });

            // 定义倒计时文本
            this.timerText = this.add.text(965, 1060, '', { fontFamily: 'Arial', fontSize: 32, color: '#000000' });
            this.timerText.setOrigin(0.5);

            // 定义倒计时的总时间（秒）
            this.totalTime = 150;
            this.remainingTime = this.totalTime;

            // 创建计时器，每秒更新一次倒计时文本
            this.timer = this.time.addEvent({
                delay: 1000, // 1000毫秒（1秒）的间隔
                callback: this.updateTimer,
                callbackScope: this,
                loop: true
            });


        // this.input.keyboard.on('keydown-F', ()=> 
        // {
        //     this.scene.add('game2Scene', this.game2, true);
        // });

    }

        // 在 updateTimer 方法中更新倒计时文本并检查时间是否耗尽
        updateTimer() {
            this.remainingTime--; // 每秒减少1秒

            if (this.remainingTime >= 0) {
                // 更新倒计时文本
                let minutes = Math.floor(this.remainingTime / 60);
                let seconds = this.remainingTime % 60;
                this.timerText.setText(`剩餘時間: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            } else {
                // 时间耗尽，处理相应逻辑
                this.timer.remove(); // 移除计时器
                this.handleTimeUp(); // 处理时间耗尽事件
            }
        }

        // 在 handleTimeUp 方法中处理时间耗尽的逻辑
        handleTimeUp() {
            // 在时间耗尽时执行的逻辑，例如结束游戏或重置场景等
            // 可以根据需要进行修改
            console.log('Time is up!'); // 示例：在控制台打印消息
        }


     update() {
        if (!this.spoken) { // If not spoken yet
            speechSynthesis.speak(utterance);
            this.spoken = true; // Set the flag to true
        }
    }
}