import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
utterance.text = "先放供品再參拜";
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
        this.text = this.add.text(965, 1020, '先放上孔子供品，再按順序參拜', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
        this.text.setOrigin(0.5);

        // 供品說明圖片
        this.offerings = this.add.image(965,300,'offerings');
        this.offerings.setVisible(false);

        // 监听键盘事件
        this.input.keyboard.on('keydown-Q', ()=> {
            this.offerings.setVisible(true);
            
        });

        this.input.keyboard.on('keyup-Q', ()=> {
            this.offerings.setVisible(false);
            
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
                
            } else if (expectedKey <= 7){
                // 如果按键顺序错误，显示正确的按键值
                utterance.text = "請先去拜" + godsArray[expectedKey-1];
                speechSynthesis.speak(utterance);
                // alert("请按下 " + expectedKey + " 键。");
            }
        }

        
        //切換場景，如果語音辨識停掉的話
            this.input.keyboard.on('keydown-B', () => {
                expectedKey = 8;
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