export default class Dialog extends Phaser.GameObjects.Graphics{
    constructor(scene){
        super(scene,0,0)

        // 定義矩形的位置和大小
        
        this.rectX = 550;
        this.rectY = 970;
        this.rectWidth = 850;
        this.rectHeight = 100;
        this.cornerRadius = 15;

        // 填充樣式
        this.fillStyle(0xFFFFFF, 0.9);

        scene.add.existing(this)

        // 繪製矩形
        this.fillRoundedRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight,this.cornerRadius);
     
    }

    // 显示对话框
    showDialog() {
        this.clear(); // 清除原有的绘制
        this.fillRoundedRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight,this.cornerRadius);
        console.log("show dialog");
    }

    // // 隐藏对话框
    hideDialog() {
        this.clear(); // 清除绘制，即隐藏对话框
        console.log("hide dialog");
    }

    update(){
        
    }
}