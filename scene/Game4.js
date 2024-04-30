import Confucius from "../sprite/Confucius.js";
import Baosheng from "../sprite/Baosheng.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

var utterance = new SpeechSynthesisUtterance();
// utterance.text = "請持續握住保生大帝的手，等待進度條完成。";
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

        //加載CSV
        // 确保文件路径正确
        // 尝试直接访问文件，看是否可以成功加载

        // 例如 CSV 文件存储在 c:\My Program\JS\worshipJS\data\test1.csv
        fetch('../data/test1.csv')
        .then(response => response.text())
        .then(csv => {
            console.log('CSV file loaded:', csv);
            // 继续使用PapaParse解析CSV
            this.data = Papa.parse(csv).data;
            this.dialog.dialogData = this.data;
        })
        .catch(error => {
        console.error('Failed to load CSV file', error);
        });
        
        


        setTimeout(() => {
            var LF_percentage = this.data[1][9];
            var HF_percentage = this.data[1][10];
            var LF_HF_ratio = this.data[1][11];
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

        }, 1000);

        
    }
}