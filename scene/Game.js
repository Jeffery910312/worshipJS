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
    question: "什麼供品代表聰明",
    options: ["青蔥", "芹菜","大蒜","蘿蔔", "礦泉水"],
    correctAnswer: 0
  },
  {
    question: "什麼供品代表精明細算",
    options: ["青蔥", "芹菜","大蒜","蘿蔔", "礦泉水"],
    correctAnswer: 2
  },
  {
    question: "什麼供品代表文思泉湧",
    options: ["青蔥", "芹菜","大蒜","蘿蔔", "礦泉水"],
    correctAnswer: 4
  },
  {
    question: "什麼供品代表勤勞",
    options: ["青蔥", "芹菜","大蒜","蘿蔔", "礦泉水"],
    correctAnswer: 1
  },
  {
    question: "什麼供品代表好彩頭",
    options: ["青蔥", "芹菜","大蒜","蘿蔔", "礦泉水"],
    correctAnswer: 3
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
        this.isSpeaking = false ;
    }
    
    create(){
        this.confuciusTemple = new ConfuciusTemple(this);
        this.confucius = new Confucius(this);
        this.dialog = new Dialog(this);

        // SOP圖片設定
        this.offerings = this.add.image(965,300,'offerings');
        this.offerings.setVisible(false);
        this.offerings.setScale(0.3);

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

        utterance.onstart = () => {
          this.isSpeaking = true;
          console.log("正在說話");
          this.input.keyboard.removeListener('keydown-ONE');
          this.input.keyboard.removeListener('keydown-TWO');
          this.input.keyboard.removeListener('keydown-THREE');
          this.input.keyboard.removeListener('keydown-FOUR');
          this.input.keyboard.removeListener('keydown-FIVE');
        };

        utterance.onend = () => {
          this.isSpeaking = false;
          console.log("閉嘴");
          // 添加新的按键监听事件
          this.input.keyboard.on('keydown-ONE', () => {
              selectedOptions.push(1);
              checkAnswer(1);
          });
      
          this.input.keyboard.on('keydown-TWO', () => {
              selectedOptions.push(2);
              checkAnswer(2);
          });
      
          this.input.keyboard.on('keydown-THREE', () => {
              selectedOptions.push(3);
              checkAnswer(3);
          });

          this.input.keyboard.on('keydown-FOUR', () => {
              selectedOptions.push(4);
              checkAnswer(4);
          });

          this.input.keyboard.on('keydown-FIVE', () => {
              selectedOptions.push(5);
              checkAnswer(5);
          });
      };
      
      

        this.input.keyboard.on('keydown-F', ()=> 
        {
            this.scene.start('game2Scene');
        });
      
    }

    update(){

        
    }
}