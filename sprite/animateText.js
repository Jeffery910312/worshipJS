// ../animateText.js
export default class AnimateText {
    constructor() {
        // 要显示的文字
        this.text = "";
        
        this.container = document.createElement('div');
        this.container.style.position = "absolute";
        this.container.style.left = "965px"; // 设定左边距
        this.container.style.top = "1020px"; // 设定顶边距
        this.container.style.transform = "translate(-50%, -50%)"; // 使用 transform 来实现中心点对齐
        document.body.appendChild(this.container);

        // 在容器中创建用于显示文字的<p>元素
        this.typingElement = document.createElement('p');
        this.typingElement.style.fontFamily = "Arial, sans-serif"; 
        this.typingElement.style.fontSize = "24px";
        this.typingElement.textContent = this.text;
        this.container.appendChild(this.typingElement);

        this.typingElement = document.createElement('pre');
        this.typingElement.style.fontFamily = "Arial, sans-serif"; 
        this.typingElement.style.fontSize = "24px";
        this.container.appendChild(this.typingElement);

        // 初始化索引
        this.index = 0;
        this.typingTimeout; // 保存打字效果的定时器

        // 绑定 this 到 typeWriter 函数
        this.typeWriter = this.typeWriter.bind(this);
    }

    // 创建打字效果的方法
    typeWriter() {
        if (this.index < this.text.length) {
            // 将文字逐步显示在元素中
            this.typingElement.textContent += this.text.charAt(this.index);
            this.index++;
            this.typingTimeout = setTimeout(this.typeWriter, 100); // 调整打字的速度
        }
    }

    // 初始化打字效果的方法
    init() {
        this.typeWriter();
    }

    // 更新文字的方法
    updateText(newText) {
        // 停止当前的打字效果
        clearTimeout(this.typingTimeout);

        // 重置索引和清空显示的文字
        this.index = 0;
        this.typingElement.textContent = "";

        // 更新text变量的值
        this.text = newText;

        // 重新开始打字效果
        this.typeWriter();
    }

    // 调整文字大小的方法
    setFontSize(size) {
    this.typingElement.style.fontSize = size + "px";
    }

}

