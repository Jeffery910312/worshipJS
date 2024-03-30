var recognition = new webkitSpeechRecognition(); //new 一個語音辨識物件
var result;

var changeToGame3 = 0;
// 語音辨識參數設定
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "cmn-Hant-TW";
recognition.status = true;  // 手動添加判斷，避免如果五分鐘沒有語音，就會自動停止

export default class Game2 extends Phaser.Scene{
    
    constructor(){
        super("game2Scene")
    }

    
    create(){
        var textAgree = this.add.text(950, 200, '是否同意感測心率，回答同意或不同意', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

        var textChoice = this.add.text(950, 400, '您說的話會顯示在這', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

        var textResult = this.add.text(950, 600, '結果', { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });

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
                if(result.includes("不") || result.includes("否"))
                {
                    textResult.setText("3秒後重新開始遊戲...")
                    setTimeout(function() {
                    location.reload();
                    }, 3000);
                }
                else if(result.indexOf('同意')!== -1)
                {
                    textResult.setText('3秒後跳轉...')
                    recognition.stop();
                    changeToGame3 = 1;
                    
                }
                else 
                {
                    textResult.setText('再說一次')
                }
            };
            recognition.start();

            

        
        this.input.keyboard.on('keydown-B', () => {
            this.scene.start('gameScene');
        });

    }

    
    update(){

        if (changeToGame3 === 1) {
        
        this.scene.start('game3Scene'); // 假設場景3的鍵值為'Scene3'
        
        }
        

        
            
            
        
    }
}