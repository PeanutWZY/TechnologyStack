# CSS篇——面试题

## 盒模型，box-sizing
**分类：** IE盒子模型和W3C盒子模型
**组成：** 内容（content）、填充（padding）、边界（margin）、边框（border）
**区别：** IE的content部分吧border和padding计算在了一起
盒模型 = content + padding + border + margin
box-sizing：content-box（默认值， width = content_width) / border-box（width = content_width + padding + border）

---
## CSS选择器优先级
!important > 行内样式（比重1000）> ID 选择器（比重100） > 类选择器（比重10） > 标签（比重1） > 通配符 > 继承 > 浏览器默认属性

---
## 垂直居中的集中方式
* 单行文本: line-height = height
* 图片: vertical-align: middle;
* absolute 定位: top: 50%;left: 50%;
* transform: translate(-50%, -50%);
* **flex: display:flex;margin:auto** 最直接，最准确

---
## [关于CSS的link引入和@import引入](https://cloud.tencent.com/developer/article/1846415)
1. link 是 XHTML 标签，除了加载CSS外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。
2. link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。
3. link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。
4. link 支持使用 Javascript 控制 DOM 去改变样式；而@import不支持。

---
## rgba和opacity的透明效果有什么不同
opacity 会继承父元素的 opacity 属性，而 RGBA 设置的元素的后代元素不会继承不透明属性。

---
## display：none和visibility：hidden的区别
* opacity：0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定 一些事件，如click 事件，那么点击该区域，也能触发点击事件的
* visibility: hidden 该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已 经绑定的事件 ，隐藏对应元素，在文档布局中仍保留原来的空间（重绘）
* display:none 把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素。 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）

---

## position中，relative和absolute分别是相对于谁进行定位的
* relative:相对定位，相对于自己本身在正常文档流中的位置进行定位。
* absolute:生成绝对定位，相对于最近一级定位不为static的父元素进行定位。
* fixed:（老版本IE不支持）生成绝对定位，相对于浏览器窗口或者frame进行定位。
* static:默认值，没有定位，元素出现在正常的文档流中。
* sticky:生成粘性定位的元素，容器的位置根据正常文档流计算得出。

---
## CSS3 新特性
盒模型，标签选择器，伪元素，伪类，变换，背景，渐变，边框，圆角边框
* 2d，3d变换
* Transition, animation
* 媒体查询
* 新的单位（rem, vw，vh 等）
* 圆角（border-radius），阴影（box-shadow），对文字加特效（text-shadow），线性渐变（gradient）
* transform: rotate(9deg)  旋转
* transform: scale(0.85,0.90)        缩放
* transform: translate(0px,-30px)    定位
* transform: skew(-9deg,0deg);       倾斜
* rgba

---
## BFC
BFC 即 Block Formatting Contexts (块级格式化上下文)，它属于普通流，即：元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。
可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。
只要元素满足下面任一条件即可触发 BFC 特性

* body 根元素
* 浮动元素：float 除 none 以外的值
* 绝对定位元素：position (absolute、fixed)
* display 为 inline-block、table-cells、flex、block
* overflow 除了 visible 以外的值 (hidden、auto、scroll)

---
## 常见兼容性问题

1. 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}*来统一。
2. Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决.

---
## 让谷歌浏览器支持12px以下的字体
1. zoom：变焦；
2. -webkit-transform:scale()：放缩；
3. -webkit-text-size-adjust:none：根据设备(浏览器)来自动调整显示大小。

---

## 页面布局
### Flex 布局
布局的传统解决方案，基于盒状模型，依赖 display 属性 + position 属性 + float 属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。
Flex 是 Flexible Box 的缩写，意为"弹性布局",用来为盒状模型提供最大的灵活性。指定容器 display: flex 即可。 简单的分为容器属性和元素属性。

容器的属性：
flex-direction：决定主轴的方向（即子 item 的排列方法）
flex-direction: row | row-reverse | column | column-reverse;

flex-wrap：决定换行规则 
flex-wrap: nowrap | wrap | wrap-reverse;

flex-flow：flex-direction和flex-wrap的组合简写形式。 
flex-flow: row wrap

justify-content：对齐方式，水平主轴对齐方式
align-content：对齐方式，纵轴对齐方式
align-items：属性可以使元素在交叉轴方向对齐

