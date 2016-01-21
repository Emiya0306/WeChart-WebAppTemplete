# 微信web应用模板框架

[![Version][version]][version]

一个基于expressjs服务器的简单微信web应用框架

### 文档以及帮助

- [暂时没有](#)

### 支持的浏览器

暂时没有文档

### 如何安装

首先机器上需要有nodejs运行环境，如果没有请去[nodejs.org](https://nodejs.org/)官网上下载。

然后在cmd中输入如下指令：

```bash
# 克隆项目
git clone https://github.com/Emiya0306/WeChart-WebAppTemplete.git

# 安装依赖包
npm install

# 运行项目
npm start
```

### 版本 和 依赖包

暂缺

### 框架的好处

在浏览器中，你只需获得微信web应用的根节点、设备长度和宽度，交给webchat执行即可，webchat会自动做到翻页效果。

```js

var myApp = document.getElementById('app');
var webchat = new webchat(myApp, document.body.clientHeight, document.body.clientWidth);

```

还可以调取API，直接跳页翻页效果。

```html
<button onClick="webchat.movePage(3);">test</button>
```

### Thanks

Roger
