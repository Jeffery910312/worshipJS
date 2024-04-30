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

        var LF_percentage,HF_percentage,LF_HF_ratio;

        utterance.text = "請稍後，正在檢查您的健康狀態...";
        speechSynthesis.speak(utterance);

        //加載CSV
        // 确保文件路径正确
        // 尝试直接访问文件，看是否可以成功加载

        // 客户端代码（浏览器环境）
        fetch('http://localhost:5500/latestCSV') // 调用服务器端API '/latestCSV'
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
            LF_percentage = dataArray[20];
            HF_percentage = dataArray[21];
            LF_HF_ratio = dataArray[22];
        })
        .catch(error => {
            console.error('Failed to load latest CSV file', error);
        });

        
        


        setTimeout(() => {
            console.log(LF_percentage, HF_percentage, LF_HF_ratio); 
            

            if(LF_percentage >= 90 && HF_percentage >= 90 && LF_HF_ratio >= 1.5){
                this.text4.setText('你很健康');
                utterance.text = "你很健康";
                speechSynthesis.speak(utterance);
            }
            else if(LF_percentage < 90 || HF_percentage < 90 || LF_HF_ratio < 1.5){            
                this.text4.setText('你可能有些問題');
                utterance.text = "你可能有些問題";
                speechSynthesis.speak(utterance);
            }
            else{
                this.text4.setText('窩不知道');  
                utterance.text = "窩不知道";
                speechSynthesis.speak(utterance);
            }

        }, 4000);

        
    }
}