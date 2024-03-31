import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "遊戲開始。";
utterance.lang = "zh-TW";


var expectedKey = 1;
var godsArray = ["天公", "孔子", "第三個神","第四個神","第五個神","第六個神","虎爺"];

export default class Game extends Phaser.Scene{
        constructor(){
        super("gameScene")
    }
    
    create(){
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);
        

        speechSynthesis.speak(utterance);

        // 添加文字对象
        this.text = this.add.text(965, 1000, '孔子的供品說明', { fontFamily: 'Arial', fontSize: 48, color: '#57b38a' });
        this.text.setOrigin(0.5);
        this.text.setVisible(false);

        // 监听键盘事件
        this.input.keyboard.on('keydown-Q', ()=> {
            // 按下 Q 键时显示文字
            this.dialog.showDialog();
            this.text.setVisible(true);
        });

        this.input.keyboard.on('keyup-Q', ()=> {
            // 放开 Q 键时隐藏文字
            this.dialog.hideDialog();
            this.text.setVisible(false);
        });

        document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        checkSequence(1);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === '2') {
        checkSequence(2);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === '3') {
        checkSequence(3);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === '4') {
        checkSequence(4);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === '5') {
        checkSequence(5);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === '6') {
        checkSequence(6);
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === '7') {
        checkSequence(7);
    }
});


// let expectedKey = 1;

        function checkSequence(keyPressed) {
            if (keyPressed == expectedKey) {
                // 如果按键顺序正确，增加期待的按键值
                expectedKey++;
                if (expectedKey > 7) {
                    // alert("恭喜！您已按下全部按键。");
                    // expectedKey = 1;
                }
            } else {
                // 如果按键顺序错误，显示正确的按键值
                utterance.text = "請先去拜" + godsArray[expectedKey-1];
                speechSynthesis.speak(utterance);
                // alert("请按下 " + expectedKey + " 键。");
            }
        }

        
        //切換場景
            this.input.keyboard.on('keydown-B', () => {
                this.scene.start('game2Scene');
            });

        }

    update(){

        if(expectedKey > 7)
        {
            this.scene.start('game2Scene');
        }

        this.confucius.update()
    }
}