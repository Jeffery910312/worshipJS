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
        
        this.load.image("confucius",'https://media.discordapp.net/attachments/1215919429830053888/1223901557452574770/66b3a7466d61b345.png?ex=661b8a26&is=66091526&hm=e7690486fbaa3bb66f096fefccf9c5c3ee3e77d1cddf6beb40e2e1c1a05395c3&=&format=webp&quality=lossless&width=350&height=350')
        // this.load.image("guanwe1Mao",'../assets/guanwe1Mao.png')
        this.load.image("confuciusTemple",'https://cdn.discordapp.com/attachments/1215919429830053888/1223907956463112272/confuciusTemple.png?ex=661b901b&is=66091b1b&hm=54776ae41ba74bb333abafc2c869804a2da30400f707aef98f0720c70d4c656c&')
    }
    create(){
        //anims
    }
}