**元素的属性**：
order 属性：定义项目的排列顺序，顺序越小，排列越靠前，默认为 0
flex-grow 属性：定义项目的放大比例，即使存在空间，也不会放大
flex-shrink 属性：定义了项目的缩小比例，当空间不足的情况下会等比例的缩小，如果 定义个 item 的 flow-shrink 为 0，则为不缩小
flex-basis 属性：定义了在分配多余的空间，项目占据的空间。
flex：是 flex-grow 和 flex-shrink、flex-basis 的简写，默认值为 0 1 auto。
align-self：允许单个项目与其他项目不一样的对齐方式，可以覆盖
align-items，默认属 性为 auto，表示继承父元素的 align-items 比如说，用 flex 实现圣杯布局

### Rem 布局
首先 Rem 相对于根(html)的 font-size 大小来计算。简单的说它就是一个相对单例 如:font-size:10px;,那么（1rem = 10px）了解计算原理后首先解决怎么在不同设备上设置 html 的 font-size 大小。其实 rem 布局的本质是等比缩放，一般是基于宽度。
优点：可以快速适用移动端布局，字体，图片高度
缺点：
①目前 ie 不支持，对 pc 页面来讲使用次数不多；
②数据量大：所有的图片，盒子都需要我们去给一个准确的值；才能保证不同机型的适配；
③在响应式布局中，必须通过 js 来动态控制根元素 font-size 的大小。也就是说 css 样式和 js 代码有一定的耦合性。且必须将改变 font-size 的代码放在 css 样式之前。

### 百分比布局
通过百分比单位 " % " 来实现响应式的效果。通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。 直观的理解，我们可能会认为子元素的百分比完全相对于直接父元素，height 百分比相 对于 height，width 百分比相对于 width。 padding、border、margin 等等不论是垂直方向还是水平方向，都相对于直接父元素的 width。 除了 border-radius 外，还有比如 translate、background-size 等都是相对于自身的。
缺点：
（1）计算困难
（2）各个属性中如果使用百分比，相对父元素的属性并不是唯一的。造成我们使用百分比单位容易使布局问题变得复杂。

### 浮动布局
浮动布局:当元素浮动以后可以向左或向右移动，直到它的外边缘碰到包含它的框或者另外一个浮动元素的边框为止。元素浮动以后会脱离正常的文档流，所以文档的普通流中的框就变的好像浮动元素不存在一样。
优点
这样做的优点就是在图文混排的时候可以很好的使文字环绕在图片周围。另外当元素浮动了起来之后，它有着块级元素的一些性质例如可以设置宽高等，但它与inline-block还是有一些区别的，第一个就是关于横向排序的时候，float可以设置方向而inline-block方向是固定的；还有一个就是inline-block在使用时有时会有空白间隙的问题
缺点
最明显的缺点就是浮动元素一旦脱离了文档流，就无法撑起父元素，会造成父级元素高度塌陷。

---

## 如何使用rem或viewport进行移动端适配
**rem适配原理**：
改变了一个元素在不同设备上占据的css像素的个数
rem适配的优缺点
优点：没有破坏完美视口
缺点：px值转换rem太过于复杂(下面我们使用less来解决这个问题)

**viewport适配的原理**
viewport适配方案中，每一个元素在不同设备上占据的css像素的个数是一样的。但是css像素和物理像素的比例是不一样的，等比的
viewport适配的优缺点
在我们设计图上所量取的大小即为我们可以设置的像素大小，即所量即所设
缺点破坏完美视口

