import Confucius from "../sprite/Confucius.js";
import Baosheng from "../sprite/Baosheng.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";


var utterance = new SpeechSynthesisUtterance();
utterance.lang = "zh-TW";
utterance.rate = 1.5;


export default class Game4 extends Phaser.Scene{
    
    constructor(){
        super("game4Scene")
    }

    create()
    {
        setTimeout(() => {
        this.scene.remove('game3Scene');
        },3500);

        

        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.baosheng = new Baosheng(this);
        this.dialog = new Dialog(this); 
        this.baosheng.x = 1150;
        this.text4 = this.add.text(965,1020,'請稍後，正在檢查您的健康狀態...', { fontFamily: 'Arial', fontSize: 48, color: '#000000' })
        this.text4.setOrigin(0.5);

        var SDNN,LF,HF;

        utterance.text = "請稍後，正在檢查您的健康狀態...";
        speechSynthesis.speak(utterance);


        this.input.keyboard.on('keydown-H', ()=> 
            {
            // 客户端代码（浏览器环境）
            fetch('http://127.0.0.1:5500/latestCSV') // 调用本地服务器端API '/latestCSV'
            .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch latest CSV file');
            }
            return response.text();
            })
            .then(csv => {
            console.log('Latest CSV file loaded:', csv);
                var dataArray = csv.split(',');
                console.log('Extracted data:', dataArray);
                SDNN = dataArray[12];
                LF = dataArray[18];
                HF = dataArray[19];
            })
            .catch(error => {
                console.error('Failed to load latest CSV file', error);
            });

            
            


            setTimeout(() => {
                console.log(SDNN, LF, HF); 

                var type;
                const SDNN_Upper = 141 + 39;
                const SDNN_Lower = 141 - 39;
                const SDNN_Low_Lower = 30;
                const LF_Upper = 1170 + 416;
                const LF_Lower = 1170 - 416;
                const HF_Upper = 975 + 203;
                const HF_Lower = 975 - 203;
                
                //型態判斷
                if (SDNN > SDNN_Upper) {
                    
                    if (LF > LF_Upper && HF <= HF_Lower) {
                        type = 1;
                    } else if (LF <= LF_Lower && HF > HF_Upper) {
                        type = 2;
                    }else if (LF > LF_Upper && HF > HF_Upper) {
                        type = 4;
                    }else if (LF > LF_Upper && HF <= HF_Upper && HF > HF_Lower) {
                        type = 6.1;
                    }else if (LF <= LF_Upper && LF > LF_Lower && HF > HF_Upper) {
                        type = 6.2;
                    }else {
                        type = 0;
                    }

                } else if (SDNN <= SDNN_Upper && SDNN > SDNN_Lower) {

                    if (LF > LF_Upper && HF <= HF_Lower) {
                        type = 1;
                    } else if (LF <= LF_Lower && HF > HF_Upper) {
                        type = 2;
                    }else if (LF <= LF_Upper && LF > LF_Lower && HF <= HF_Upper && HF > HF_Lower) {
                        type = 8;
                    }else {
                        type = 0;
                    }

                } else if (SDNN <= SDNN_Lower && SDNN > SDNN_Low_Lower) {

                    if (LF > LF_Upper && HF <= HF_Lower) {
                        type = 1;
                    } else if (LF <= LF_Lower && HF > HF_Upper) {
                        type = 2;
                    }else if (LF <= LF_Lower && HF <= HF_Lower) {
                        type = 3;
                    }else if (LF <= LF_Lower && HF > HF_Lower && HF <= HF_Upper) {
                        type = 7.1;
                    }else if (LF <= LF_Upper && LF > LF_Lower && HF <= HF_Lower) {
                        type = 7.2;
                    }else {
                        type = 0;
                    }
                        
                } else if (SDNN <= SDNN_Low_Lower) {
                    if (LF > LF_Upper && HF <= HF_Lower) {
                        type = 1;
                    } else if (LF <= LF_Lower && HF > HF_Upper) {
                        type = 2;
                    }else if (LF <= LF_Lower && HF <= HF_Lower) {
                        type = 5;
                    }else {
                        type = 0;   
                    }
                } else {

                    if (LF > LF_Upper && HF <= HF_Lower) {
                        type = 1;
                    } else if (LF <= LF_Lower && HF > HF_Upper) {
                        type = 2;
                    }else {
                        type = 0;  
                    } 
                }
                
                //輸出
                switch(type){
                    case 0:
                        this.text4.setText('窩不知道');
                        utterance.text = "窩不知道";
                        speechSynthesis.speak(utterance);
                        break;
                    case 1:
                        this.text4.setText('您可能容易緊張');
                        utterance.text = "您可能容易緊張";
                        speechSynthesis.speak(utterance);       
                        break;
                    case 2:
                        this.text4.setText('您可能睡眠品質不良');
                        utterance.text = "您可能睡眠品質不良";
                        speechSynthesis.speak(utterance);
                        break;
                    case 3:
                        this.text4.setText('您可能需要休息一下');
                        utterance.text = "您可能需要休息一下";
                        speechSynthesis.speak(utterance);
                        break;
                    case 4:
                        this.text4.setText('您可能壓力很大');
                        utterance.text = "您可能壓力很大";
                        speechSynthesis.speak(utterance);
                        break;
                    case 5:
                        this.text4.setText('您可能需要檢查糖尿病');
                        utterance.text = "您可能需要檢查糖尿病";
                        speechSynthesis.speak(utterance);
                        break;
                    case 6.1:
                        this.text4.setText('您可能很常焦慮');
                        utterance.text = "您可能很常焦慮";
                        speechSynthesis.speak(utterance);
                        break;
                    case 6.2:
                        this.text4.setText('您需要避免刺激');
                        utterance.text = "您需要避免刺激";
                        speechSynthesis.speak(utterance);
                        break;
                    case 7.1:
                        this.text4.setText('您可能活動力不足');
                        utterance.text = "您可能活動力不足";
                        speechSynthesis.speak(utterance);
                        break;
                    case 7.2:
                        this.text4.setText('您可能睡眠不足');
                        utterance.text = "您可能睡眠不足";
                        speechSynthesis.speak(utterance);
                        break;
                    case 8:
                        this.text4.setText('您很健康');
                        utterance.text = "您很健康";
                        speechSynthesis.speak(utterance);
                        break;
                }


                this.input.keyboard.on('keydown-D', ()=> 
                {
                    this.text4.setText("3秒後重新開始...");
                    utterance.text = "3秒後重新開始";
                    speechSynthesis.speak(utterance);
                    this.input.keyboard.removeListener('keydown-D');
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                    
            });

            }, 500);

        
        });
    }
}