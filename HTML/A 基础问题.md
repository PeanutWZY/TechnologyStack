# HTML篇——面试题

## 页面渲染html的过程
整个渲染过程其实就是将URL对应的各种资源，通过浏览器渲染引擎的解析，输出可视化的图像。
URL:统一资源定位符(Uniform Resoure Locator)
URI:在于I(Identifier)是统一资源标示符，可以唯一标识一个资源。

引出：URI,URL,URN
URI可以分为URL,URN或同时具备locators 和names特性的一个东西。URN作用就好像一个人的名字，URL就像一个人的地址。换句话说：URN确定了东西的身份，URL提供了找到它的方式。
举个例子：动物住址协议://地球/中国/浙江省/杭州市/西湖区/某大学/14号宿舍楼/525号寝/张三.人。可以看到，这个字符串标识出了唯一的一个人，起到了URI的作用，所以URL是URI的一个子集。
在上文我们用身份证号也可以唯一确定一个人。对于这个在杭州的张三，我们也可以用：
身份证号：123456789来标识他。
所以不论是用定位的方式还是用编号的方式，我们都可以唯一确定一个人，都是URl的一种实现，而URL就是用定位的方式实现的URI。

渲染模块：
HTML解释器：解释HTML语言的解释器，本质是将HTML文本解释成DOM树（文档对象模型）。
CSS解释器：解释样式表的解释器，其作用是将DOM中的各个元素对象加上样式信息，从而为计算最后结果的布局提供依据。
布局：将DOM和css样式信息结合起来，计算它们的大小位置等布局信息，形成一个能够表示这所有信息的内部表示模型即渲染树。
JavaScript引擎：JavaScript可以修改网页的内容，也能修改CSS的信息，JavaScript引擎解释JavaScript代码并把代码的逻辑和对DOM和CSS的改动信息应用到布局中去，从而改变渲染的结果。

基本过程：
1.解析HTML文件，创建DOM树
浏览器解析html源码，然后创建一个 DOM树。并行请求 css/image/js在DOM树中，每一个HTML标签都有一个对应的节点，并且每一个文本也都会有一个对应的文本节点。DOM树的根节点就是 documentElement，对应的是html标签。
2.解析CSS,形成CSS对象模型
浏览器解析CSS代码，计算出最终的样式数据。构建CSSOM树。对CSS代码中非法的语法它会直接忽略掉。解析CSS的时候会按照如下顺序来定义优先级：
浏览器默认设置 < 用户设置 < 外链样式 < 内联样式 < html中的style。
3.将CSS与DOM合并，构建渲染树（renderingtree）
DOM Tree + CSSOM –> 渲染树（rendering tree）。渲染树和DOM树有点像，但是是有区别的。DOM树完全和html标签一一对应，但是渲染树会忽略掉不需要渲染的元素，比如head、display:none的元素等。而且一大段文本中的每一个行在渲染树中都是独立的一个节点。渲染树中的每一个节点都存储有对应的css属性。
4.布局和绘制
一旦渲染树创建好了，浏览器就可以根据渲染树直接把页面绘制到屏幕上。
以上四个步骤并不是一次性顺序完成的。如果DOM或者CSSOM被修改，以上过程会被重复执行。实际上，CSS和JavaScript往往会多次修改DOM或者CSSOM。

Repaint(重绘)
重绘是改变不影响元素在网页中的位置的元素样式时，譬如background-color(背景色)， border-color(边框色)， visibility(可见性)，浏览器会根据元素的新属性重新绘制一次(这就是重绘，或者说重新构造样式)，使元素呈现新的外观。重绘不会带来重新布局，所以并不一定伴随重排。
Reflow（重排）
渲染对象在创建完成并添加到渲染树时，并不包含位置和大小信息。计算这些值的过程称为布局或重排。
"重绘"不一定需要"重排"，比如改变某个网页元素的颜色，就只会触发"重绘"，不会触发"重排"，因为布局没有改变。
但是，"重排"必然导致"重绘"，比如改变一个网页元素的位置，就会同时触发"重排"和"重绘"，因为布局改变了。

引出问题：浏览器如何优化渲染？
（1）将多次改变样式属性的操作合并成一次操作

（2）将需要多次重排的元素，position属性设为absolute或fixed，

这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。

（3）由于display属性为none的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。

如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发2次重排。

---
## HTML5新特性，语义化
* 新的语义标签
  * article 独立的内容。
  * aside 侧边栏。
  * header 头部。
  * nav 导航。
  * section 文档中的节。
  * footer 页脚。
