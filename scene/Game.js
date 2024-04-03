import Confucius from "../sprite/Confucius.js";
import ConfuciusTemple from "../sprite/ConfuciusTemple.js";
import Dialog from "../sprite/Dialog.js";

// 語音講話設定
var utterance = new SpeechSynthesisUtterance();
utterance.text = "遊戲開始";
utterance.lang = "zh-TW";
utterance.rate = 1.7;

// 定義題庫
const questions = [
  {
    question: "拉姆是什麼?",
    options: ["麻糬", "史萊姆", "植物"],
    correctAnswer: 2
  },
  {
    question: "超級拉姆一個月多少錢?",
    options: ["50", "100", "150"],
    correctAnswer: 2
  },
  {
    question: "摩爾拉雅雪山在摩爾城堡的哪個方位?",
    options: ["東", "西", "南"],
    correctAnswer: 1
  },
  {
    question: "菩提大伯的拉姆叫什麼名字?",
    options: ["小陶", "葡萄", "櫻桃"],
    correctAnswer: 1
  },
  {
    question: "台服麼麼公主的米米號是多少?",
    options: ["20000000", "20000001", "20000002"],
    correctAnswer: 1
  },
];

// 定義遊戲狀態
let currentQuestionIndex = 0;
let selectedOptions = [];

// 隨機選擇三個問題
const chosenQuestions = [];
while (chosenQuestions.length < 3) {
  const randomIndex = Math.floor(Math.random() * questions.length);
  if (!chosenQuestions.includes(randomIndex)) {
    chosenQuestions.push(randomIndex);
  }
}



export default class Game extends Phaser.Scene{
        constructor(){
        super("gameScene")
    }
    
    create(){
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);

        // SOP圖片設定
        this.offerings = this.add.image(965,300,'offerings');
        this.offerings.setVisible(false);

        // // 語音講話
        // speechSynthesis.speak(utterance);

        // 添加音效
        this.soundCorrect = this.sound.add('correct');
        this.soundWrong = this.sound.add('wrong');

        // 添加問題文字物件
        this.textQuestion = this.add.text(965,1020,'', { fontFamily: 'Arial', fontSize: 48, color: '#000000' })
        this.textQuestion.setOrigin(0.5);

        // 顯示問題
        const displayQuestion = () => {
        const questionObj = questions[chosenQuestions[currentQuestionIndex]];
        this.textQuestion.setText(questionObj.question);
        utterance.text = questionObj.question;
        speechSynthesis.speak(utterance);
        questionObj.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
        }

        // 驗證答案
        const checkAnswer = (answer) => {
        const questionObj = questions[chosenQuestions[currentQuestionIndex]];
        if (answer - 1 === questionObj.correctAnswer) {
            console.log("正確");
            this.soundCorrect.play();
        } else {
            console.log("錯誤");
            this.soundWrong.play();
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < 3) {
            displayQuestion();
        } else {
            console.log("遊戲結束！");
            this.textQuestion.setText('按照流程圖祭拜孔子');
            utterance.text = '請開始祭拜孔子';
            speechSynthesis.speak(utterance);
            this.offerings.setVisible(true);
        }
        };

        displayQuestion()

        // 监听键盘回答
        this.input.keyboard.on('keydown-ONE', ()=> {
            selectedOptions.push(1);
            checkAnswer(1);
        });

        this.input.keyboard.on('keydown-TWO', ()=> {
            selectedOptions.push(2);
            checkAnswer(2);
        });

        this.input.keyboard.on('keydown-THREE', ()=> {
            selectedOptions.push(3);
            checkAnswer(3);
        });

        this.input.keyboard.on('keydown-F', ()=> 
        {
            this.scene.start('game2Scene');
        });
        
        }

    update(){

        
    }
}