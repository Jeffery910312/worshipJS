export default class Boot extends Phaser.Scene{
    constructor(){
        super("bootScene")
    }
    preload(){
        // 创建进度条
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(width / 4, height / 2, width / 2 * value, 30);
        }, this);

        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });

        this.load.on('complete', function () {
            console.log('complete');
            this.progressBar.destroy();
            this.progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            this.scene.start("gameScene");
        }, this);
        
        this.load.image("confucius",'assets/confucius.png')
        // this.load.image("guanwe1Mao",'../assets/guanwe1Mao.png')
        this.load.image("confuciusTemple",'assets/confuciusTemple6.png')

        this.load.image("offerings",'assets/offerings.png')

        this.load.image("progressBar",'assets/progressBar.png')

        this.load.audio("correct",'assets/correct.mp3')

        this.load.audio("wrong",'assets/wrong.mp3')
    }
    create(){
        //anims
    }
}