---
## CSS3新特性，伪类，伪元素，锚伪类
[伪类，伪元素，锚伪类](https://www.cnblogs.com/lmjZone/p/8716291.html)


## 如何实现水平居中和垂直居中。
[水平、垂直居中](https://blog.csdn.net/weixin_37580235/article/details/82317240)

## 说说position，display
position: 元素定位方式, relative, absolute, fixed, static, sticky
display: 规定元素应该生成的框的类型, none, block, inline, table, inherit, flex

## 哪些是块级元素那些是行级元素，各有什么特点
块级：div，p，header, footer, ul, h1~h6 image， 块级元素带有自动换行符，后续元素会自动排到文档流的下一行
行级：span, b, i, strong

## 请解释*{box-sizing:border-box;}的作用，并说明使用它的好处
使用通配符匹配所有元素使其统一将盒模型规定为border-box

## 浮动元素引起的问题和解决办法？绝对定位和相对定位，元素浮动后的display值
overflow: hidden 解决子元素浮动父元素高度塌陷问题
clear: right/left/both 清除浮动
[解决浮动引起的问题](https://segmentfault.com/a/1190000039182120)


## [flex简述](https://juejin.cn/post/7085340268735496222)
Flexible Box 简称 flex，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局
采用Flex布局的元素，称为flex容器container
它的所有子元素自动成为容器成员，称为flex项目item
容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过flex-direction来决定主轴的方向

## inline和inline-block的区别
display:block
block元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度自动填满其父元素宽度。
block元素可以设置width,height属性。块级元素即使设置了宽度,仍然是独占一行。
block元素可以设置margin和padding属性。
display:inline
inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
inline元素设置width,height属性无效。
inline元素的margin和padding属性，水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。
display:inline-block
简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

## grid布局
flex 布局是一维布局，Grid 布局是二维布局。flex 布局一次只能处理一个维度上的元素布局，一行或者一列。Grid 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。
[grid布局](https://juejin.cn/post/6854573220306255880)

## css dpi
DPI（点每英寸）
不同的显示器分辨率不一样，物理尺寸也不一样，因此你用一张一英寸长的小纸条按在屏幕上，能被你盖住的像素的个数也是不一样的。我们把一英寸里能包含的像素的个数叫做屏幕的解析度，单位叫 DPI（dots per inch）
PPI（像素每英寸）
每英寸的像素数（PPI，pixel per inch）。屏幕常用 PPI(Pixel per inch) 来判定屏幕清晰度，ppi越高，每英寸像素点越多，图像越清晰；我们可以类比物体的密度，密度越大，单位体积的质量就越大，ppi越高，单位面积的像素越多

## 你知道attribute和property的区别么
property是DOM中的属性，是JavaScript里的对象；
attribute是HTML标签上的特性，它的值只能够是字符串；

## [流式布局如何实现，响应式布局如何实现](https://cloud.tencent.com/developer/article/1635215)

## 实现两栏布局有哪些方法？
## css布局问题？css实现三列布局怎么做？如果中间是自适应又怎么做？
## 实现三栏布局（圣杯布局，双飞翼布局，flex布局）

## overflow:hidden有什么优点？
隐藏溢出的元素，清除浮动和解除坍塌

## padding百分比是相对于父级宽度还是自身的宽度
padding的百分比是相对于父元素宽度，如果父元素有宽度，相对于父元素宽度，如果没有，找其父辈元素的宽度，均没设宽度时，相对于屏幕的宽度。

## css3动画，transition和animation的区别，animation的属性，加速度，重力的模拟实现
[动画](https://segmentfault.com/a/1190000012698032)

## CSS 3 如何实现旋转图片（transform: rotate）
``` html
<style>
    /*动画效果*/
    #loading-img {
        display: block;
        margin: 20px auto;
        width: 30%;
        /*animation (动画) :绑定选择器, 4s完成动画 linear(匀速) infinite(循环) */
        animation: loading 3s linear infinite;
    }

    /*通过@keyframes规则,能够创建动画 , que 定义动画的名称 可自己定义*/
    @keyframes loading {
        /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
        0% {
            /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
```

## 雪碧图
主要用于把一堆小图标整合在一张背景透明的大图上，通过设置对应的位置来显示不同的图片，目的是大幅减轻服务器对图片的请求数量，是前端性能优化的一种方式。
[雪碧图简述](https://www.jianshu.com/p/84944af9ccca)

## svg
[svg](https://blog.csdn.net/weixin_62115642/article/details/125821693)

## 媒体查询的原理是什么？
目的是为了页面能够在不同的显示器 ，不同大小的屏幕下也能够 正常显示
原理：定义一系列的条件，用这些条件去检查显示器设备，如果符合规定的条件就应用对应的css样式。

## CSS 的加载是异步的吗？表现在什么地方？
默认是同步加载，但也可以写成异步
[CSS的异步加载方式](https://blog.csdn.net/wewfdf/article/details/102828086)

## 外边距合并
[示例](https://blog.csdn.net/songyi160/article/details/87891222)

## 解释一下"::before"和":after"中的双冒号和单冒号的区别
::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。
:after是一个定义在元素主体内容之后的一个伪类

## CSS画三角形
border法：
``` css
#triangle0{
    width: 0;
    height: 0;
    border-top: 50px solid blue;
    border-right: 50px solid red;
    border-bottom: 50px solid green;
    border-left: 50px solid yellow;
}
```
原理：border是由三角形组合而成，根据元素的本身的宽高决定三角型被覆盖的部分
``` css
div {
    width: 50px;
    height: 50px;
    border: 40px solid;
    border-color: orange blue red green;
}
```
![boder](https://upload-images.jianshu.io/upload_images/9397803-9dc8deee9d6c1922.png?imageMogr2/auto-orient/strip|imageView2/2/w/262/format/webp)
