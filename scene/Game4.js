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

        //加載CSV
        // 确保文件路径正确
        // 尝试直接访问文件，看是否可以成功加载

        this.csv = this.cache.text.get('https://github.com/Jeffery910312/worshipJS/blob/0402/data/test1.csv');
        if(this.csv) {
        // 在解析之前打印一些调试信息
        console.log('CSV file loaded:', this.csv);
        // 继续使用PapaParse解析CSV
        this.data = Papa.parse(this.csv).data;
        this.dialog.dialogData = this.data;
        } else {
        console.error('Failed to load CSV file');
        }
        
        var LF_percentage = this.data[2][10];
        var HF_percentage = this.data[2][11];
        var LF_HF_ratio = this.data[2][12];

        if(LF_percentage >= 90 && HF_percentage >= 90 && LF_HF_ratio >= 1.5){
            this.dialog.text = "你很健康";
            this.dialog.showDialog();
        }
        else if(LF_percentage < 90 || HF_percentage < 90 || LF_HF_ratio < 1.5){            
            this.dialog.text = "很遺憾，你不太健康。";  
            this.dialog.showDialog();  
        }

        
    }
}