* 画布(Canvas) API
* 地理(Geolocation) API
* 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；sessionStorage 的数据在浏览器关闭后自动删除
* 新的技术webworker, websocket, Geolocation
* 拖拽释放(Drag and drop) API
* 音频、视频API(audio,video)
* 表单控件，calendar、date、time、email、url、search

**语义化定义：** 合理正确的使用语义化的标签来创建页面结构。（正确的标签做正确的事）
在HTML5出来之前，我们习惯于用div来表示页面的章节或者不同模块，但是div本身是没有语义的。但是现在，HTML5中加入了一些语义化标签，来更清晰的表达文档结构。主要得话有`<header></header>`, `<nav></nav>`, `<section></section>`, `<aside></aside>`, `<footer></footer>` 等
**作用：**
1. 让页面的内容结构化、便于浏览器或者搜索引擎解析；
2. 即使没有CSS也可以以文档格式展示，方便阅读；
3. 搜索引擎的爬虫也依赖于HTML标记来确定上下各个关键字的权重，利于SEO（搜索引擎优化）
4. 使阅读源码的人更容易将网站代码分块，编译维护与理解。


---

### 浏览器的标准模式和怪异模式
标准模式：浏览器按W3C标准解析执行代码；
怪异模式：使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以称之为怪异模式。
浏览器解析时使用标准模式还是怪异模式，与网页中的DTD声明直接相关，DTD声明定义了标准文档的类型（标准模式解析）文档类型，会使浏览器使用相关的方式加载网页并显示，忽略DTD声明，将使网页进入怪异模式（quirks mode）。

---

## xhtml和html的区别
1、XHTML与HTML最大的区别：
　　① XHTML标签名必须小写（错误：<Div> 正确：<div>）
　　② XHTML元素必须被关闭（错误：<p>  正确：<p></p>）
　　③ XHTML元素必须被正确的嵌套（错误：<div><p></div></p> 正确：<div><p></p></div>）
　　④ XHTML元素必须要有根元素（必须包含<html>）
2、XHTML与HTML5区别：
　　① HTML5新增了canvas绘画元素
　　② HTML5新增了用于绘媒介回放的video和audio元素
　　③ 更具语义化的标签，便于浏览器识别
　　④ 对本地离线存储有更好的支持，可通过offline实现
　　⑤ MATHML，SVG等，更好的render
　　⑥ 添加了新的表单控件：calendar、date、time、email、url、search
3、HTML、XHTML、HTML5之间联系
　　XHTML是HTML规范版本；
　　HTML5是HTML、XHTML以及HTML DOM 的新标准

---
## 使用data-的好处
为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过 getAttribute方法获取
`<div data-author="david" data-time="2011-06-20" data-comment-num="10">...</div>`
div.dataset.commentNum; // 10

