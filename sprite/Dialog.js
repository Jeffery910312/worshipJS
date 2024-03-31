export default class Dialog extends Phaser.GameObjects.Graphics{
    constructor(scene){
        super(scene,0,0)

        // 定義矩形的位置和大小
        this.rectX = 570;
        this.rectY = 970;
        this.rectWidth = 800;
        this.rectHeight = 100;

        // 填充樣式
        this.fillStyle(0xFFFFFF, 0.8);

        scene.add.existing(this)

        // 隐藏对话框
        this.hideDialog();

        // // 繪製矩形
        // this.fillRect(rectX, rectY, rectWidth, rectHeight);
     
    }

    // 显示对话框
    showDialog() {
        this.clear(); // 清除原有的绘制
        this.fillRect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    }

    // 隐藏对话框
    hideDialog() {
        this.clear(); // 清除绘制，即隐藏对话框
    }

    update(){
        
    }
}