export default class Game2 extends Phaser.Scene{
    constructor(){
        super("game2Scene")
    }
    
    create(){
        // 在这里创建并显示文本
        var text = this.add.text(950, 200, '選擇是否感測心率', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

        var textChoice = this.add.text(950, 400, '您好', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

        document.addEventListener("DOMContentLoaded", function() {
            var recognition = new webkitSpeechRecognition(); //new 一個語音辨識物件
            // 語音辨識參數設定
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "cmn-Hant-TW";
            recognition.status = true;  // 手動添加判斷，避免如果五分鐘沒有語音，就會自動停止
            recognition.onstart = function() {
            textChoice.setText('語音辨識中');
            };
            recognition.onend = function() {
            if(recognition.status === true) {
            recognition.start();
            } else {
            textChoice.setText('停止辨識');
            }
            };

            recognition.onresult = function(event) {
                var i = event.resultIndex;
                var j = event.results[i].length - 1;
                result = event.results[i][j].transcript; // 取出語音辨識結果
                textChoice.setText(result); // 顯示語音辨識結果
            };
            recognition.start();
        });

        this.input.keyboard.on('keydown-B', () => {
            this.scene.start('gameScene');
        });

    }

    update(){
        
    }
}