---
## canvas
[canvas如何用](https://blog.csdn.net/u012468376/article/details/73350998)

---
## css js放置位置和原因
css放html代码之前，避免页面的回流重绘
js放最后，避免页面渲染代码阻塞

---
## 什么是渐进式渲染
渐进式渲染是用来提高网页性能，以尽快呈现页面的技术。
1、图片懒加载——页面上的图片不会一次性的全部加载，当用户滚动页面到图片位置时，JS将加载并显示图像。
2、确定显示内容的优先级——为了尽快将页面呈现给用户，页面只将一小部分CSS，脚本，内容加载，然后在延时加载或者监听事件来加载。
3、异步加载HTML片段——当页面通过后台渲染时，把HTML拆分，通过异步请求，分块发送给浏览器。

---
## meta标签
！！`<meta>` 标签是 HTML 语言头部的一个辅助性标签，我们可以定义页面编码语言、搜索引擎优化、自动刷新并指向新的页面、控制页面缓冲、响应式视窗等！

## meta viewport原理
`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`
该meta标签的作用是让当前viewport的宽度等于设备的宽度，同时不允许用户手动缩放。当然maximum-scale=1.0, user-scalable=0不是必需的，是否允许用户手动播放根据网站的需求来定，但把width设为width-device基本是必须的，这样能保证不会出现横向滚动条。

---
## title与alt属性的区别
*title* 是关于元素的注释信息，主要给用户阅读
*alt* 是给搜索引擎识别，在图像上无法显示的替代文本
比如：鼠标hover在图片或文字上时有title文字显示。在图片加载不出来时替换为alt文字显示。
**注意！！！：** 定义img时，尽量保证alt和title写全

---
## href与src
*href（Hypertext Reference）* 指定网络资源的位置，在当前元素或者文档与定义锚点与资源之间建立一个链接关系。（目的不是为了引用资源，而是为了建立联系，实现标签能够链接到目标地址）
*src（source）* 指向外部资源位置，指向内容回应用到文档中当前标签所在位置。
**区别：**
1. 请求资源不同：href是链接地址，src是具体资源内容
2. 作用结果不同：href是建立联系（如跳转），src用于替换当前内容
3. 浏览器解析方式不同：当浏览器解析到src ，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

---
## 优化方案
**分析方向：**

* 页面加载性能
* 动画与操作性能
* 内存占用
* 电量消耗

**优化方向：**

* 减少http请求
* 减小文件大小（资源压缩，图片压缩，代码压缩）
* CDN（第三方库，大文件，大图）
* SSR服务器渲染，预渲染
* 懒加载
* 分包
* 减少dom操作，避免回流，文档碎片

*js 运算效率的提升 称不上性能优化*

---

## [GET和POST的区别](https://github.com/febobo/web-interview/issues/145)

* get参数通过url传递，post放在request body中
* get请求在url中传递的参数是有长度限制的，而post没有
* post比get更加安全，get参数被暴露在url中，隐藏不能用来传递敏感信息
* get只能进行url编码，而post支持多种编码方式
* get请求参数会被完整保留在浏览器历史记录中，而post的参数不会
* get和post本质上是TCP链接
* get产生一个TCP数据包，post产生两个

---
## [浏览器的全局变量有哪些](https://developer.mozilla.org/zh-CN/docs/Glossary/Global_object)

---
## SPA
**理解：**
- SPA仅在web页面初始化时加载响应的HTML，JavaScript和CSS
- 一旦页面加载完成，SPA不会因为用户的操作而进行页面的重新加载或跳转
- 页面的变化时利用路由机制实现HTML内容的变化，避免页面的重新加载

**优点：**
- 用户体验好，内容的改变你不需要重新加载整个页面，避免了不必要的跳转和重复渲染
- 减轻了服务器的压力
- 前后端职责分离，架构清晰

**缺点：**
- 初次加载耗时很多
- 不能使用浏览器的前进后退功能，由于SPA在一个页面中显示所有内容，所以无法前进后退
- 不利于SEO

---
## SPA首屏加载慢怎么解决
- **首屏时间**：是指浏览器从响应用户输入网址，到首屏内容渲染完成的时间，此时整个页面不一定要全部渲染完成，但需要展示当前视窗需要的内容。
- **原因**：网络延时；资源文件体积过大；重复发送请求；加载脚本时，渲染内容阻塞
- **优化方式**：减小入口文件体积；静态资源本地缓存；UI框架按需加载；图片资源压缩；组件重复打包；开启GZip压缩，SSR

---

## webpack中，为什么要打包发布

---

## 服务器端渲染
客户端渲染: 获取 HTML 文件，根据需要下载 JavaScript 文件，运行文件，生成 DOM，再渲染。

服务端渲染：服务端返回 HTML 文件，客户端只需解析 HTML。

优点：首屏渲染快，SEO 好。
缺点：配置麻烦，增加了服务器的计算压力。
下面我用 Vue SSR 做示例，简单的描述一下 SSR 过程。

客户端渲染过程
访问客户端渲染的网站。
服务器返回一个包含了引入资源语句和 `<div id="app"></div>` 的 HTML 文件。
客户端通过 HTTP 向服务器请求资源，当必要的资源都加载完毕后，执行 new Vue() 开始实例化并渲染页面。

服务端渲染过程
访问服务端渲染的网站。
服务器会查看当前路由组件需要哪些资源文件，然后将这些文件的内容填充到 HTML 文件。如果有 ajax 请求，就会执行它进行数据预取并填充到 HTML 文件里，最后返回这个 HTML 页面。
当客户端接收到这个 HTML 页面时，可以马上就开始渲染页面。与此同时，页面也会加载资源，当必要的资源都加载完毕后，开始执行 new Vue() 开始实例化并接管页面。
从上述两个过程中可以看出，区别就在于第二步。客户端渲染的网站会直接返回 HTML 文件，而服务端渲染的网站则会渲染完页面再返回这个 HTML 文件。

这样做的好处是什么？是更快的内容到达时间 (time-to-content)。

假设你的网站需要加载完 abcd 四个文件才能渲染完毕。并且每个文件大小为 1 M。

这样一算：客户端渲染的网站需要加载 4 个文件和 HTML 文件才能完成首页渲染，总计大小为 4M（忽略 HTML 文件大小）。而服务端渲染的网站只需要加载一个渲染完毕的 HTML 文件就能完成首页渲染，总计大小为已经渲染完毕的 HTML 文件（这种文件不会太大，一般为几百K，我的个人博客网站（SSR）加载的 HTML 文件为 400K）。这就是服务端渲染更快的原因。

---
## XML 和 HTML 之间的差异
XML 不是 HTML 的替代。
XML 和 HTML 为不同的目的而设计：
  - XML 被设计用来传输和存储数据，其焦点是数据的内容。
  - HTML 被设计用来显示数据，其焦点是数据的外观。
HTML 旨在显示信息，而 XML 旨在传输信息。

XML 不会做任何事情
也许这有点难以理解，但是 XML 不会做任何事情。XML 被设计用来结构化、存储以及传输信息。

下面实例是 Jani 写给 Tove 的便签，存储为 XML：
``` XML
<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>
```
上面的这条便签具有自我描述性。它包含了发送者和接受者的信息，同时拥有标题以及消息主体。
但是，这个 XML 文档仍然没有做任何事情。它仅仅是包装在 XML 标签中的纯粹的信息。我们需要编写软件或者程序，才能传送、接收和显示出这个文档。

---
## XMLHttpRequest 对象
XMLHttpRequest 对象用于在后台与服务器交换数据。
XMLHttpRequest 对象是开发者的梦想，因为您能够：
  - 在不重新加载页面的情况下更新网页
  - 在页面已加载后从服务器请求数据
  - 在页面已加载后从服务器接收数据
  - 在后台向服务器发送数据

创建 XMLHttpRequest 对象的语法：
xmlhttp=new XMLHttpRequest();
旧版本的Internet Explorer（IE5和IE6）中使用 ActiveX 对象：
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

---
## html标签的类型（head， body，！Doctype） 他们的作用是什么
- !DOCTYPE 标签：它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令.
- head：是所有头部元素的容器, 绝大多数头部标签的内容不会显示给读者该标签下所包含的部分可加入的标签有,,,,和
1.title标签

title标签的作用就是定义网页的标题
``` HTML
<!DOCTYPE html>
<html>
    <head>
        <title>这是一个网页标题</title>
    </head>
    <body>
        <p>内容</p>
    </body>
</html>
```

2.meta标签
meta标签一般用于定义页面的特殊信息，如页面关键字、页面描述等。这些信息并不是给用户的，而是给搜索引擎看的。
meta标签有两个重要的属性：name和http-equiv
name属性的几个常用取值
属性值	说明
keywords	网页的关键字（可以多个）
description	网页的描述
author	网页的作者
copyright	版权信息
``` html
<!DOCTYPE html>
<html>
    <head>
        <title>这是一个网页标题</title>
        <meta name="keywords" content="CSDN，前端学习笔记，Kll"/>
        <meta name="description" content="这是CSDN的前端学习笔记"/>
        <meta name="author" content="Kll"/>
        <meta name="copyright" content="本站所有笔记均为书籍所学习摘抄，
        如有侵权，立即删除。"/>
    </head>
    <body>
        <p>内容</p>
    </body>
</html>
```
meta 标签的http-equiv属性只有两个重要作用：定义网页所使用的编码，定义网页自动刷新跳转。
`<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>`
这段代码告诉浏览器，该页面所使用的编码是utf-8，不过在HTML5标准中，代码简写为
`<meta charset="utf-8"/>`
如果你发现页面打开是乱码，很可能是没有加上这一句代码。在实际的开发中，我们必须在每一个页面中加上这句代码。

http-equiv的另一个作用是定义网页自动刷新跳转:
`<meta http-equiv="refresh" content="6;url=http://www.bilibili.com"/>`
这段代码表示当前页面在6秒后会自动跳转到B站。

3.style标签
style标签用于定义元素的CSS样式，等CSS篇再详细介绍，我们只需了解一下语法
``` html
<!DOCTYPE html>
<html>
    <head>
        <style type="text/css">
            /*这里写CSS样式*/
        </style>
    </head>
    <body>
    </body>
</html>
```
4.script标签

script标签用于定义页面的JavaScript代码，也可以引入外部JavaScript文件，等JavaScript篇时再详细介绍
``` html
<!DOCTYPE html>
<html>
    <head>
        <script>
            /*这里写JavaScript代码*/
        </script>
    </head>
    <body>
    </body>
</html>
```
5.link标签
link标签用于引入外部样式文件（CSS文件）
``` html 
<!DOCTYPE html>
<html>
    <head>
        <link type="text/css" rel="stylesheet" href="css/index.css">
    </head>
    <body>
    </body>
</html>
```
6.base标签
base标签的作用是当超链接标签<a>没有指定href和target的属性时会默认使用<base>标签的内容
我们只需了解有这么一个标签即可


- body: 用于定义文档的主体, 包含了文档的所有内容, 该标签支持 html 的全局属性和事件属性.

---
## iframe
1. 什么是iframe?
iframe也称作嵌入式框架，嵌入式框架和框架网页类似，它可以把一个网页的框架和内容嵌入在现有的网页中,使用会创建包含另外一个文档的内联框架（行内框架）

2. 如何使用？
`<iframe src="demo_iframe_sandbox.html"  id="iframe1"></iframe>`

3. 常用的一些属性？
width	定义iframe的宽度
height	定义iframe的高度
name	规定iframe的名称
frameborder	规定是否显示边框，0(不显示) 、1(显示)
src	设置iframe的地址（页面/图片）
scrolling	规定是否在iframe中显示滚动条，属性值(yes ，no，auto)
vspace	设置或获取对象的水平边距
hspace	设置或获取对象的垂直边距

4. 常用的一些方法？
- 获取iframe
`var iframe = document.getElementById("iframe1");`
- 获取iframe的window对象
通过iframe.contentWindow
`var iwindow = iframe.contentWindow`
通过window.frame[‘name’] 通过这种方法可以获取window对象
var iwindow = window.frames['name']
- 获取iframe的document对象
通过iframe.contentDocument 获取iframe的document对象
`var idocument = iframe.contentDocument`
- 在iframe中获取父级内容
获取上一级的window对象
window.parent
- 获取最顶级容器的window对象
window.top
- 返回自身window对象
window.self

5. iframe的优缺点？
优点：
- 它属于html的独立封装，可以把需要的代码分成一个个html的模块存储，需要的时候进行引用，代码复用上挺好的。
- 它另外一个非常霸道的地方在于2个页面中有遇到重复命名的时候它的css和js不会互相冲突，对于团队开发命名上可以很好的避免同名冲突。

缺点：
- 创建比一般的DOM元素慢了1-2个数量级
- 阻塞页面加载。及时触发window的onload事件是非常重要的，如果加载延迟，就会给用户网页很慢的感觉，而window的onload事件需要在所有的iframe加载完毕后才会出发。
- 唯一的连接池
- 不利于SEO，搜索引擎的检索程序无法解读iframe。

---
## webComponents
Web Components 总的来说是提供一整套完善的封装机制来把 Web 组件化这个东西标准化，每个框架实现 的组件都统一标准地进行输入输出，这样可以更好推动组件的复用
包含四个部分
1. Custom Elements
2. HTML Imports
3. HTML Templates
4. Shadow DOM

Custom Elements
提供一种方式让开发者可以自定义 HTML 元素，包括特定的组成，样式和行为。支持 Web Components 标准的浏览器会提供一系列 API 给开发者用于创建自定义的元素，或者扩展现有元素。

HTML Imports
一种在 HTMLs 中引用以及复用其他的 HTML 文档的方式。这个 Import 很漂亮，可以简单理解为我们常见 的模板中的include之类的作用

HTML Templates
模板

Shadow DOM
提供一种更好地组织页面元素的方式，来为日趋复杂的页面应用提供强大支持，避免代码间的相互影响

---
---
## 重绘与重排
重排/回流（Reflow）：当DOM的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。
重绘(Repaint): 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。表现为某些元素的外观被改变

单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分
重排和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓，而相比之下重排的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。
『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。

### 如何触发重排和重绘？
任何改变用来构建渲染树的信息都会导致一次重排或重绘：
- 添加、删除、更新DOM节点
- 通过display: none隐藏一个DOM节点-触发重排和重绘
- 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
- 移动或者给页面中的DOM节点添加动画
- 添加一个样式表，调整样式属性
- 用户行为，例如调整窗口大小，改变字号，或者滚动。

### 如何避免重绘或者重排？
1. 集中改变样式，不要一条一条地修改 DOM 的样式。
2. 不要把 DOM 结点的属性值放在循环里当成循环里的变量。
3. 动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。
4. 不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。
5. 尽量只修改position：absolute或fixed元素，对其他元素影响不大
6. 动画开始GPU加速，translate使用3D变化
7. 提升为合成层
将元素提升为合成层有以下优点：
合成层的位图，会交由 GPU 合成，比 CPU 处理要快
当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
对于 transform 和 opacity 效果，不会触发 layout 和 paint

## [浏览器怎么加载页面的？script脚本阻塞有什么解决方法？defer和async的区别？](https://cloud.tencent.com/developer/article/1947584)