# JS篇
---
## 数据类型
**基本数据类型**：
Number，String，Boolean，null，undefined，symbol，bigInt(表示大于 2^53 - 1 的整数)
（后两个为ES6新增）

**引用数据类型**：
object，function（proto Function.prototype）
object：普通对象，数组对象，正则对象，日期对象，Math数学函数对象。

**两种数据存储方式**：
基本数据类型是直接存储在栈中的简单数据段，占据空间小、大小固定，属于被频繁使用的数据。栈是存储基 本类型值和执行代码的空间。
引用数据类型是存储在堆内存中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆 中该实体的起始地址，当解释器寻找引用值时，会检索其在栈中的地址，取得地址后从堆中获得实体。

**两种数据类型的区别**：
堆比栈空间大，栈比堆运行速度快。
堆内存是无序存储，可以根据引用直接获取。
基础数据类型比较稳定，而且相对来说占用的内存小。
引用数据类型大小是动态的，而且是无限的。

---
## 判断一个值是什么类型有哪些方法？
1. typeof
``` javascript
console.log(typeof 1);               // number
console.log(typeof true);            // boolean
console.log(typeof 'mc');            // string
console.log(typeof Symbol('k'))      // Symbol
console.log(typeof function(){});    // function
console.log(typeof console.log());   // undefined
console.log(typeof []);              // object 
console.log(typeof {});              // object
console.log(typeof null);            // object
console.log(typeof undefined);       // undefined
```
优点：能够快速区分基本数据类型
缺点：不能将Object、Array和Null区分，都返回object

2. instanceof
``` javascript
console.log(1 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```
优点：能够区分Array、Object和Function，适合用于判断自定义的类实例对象
缺点：Number，Boolean，String基本数据类型不能判断

3. Object.prototype.toString.call()
``` javascript
var toString = Object.prototype.toString;
console.log(toString.call(1));                      //[object Number]
console.log(toString.call(true));                   //[object Boolean]
console.log(toString.call('mc'));                   //[object String]
console.log(toString.call([]));                     //[object Array]
console.log(toString.call({}));                     //[object Object]
console.log(toString.call(function(){}));           //[object Function]
console.log(toString.call(undefined));              //[object Undefined]
console.log(toString.call(null));                   //[object Null]
```
优点：精准判断数据类型
缺点：写法繁琐不容易记，推荐进行封装后使用

---
## null 和 undefined 的区别？
null 表示一个对象被定义了，值为“空值”；
undefined 表示不存在这个值。
1. 变量被声明了，但没有赋值时，就等于undefined。 
2. 调用函数时，应该提供的参数没有提供，该参数等于undefined。
3. 对象没有赋值的属性，该属性的值为undefined。 
4. 函数没有返回值时，默认返回undefined。

---

## undeclared 和 undefined 区别？
- undeclared的变量是程序中不存在且未声明的变量。 如果程序尝试读取未声明变量的值，则会遇到运行时错误。
- undefined的变量是在程序中声明但未赋予任何值的变量，如果程序试图读取未定义变量的值，则返回undefined的值。

---

## NaN 是什么
NaN 即非数值（Not a Number），NaN 属性用于引用特殊的非数字值，该属性指定的并不是不合法的数字。
NaN 属性 与 Number.Nan 属性相同。

---

## JS有哪些内置对象
- **数据封装类对象**：Object, Array, Boolean, Number, String
- **其他对象**：Function, Arguments, Math, Date, RegExp, Error

---

## this对象的理解
1. 作为普通函数执行时，this指向window。
2. 当函数作为对象的方法被调用时，this就会指向该对象。
3. 构造器调用，this指向返回的这个对象。
4. 箭头函数 箭头函数的this绑定看的是this所在函数定义在哪个对象下，就绑定哪个对象。如果有嵌套的情况，则this绑定到最近的一层对象上。
5. 基于Function.prototype上的 apply 、 call 和 bind 调用模式，这三个方法都可以显示的指定调用函数的 this 指向。apply接收参数的是数组，call接受参数列表，bind方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this指向除了使用new时会被改变，其他情况下都不会改变。若为空默认是指向全局对象window。

---

## 怎么判断一个变量arr的话是否为数组（此题用 typeof 不行）？
arr instanceof Array
arr.constructor == Array
Object.protype.toString.call(arr) == '[Object Array]'
typeof 返回的是数据的基本数据类型，只能返回arr为object

---
## “===、 ==”的区别？
* ==：当且仅当两个运算数相等时，它返回 true，即不检查数据类型
* ===：只有在无需类型转换运算数就相等的情况下，才返回 true，需要检查数据类型

---
## eval是做什么的？
eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
它的功能是把对应的字符串解析成 JS 代码并运行；
应该避免使用 eval，不安全，非常耗性能（2次，一次解析成 js 语句，一次执行）。

---
## var、let、const 区别？
var 存在声明提升，声明覆盖。
let 只能在块级作用域内访问。
const 用来定义常量，必须初始化，不能修改（对象特殊）

---

## JSON 的了解？
JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。
它是基于JavaScript的一个子集。数据格式简单, 易于读写, 占用带宽小
{'age':'12', 'name':'back'}

---

## documen.write 和 innerHTML 的区别？
- document.write 只能重绘整个页面
Document.write() 方法将一个文本字符串写入一个由 document.open() 打开的文档流（document stream）。
``` HTML
<html>
<head>
    <meta charset="UTF-8">
    <title><code>document.write()</code> example</title>

    <script>
      function newContent() {
        document.open();
        document.write("<h1>Out with the old - in with the new!</h1>");
        document.close();
      }
    </script>
</head>
<body onload="newContent();">
    <!-- 载入newContent后，原始文本内容将消失 -->
    <p>Some original document content.</p> 
</body>
</html>
```

- innerHTML 可以重绘页面的一部分
``` HTML
<html>
<head>
<title>菜鸟教程(runoob.com)</title>
<script>
function changeLink(){
    document.getElementById('myAnchor').innerHTML="RUNOOB";
    document.getElementById('myAnchor').href="//www.runoob.com";
    document.getElementById('myAnchor').target="_blank";
}
</script>
</head>
<body>
 
<a id="myAnchor" href="//www.microsoft.com">Microsoft</a>
<input type="button" onclick="changeLink()" value="修改链接">
 
</body>
</html>
```

---
## DOM怎样添加、移除、移动、复制、创建和查找节点
``` javascript
// 创建新节点
createDocumentFragment() //创建一个DOM片段
createElement() //创建一个具体的元素
createTextNode() //创建一个文本节点

// 添加、移除、替换、插入
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点

// 查找
getElementsByTagName() //通过标签名称
getElementsByName() //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById() //通过元素Id，唯一性
```

---

## 如何获取UA（user-agent）
``` javascript
function whatBrowser() { 
     document.Browser.Name.value=navigator.appName; 
     document.Browser.Version.value=navigator.appVersion; 
     document.Browser.Code.value=navigator.appCodeName; 
     document.Browser.Agent.value=navigator.userAgent; 
 }
```

---

## ajax过程？
(1)创建XMLHttpRequest对象,也就是创建一个异步调用对象.
(2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
(3)设置响应HTTP请求状态变化的函数.
(4)发送HTTP请求.
(5)获取异步调用返回的数据.
(6)使用JavaScript和DOM实现局部刷新.

---

## 请解释一下 JavaScript 的同源策略？
概念:同源策略是客户端脚本（尤其是Netscape Navigator2.0），其目的是防止某个文档或脚本从多个不同源装载。
这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议。
指一段脚本只能读取来自同一来源的窗口和文档的属性。

---

## JavaScript原型，原型链 ? 有什么特点？
**原型关系**：
每个 class都有显示原型 prototype
每个实例都有隐式原型 _ proto_
实例的_ proto_指向对应 class 的 prototype

- 原型:  在 JS 中，每当定义一个对象（函数也是对象）时，对象中都会包含一些预定义的属性。其中每个函数对象都有一个prototype 属性，这个属性指向函数的原型对象。
- 原型链：函数的原型链对象constructor默认指向函数本身，原型对象除了有原型属性外，为了实现继承，还有一个原型链指针__proto__,该指针是指向上一层的原型对象，而上一层的原型对象的结构依然类似。因此可以利用__proto__一直指向Object的原型对象上，而Object原型对象用Object.prototype.__ proto__ = null表示原型链顶端。如此形成了js的原型链继承。同时所有的js对象都有Object的基本防范
- 特点:  JavaScript对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

---

## [深拷贝和浅拷贝](https://juejin.cn/post/6844903929705136141)
1. 基本数据类型的赋值不算拷贝
2. 数组和对象的赋值为浅拷贝
3. 解构赋值时，针对一维数组和对象可以看作深拷贝，多维数组为浅拷贝
4. JSON转化后为深拷贝
``` JavaScript
let newList = JSON.parse(JSON.stringify(list));
```
5. 标准深拷贝写法.
``` JavaScript
function deepClone(source){
  // [] => Array(基类); {} => Object
  const targetObj = source.constructor === Array ? [] : {};
  for(let keys in source) {
    if(source.hasOwnProperty(keys)){
      // keys => 3
      // 引用数据类型
      if(source[keys] && typeof source[keys] === 'object'){
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        // 递归
        targetObj[keys] = deepClone(source[keys])
      }
      else{
        // 基本数据类型，直接赋值
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}
```

***补充知识*** 
*1.hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。如果有，返回true，否则返回false。
2.说简单点，它能帮你指向你当前循环的对象，而过滤掉原型链上其它对象，因为在工作中我们很难保证其他人是否会修改原型链，这样做会更为保险。
3.因为 for in 循环总是遍历整个原型链，所以当遍历多继承的对象时效率较低。
4.为了检查某个对象是否拥有不在原型链上的自定义属性，就有必要用到 hasOwnProperty 方法，任何一个对象都具有该方法，它继承自 Object.prototype。
5.当检测某个对象是否拥有某个属性时，hasOwnProperty 是唯一可以完成这一任务的方法，在 for in 循环时，建议增加 hasOwnProperty 进行判断，可以有效避免扩展本地原型而引起的错误。
6.我们无法完全检测某个属性是否是undefined，因为属性有可能存在，但其值为undefined。
7.hasOwnProperty 是Javascript中唯一一个可以处理对象属性而不遍历原型链的方法。
个人认为hasOwnProperty()的主要作用就是在多重循环中过滤掉不符合条件的对象，减少遍历次数，和其他编程语言中的continue和break类似。*


---

## 构造函数与普通函数的区别
1. 命名方式
   构造名称通常首字母大写，普通小写
2. this指向
   构造this会绑定到创建的对象实例上
   普通this属于此函数的调用者
3. 调用方式
   构造函数需要new运算符调用，如果构造没有参数可以省略小括号，如new Object
   普通不需要new，必须要小括号

---

## js 如何实现数组去重整理出5种方法。
1. 遍历数组法
最简单的去重方法， 实现思路：新建一新数组，遍历传入数组，值不在新数组就加入该新数组中；注意点：判断值是否在数组的方法“indexOf”是ECMAScript5 方法，IE8以下不支持，需多写一些兼容低版本浏览器代码，源码如下：
``` javascript
// 最简单数组去重法
function unique1(array){
 var n = []; //一个新的临时数组
 //遍历当前数组
 for(var i = 0; i < array.length; i++){
  //如果当前数组的第i已经保存进了临时数组，那么跳过，
  //否则把当前项push到临时数组里面
  if (n.indexOf(array[i]) == -1) n.push(array[i]);
 }
 return n;
}
// 判断浏览器是否支持indexOf ，indexOf 为ecmaScript5新方法 IE8以下（包括IE8， IE8只支持部分ecma5）不支持
if (!Array.prototype.indexOf){
 // 新增indexOf方法
 Array.prototype.indexOf = function(item){
  var result = -1, a_item = null;
  if (this.length == 0){
   return result;
  }
  for(var i = 0, len = this.length; i < len; i++){
   a_item = this[i];
   if (a_item === item){
    result = i;
    break;
   }
  }
  return result;
 }
}
```

2. 对象键值对法
该方法执行的速度比其他任何方法都快， 就是占用的内存大一些；实现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，不是的话给对象新增该键并放入新数组。注意点： 判断是否为js对象键时，会自动对传入的键执行“toString()”，不同的键可能会被误认为一样；例如： a[1]、a["1"] 。解决上述问题还是得调用“indexOf”。
``` javascript
// 速度最快， 占空间最多（空间换时间）

function unique2(array){
 var n = {}, r = [], len = array.length, val, type;
  for (var i = 0; i < array.length; i++) {
    val = array[i];
    type = typeof val;
    if (!n[val]) {
      n[val] = [type];
      r.push(val);
    } else if (n[val].indexOf(type) < 0) {
      n[val].push(type);
      r.push(val);
    }
  }
  return r;
}
```

3. 数组下标判断法
还是得调用“indexOf”性能跟方法1差不多，实现思路：如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组。
``` javascript
function unique3(array){
 var n = [array[0]]; //结果数组
 //从第二项开始遍历
 for(var i = 1; i < array.length; i++) {
  //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
  //那么表示第i项是重复的，忽略掉。否则存入结果数组
  if (array.indexOf(array[i]) == i) n.push(array[i]);
 }
 return n;
}
```

4. 排序后相邻去除法
虽然原生数组的”sort”方法排序结果不怎么靠谱，但在不注重顺序的去重里该缺点毫无影响。实现思路：给传入数组排序，排序后相同值相邻，然后遍历时新数组只加入不与前一值重复的值。
``` javascript
// 将相同的值相邻，然后遍历去除重复值
function unique4(array){
 array.sort();
 var re=[array[0]];
 for(var i = 1; i < array.length; i++){
  if( array[i] !== re[re.length-1])
  {
   re.push(array[i]);
  }
 }
 return re;
}
```

5. 优化遍历数组法
源自外国博文，该方法的实现代码相当酷炫；实现思路：获取没重复的最右一值放入新数组。（检测到有重复值时终止当前循环同时进入顶层循环的下一轮判断）
``` javascript
// 思路：获取没重复的最右一值放入新数组

function unique5(array){
 var r = [];
 for(var i = 0, l = array.length; i < l; i++) {
  for(var j = i + 1; j < l; j++)
   if (array[i] === array[j]) j = ++i;
  r.push(array[i]);
 }
 return r;
}
```

---

## 什么是变量提升（Variable Hoisting）？
变量提升指的是，无论是哪里的变量在一个范围内声明的，那么JavaScript引擎会将这个声明移到范围的顶部。如果在函数中间声明一个变量，例如在某一行中赋值一个变量：
``` javascript
function foo()
{
  // 此处省略若干代码
  var a = "abc";
}
```
实际上会这样运行代码：
``` javascript
function foo()
{
  var a;
  // 此处省略若干代码
  a = "abc";
}
```

---

## 全局变量有什么风险，以及如何保护代码不受干扰？
全局变量的危险之处在于其他人可以创建相同名称的变量，然后覆盖你正在使用的变量。这在任何语言中都是一个令人头疼的问题。预防的方法也有很多。其中最常用的方法是创建一个包含其他所有变量的全局变量：
``` javascript
var applicationName = {};
// 然后，每当你需要创建一个全局变量的时候，将其附加到对象上即可。
applicationName.myVariable = "abc";

//还有一种方法是将所有的代码封装到一个自动执行的函数中，这样一来，所有声明的变量都声明在该函数的范围内。
(function(){
  var a = "abc";
})();

```

---

## 如何通过JavaScript对象中的成员变量迭代？
``` javascript
for(var prop in obj){
  // bonus points for hasOwnProperty
  if(obj.hasOwnProperty(prop)){
  // do something here
  }
}
```

---

## 代码覆盖率
简单来说，代码覆盖率是指，至少被执行了一次的条目数占整个条目数的百分比。
如果“条目数”是语句，对应的就是代码行覆盖率；如果“条目数”是函数，对应的就是函数覆盖率；如果“条目数”是路径，那么对应的就是路径覆盖率。

## [JavaScript单元测试](https://blog.csdn.net/jinhuilin/article/details/110941385)
目的：保证js代码质量，特别是js类库代码的质量
测试框架：jsunit

---

## Java和JavaScript有什么不同
| Java	| JavaScript |
| ---- | ---- |
| Java是一种OOP编程语言。 |	JavaScript是一种OOP脚本语言。 |
| 它创建在虚拟机或浏览器中运行的应用程序。 |	代码在浏览器或node环境上运行。 |
| 需要编译Java代码。 |	JS代码都是文本的形式。 |

JS的特性：JavaScript 是一种轻量级的解释型编程语言，具有面向对象的特性。补充和集成了 Java，HTML。允许各位在其他静态HTML页面中构建交互性。 该语言的通用核心已嵌入Netscape，Internet Explorer和其他Web浏览器中。

JS的优点:
- 更少的服务器交互 - 在将页面发送到服务器之前，可以验证用户输入,节省了服务器流量，意味着服务器的负载更少
- 立即反馈 - 用户不需要等待页面重新加载来查看是否忘记输入某些内容。
- 增强交互 - 在界面中，当用户使用鼠标悬停或通过键盘激活它们时会做出响应。
- 丰富的接口 - 可以使用JS包含拖放组件和滑块等项，为网站提供丰富的界面。

---

## 是否可以将匿名函数分配给变量并将其作为参数传递给另一个函数
可以。一个匿名函数可以分配给一个变量，它也可以作为参数传递给另一个函数。

---
## JS中的参数对象是什么&如何获得传递给函数的参数类型
变量arguments表示传递给函数的参数。 使用typeof运算符，可以获得传递给函数的参数类型。如下：

function func(x){
  console.log(typeof x, arguments.length);
}

func(); //==> "undefined", 0
func(7); //==> "number", 1
func("1", "2", "3"); //==> "string", 3
func("1", 2, 3); //==> "string", 3
只会判断第一个入参的数据类型！！！

---
## JS中变量的作用域是什么
变量的作用域是程序中定义它的区域，JS变量只有两个作用域：
- 全局变量 - 全局变量具有全局作用域，这意味着它在JS代码中的任何位置都可见。
- 局部变量 - 局部变量仅在定义它的函数中可见，函数参数始终是该函数的本地参数。

---

## 回调
回调函数是作为参数或选项传递给某个方法的普通JS函数。它是一个函数，在另一个函数完成执行后执行，因此称为回调。在JS中，函数是对象，因此，函数可以接受函数作为参数，并且可以由其他函数返回。

---

## JS中的变量命名约定是什么？
不应该使用任何JS保留关键字作为变量名。例如，break或boolean变量名无效。
JS 变量名不应该以数字(0-9)开头。它们必须以字母或下划线开头。
JS 变量名区分大小写。例如，Test和test是两个不同的变量。

---

## Attribute 和Property之间有什么区别
- property是DOM中的属性，是JavaScript里的对象；
- attribute是HTML标签上的特性，它的值只能够是字符串；
[Attribute与Property大详解](https://www.cnblogs.com/lmjZone/p/8760232.html)

---

## 下面是在JS代码中访问 html 元素的方法
- getElementById(‘idname’): 按id名称获取元素
- getElementsByClass(‘classname’): 获取具有给定类名的所有元素
- getElementsByTagName(‘tagname’): 获取具有给定标记名称的所有元素
- querySelector(): 此函数采用css样式选择器并返回第一个选定元素

---

## JS代码在HTML文件中可以以多少种方式使用
- 行内
``` HTML
<input type="button" value="点击有惊喜" onclick="javascript:alert('哈哈哈哈')">
```
- 内部
``` HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<script type="text/javascript">
//声明一个函数(整个文档都可以使用)
function surprise() {
alert('恭喜你中了一百万')/*弹出框*/
}
</script>
</head>
。。。
</html>
``` 
- 外部
``` HTML
<script src="../../js/js4.js" type="text/javascript" charset="utf-8">
```

---

## 什么是类型化语言

类型化语言中，值与值关联，而不是与变量关联，它有两种类型：
**动态**:在这种情况下，变量可以包含多种类型，如在JS中，变量可以取number, string 类型。
**静态**:在这种情况下，变量只能包含一种类型，就像在Java中声明为string的变量只能包含一组字符，不能包含其他类型。

---

## Cookie 与 Local storage 与 Session storage 区别
| 特性 | Cookie |	localStorage |	sessionStorage |
| ---- | ---- | ---- | ---- | 
| 数据的生命周期 |	一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效	| 除非被清除，否则永久保存 | 	仅在当前会话下有效，关闭页面或浏览器后被清除 |
| 存放数据大小 |	4K左右 |	一般为 5MB | 5MB |
| 与服务器端通信 |	每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 |	仅在客户端（即浏览器）中保存，不参与和服务器的通信 | 同（local storage）|
| 易用性	| 需要程序员自己封装，源生的Cookie接口不友好	| 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 | 同（local storage）|

---

## window 与 document 的区别：
- window:JS 的 window 是一个全局对象，它包含变量、函数、history、location。
- document:document也位于window之下，可以视为window的属性。

---


## innerHTML 和 innerText 的区别
- innerHTML:也就是从对象的起始位置到终止位置的全部内容,包括Html标签。
- innerText:从起始位置到终止位置的内容, 但它去除Html标签

---

## JS中的事件冒泡是什么
事件冒泡是HTML DOM API中事件传播的一种方式，当一个事件发生在一个元素中的一个子元素中，并且两个元素都注册了该事件的句柄时。通过冒泡，事件首先由最内部的元素捕获和处理，然后传播到外部元素。执行从该事件开始，并转到其父元素。然后执行传递给父元素，以此类推，直到body元素。

---

## 如何在JS中将任意基的字符串转换为整数
parseInt(string, radix) 将一个字符串 string 转换为 radix 进制的整数， radix 为介于2-36之间的数,如下：
parseInt("4F", 16)

---

## 2 + 5 + '3'的结果是什么
由于2和5是整数，它们将以数字形式相加。因为3是一个字符串，它将与 7 拼接，结果是73。

---

## JS中的“严格”模式是什么以及如何启用？
严格模式是在代码中引入更好的错误检查的一种方法。
- 当使用严格模式时，不能使用隐式声明的变量，或为只读属性赋值，或向不可扩展的对象添加属性。
- 可以通过在文件，程序或函数的开头添加“use strict”来启用严格模式

作用：
- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。

---

## 下面代码的输出是什么？
``` javascript
var Y = 1;
if (eval(function f(){}))
{
  y += typeof F;
}
console.log(y);
```
打印undefined。if条件语句使用eval求值，因此eval(function f(){})返回函数f(){}(为真)。因此，在if语句中，执行typeof f返回undefined，因为if语句代码在运行时执行，而if条件中的语句在运行时计算。

---

## 如何在JS中清空数组
- 方法一：
``` javascript
arrayList = []
```
上面的代码将把变量arrayList设置为一个新的空数组。如果在其他任何地方都没有对原始数组arrayList的引用，则建议这样做，因为它实际上会创建一个新的空数组。咱们应该小心使用这种清空数组的方法，因为如果你从另一个变量引用了这个数组，那么原始的引用数组将保持不变。
- 方法二：
``` javascript
arrayList.length = 0;
```
上面的代码将通过将其length设置为0来清除现有数组。这种清空数组的方式还会更新指向原始数组的所有引用变量。 因此，当你想要更新指向arrayList的所有引用变量时，此方法很有用。
- 方法三：
``` javascript
arrayList.splice(0, arrayList.length);
```
这处方法也行，当然这种清空数组的方法也将更新对原始数组的所有引用。
- 方法四：
``` javascript
while(arrayList.length)
{
  arrayList.pop();
}

```
上面的实现也可以空数组，但通常不建议经常使用这种方式。

---
## slice()和splice()
`slice()` 方法以新的数组对象，返回数组中被选中的元素。
slice() 方法选择从给定的 start 参数开始的元素，并在给定的 end 参数处结束，但不包括。
注释：slice() 方法不会改变原始数组。
el：str.slice(start, end) 会返回从下标start到end的元素列表

`splice()` 能够根据参数增删原数组对象，并返回一个新的被裁减元素数组
splice() 第一个参数是起始位置，第二个参数是裁剪数量(为0不裁剪但可以添加数据，为负数直接不操作)，第三个参数是所要增添的元素，可以用逗号隔开无限制增添
el：str.splice(start, num, element1, element2...)

---

``` javascript
var output = (function(x)
  {
    delete x;
    return x;
  }
  )(0);

console.log(output);
```
打印 0。delete操作符用于从对象中删除属性。这里x不是一个对象，而是一个局部变量，删除操作符不影响局部变量。

``` javascript
var X = { foo : 1}; 
var output = (function() 
{ 
  delete X.foo; 
  return X.foo; 
} 
)(); 

console.log(output);
```
输出 undefined。delete操作符用于删除对象的属性。X是一个具有foo属性的对象，由于它是一个自调用函数，所以咱们将从对象X中删除foo属性。这样做之后，当咱们试图引用一个被删除的foo属性时，结果是undefined。

---

``` javascript
var foo = function Bar()
{
  return 7;
};
typeof Bar();
```
输出将是引用错误。函数定义只能有一个引用变量作为其函数名。

---

## 为什么要将JS源文件的全部内容包装在一个函数中

这是一种越来越普遍的做法，被许多流行的JS库所采用。 这种技术围绕文件的整个内容创建一个闭包，最重要的是，它可以创建一个私有命名空间，从而有助于避免不同JS模块和库之间潜在的名称冲突。

该技术的另一个特性是允许为全局变量提供一个简单的别名，这在jQuery插件中经常使用。

---

## JS中的转义字符是什么

JS转义字符使咱们能够在不破坏应用程序的情况下编写特殊字符。转义字符(\)用于处理特殊字符，如单引号、双引号、撇号和&号，在字符前放置反斜杠使其显示。

如：document.write("I am a \"good\" boy")

---

``` javascript
(function() {
   var a = b = 5;
})();
console.log(b);
```
上述代码会打印出 5 。
这个问题的陷阱就是，在立即执行函数表达式（IIFE）中，有两个命名，但是其中变量是通过关键词 var 来声明的。这就意味着 a 是这个函数的本地变量。与此相反， b 是属于这个函数的全局变量的。
这个问题另一个陷阱就是，在函数中他没有使用 "严格模式" ( 'use strict'; )。如果 严格模式 开启，那么代码就会报出未捕获引用错误（Uncaught ReferenceError）：b没有定义。记住严格模式要求，如果这个是预期的行为，你需要明确地引用全局变量，。因此，你需要像下面这么写：
``` javascript
(function() {
   'use strict';
   var a = window.b = 5;
})();
console.log(b);
```

---

## 创建原生方法
在 String 对象上定义一个 repeatify 函数。这个函数接受一个整数参数，来明确字符串需要重复几次。这个函数要求字符串重复指定的次数。举个例子：
``` javascript
console.log('hello'.repeatify(3))
```
实现方法：
``` javascript
// 首先判断该函数是否存在
String.prototype.repeatify = String.prototype.repeatify || function(times) {
  var str = '';
  for (var i = 0; i < times; i++) {
  str += this;
  }
  return str;
};
```

---

请实现一个函数，运算结果可以满足如下预期结果：
``` javascript
add(1)(2) // 3
add(1, 2, 3)(10) // 16
add(1)(2)(3)(4)(5) // 15
```
看到题目首先想到的是会用到高阶函数以及 Array.prototype.reduce()。
高阶函数(Higher-order function)：高阶函数的意思是它接收另一个函数作为参数。在 javascript 中，函数是一等公民，允许函数作为参数或者返回值传递。

得到了下面这个解法：
``` javascript
function add () {
  // Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）
  var args = Array.prototype.slice.call(arguments);
  var fn = function () {
    var arg_fn = Array.prototype.slice.call(arguments);
    return add.apply(null, args.concat(arg_fn));
  }
  fn.valueOf = function () {
    return args.reduce(function(a, b) {
      return a + b;
    })
  }
  return fn;
}
```
---

## 作用域
1. 全局变量：
   - 在全局范围内声明的变量，如var a=1;
   - 只有赋值没有声明的值，如a=2; （注：如果a=2在函数环境中，也是全局变量）
2. 局部变量：
写入函数中的变量，叫做局部变量。
3. 作用：
   - 程序的安全。
   - 内存的释放。
4. 作用域链：
查找量的过程。先找自己局部环境有没有声明或者是函数，如果有，则查看声明有无赋值或者是函数的内容，如果没有，则向上一级查找。
5. 预解析顺序：
每个程序都要做的工作，程序开始先预解析语法，标点符号是否有误，解析内存是否可容纳，解析变量……直到解析无误了，才开始按正常的流程顺序走。试想一下，如果没有预解析顺序，直接按流程顺序走，可能程序执行到最后一个函数，发现了语法错误，才开始报错，那性能要有多差啊！
**顺序内容**：
1.文件内引用的 < script > 块依次解析，从上到下连成一片。
2.每个script块内部的var（注意：只解析变量名，不解析值，如var a=2;将var a解析在环境的开头，并不解析后面的值，只有当程序执行到var a=2这行时，才会给变量赋值），function解析到本块的开头。
3.依次解析每个环境，将var,function解析到环境的开头。

6. 应用场景（一些常见的作用域相关的面试题）：
``` javascript
var a="aa";
function test(){
 alert(a);//undefined，函数执行后，在函数环境内，var a会预解析，当弹出a时，首先先找本层环境内有无声明，发现有。但是代码没有执行到赋值，所以结果是undefined。
 var a="bb";//var a会预解析在函数开头，执行到这行才进行赋值
 alert(a);//“bb”
}
test();
alert(a);//"aa" 找全局环境下的声明，找到了var a="aa"


var a="aa";
function test(){
 alert(a);//“aa”，函数执行后，在函数环境内，没有找到本层环境关于a的声明，所以开始向上一层环境查找。
 a="bb";//执行到这行开始改变全局a的量
}
test();
alert(a);//"bb" 全局环境的a在函数执行时已经被改变


function test(){ 
 b();//函数b会被预解析，因此可以调用，执行了输出1；
 var a=1;
 function b(){
  console.log(1);
  console.log(a);//undefined
  var a=2;
 }
}
test();
```

---

## 使用 typeof bar === "object" 判断 bar 是不是一个对象有神马潜在的弊端？如何避免这种弊端？

使用 typeof 的弊端是显而易见的(这种弊端同使用 instanceof)：
``` javascript
let obj = {};
let arr = [];
console.log(typeof obj === 'object'); //true
console.log(typeof arr === 'object'); //true
console.log(typeof null === 'object'); //true
```
从上面的输出结果可知，typeof bar === "object" 并不能准确判断 bar 就是一个 Object。可以通过 Object.prototype.toString.call(bar) === "[object Object]" 来避免这种弊端：
``` JavaScript
console.log(Object.prototype.toString.call(obj)); //[object Object]
console.log(Object.prototype.toString.call(arr)); //[object Array]
console.log(Object.prototype.toString.call(null)); //[object Null]
```
另外，为了珍爱生命，请远离 ==：
而 [] === false 是返回 false 的。

---

## 下面的代码会在 console 输出神马？为什么？
``` javascript
(function(){
 var a = b = 3;
})();
console.log(b); //3
console,log(typeof a); //undefined
```
拆解一下自执行函数中的变量赋值：
``` javascript
b = 3;
var a = b;
```
所以 b 成了全局变量，而 a 是自执行函数的一个局部变量。

---

## 将 JavaScript 代码包含在一个函数块中有神马意思呢？为什么要这么做？
换句话说，为什么要用立即执行函数表达式（Immediately-Invoked Function Expression）。
IIFE 有两个比较经典的使用场景，一是类似于在循环中定时输出数据项，二是类似于 JQuery/Node 的插件和模块开发。
``` javascript
for(var i = 0; i < 5; i++) {
 setTimeout(function() {
 console.log(i);
 }, 1000);
}
```
上面的输出并不是你以为的0，1，2，3，4，而输出的全部是5，这时 IIFE 就能有用了：
``` javascript
for(var i = 0; i < 5; i++) {
 (function(i) {
 setTimeout(function() {
 console.log(i);
 }, 1000);
 })(i)
}
```
而在 JQuery/Node 的插件和模块开发中，为避免变量污染，也是一个大大的 IIFE：
``` javascript
(function($) {
 //代码
 } )(jQuery);
```
---

## 实现函数 isInteger(x) 来判断 x 是否是整数
可以将 x 转换成10进制，判断和本身是不是相等即可：
``` javascript
function isInteger(x) {
 return parseInt(x, 10) === x;
}
```
ES6 对数值进行了扩展，提供了静态方法 isInteger() 来判断参数是否是整数：
``` javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
```
JavaScript能够准确表示的整数范围在 -2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6 引入了Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限，并提供了 Number.isSafeInteger() 来判断整数是否是安全型整数。

---

## 在下面的代码中，数字 1-4 会以什么顺序输出？为什么会这样输出？
``` javascript
(function() {
 console.log(1);
 setTimeout(function(){console.log(2)}, 1000);
 setTimeout(function(){console.log(3)}, 0);
 console.log(4);
})();
```
这个就不多解释了，主要是 JavaScript 的定时机制和时间循环，不要忘了，JavaScript 是单线程的。详解可以参考 从setTimeout谈JavaScript运行机制。

---

## 写一个少于 80 字符的函数，判断一个字符串是不是回文字符串
``` javascript
function isPalindrome(str) {
 str = str.replace(/\W/g, '').toLowerCase();
 return (str == str.split('').reverse().join(''));
}
```

## 写一个按照下面方式调用都能正常工作的 sum 方法
``` javascript
console.log(sum(2,3)); // Outputs 5
console.log(sum(2)(3)); // Outputs 5

function sum() {
 var fir = arguments[0];
 if(arguments.length === 2) {
 return arguments[0] + arguments[1]
 } else {
 return function(sec) {
 return fir + sec;
    }
  }
}
```
---

## 根据下面的代码片段回答后面的问题
``` javascript
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```
1. 点击 Button 4，会在控制台输出什么？
点击5个按钮中的任意一个，都是输出5
2. 给出一种符合预期的实现方式
参考 IIFE。

---

## 下面的代码会输出什么？为什么？
``` javascript
var arr1 = "john".split(''); // j o h n
var arr2 = arr1.reverse(); // n h o j
var arr3 = "jones".split(''); // j o n e s
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```
reverse() 会改变数组本身，并返回原数组的引用。
slice 的用法请参考：slice

---

## 下面的代码会输出什么？为什么？
``` javascript
console.log(1 + "2" + "2"); // 122
console.log(1 + +"2" + "2"); // 32
console.log(1 + -"1" + "2"); // 02
console.log(+"1" + "1" + "2"); // 112
console.log( "A" - "B" + "2"); // NaN2
console.log( "A" - "B" + 2); // NaN
```
输出什么，自己去运行吧，需要注意三个点：
多个数字和数字字符串混合运算时，跟操作数的位置有关
``` javascript
console.log(2 + 1 + '3'); // ‘33'
console.log('3' + 2 + 1); //'321'
```
数字字符串之前存在数字中的正负号(+/-)时，会被转换成数字
``` javascript
console.log(typeof '3'); // string
console.log(typeof +'3'); // number
```
同样，可以在数字前添加 ''，将数字转为字符串
``` javascript
console.log(typeof 3); // number
console.log(typeof (''+3)); //string
```
对于运算结果不能转换成数字的，将返回 NaN
``` javascript
console.log('a' * 'sd'); //NaN
console.log('A' - 'B'); // NaN
```
---

## 解释下列代码的输出
``` javascript
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```
逻辑与和逻辑或运算符会返回一个值，并且二者都是短路运算符：
逻辑与返回第一个是 false 的操作数 或者 最后一个是 true的操作数
``` javascript
console.log(1 && 2 && 0); //0
console.log(1 && 0 && 1); //0
console.log(1 && 2 && 3); //3
```
如果某个操作数为 false，则该操作数之后的操作数都不会被计算
逻辑或返回第一个是 true 的操作数 或者 最后一个是 false的操作数
``` javascript
console.log(1 || 2 || 0); //1
console.log(0 || 2 || 1); //2
console.log(0 || 0 || false); //false
```
如果某个操作数为 true，则该操作数之后的操作数都不会被计算
如果逻辑与和逻辑或作混合运算，则逻辑与的优先级高：
``` javascript
console.log(1 && 2 || 0); //2
console.log(0 || 2 && 1); //1
console.log(0 && 2 || 1); //1
```
在 JavaScript，常见的 false 值：
0, '0', +0, -0, false, '',null,undefined,null,NaN
要注意空数组([])和空对象({}):
``` javascript
console.log([] == false) //true
console.log({} == false) //false
console.log(Boolean([])) //true
console.log(Boolean({})) //true
```
所以在 if 中，[] 和 {} 都表现为 true：
``` javascript
console.log(false == '0') // true
console.log(false === '0') // false
```
---

## 解释下面代码的输出
``` javascript
var a={},
b={key:'b'},
c={key:'c'};
a[b]=123; // 一个对象作为另一个对象的属性名会被转换成string，a[b] 等效为 a[object object]. 因为({}).toString 为[Object Object]
a[c]=456; // 这里重新给a[Object Object] 赋值为456
console.log(a[b]); // 456， 因为最后打印的仍是 a[Object Object]

(1).toString()      // "1"
[1,2].toString()    // "1, 2"
({}).toString()     // [object Object]
true.toString()     // "true"
null.toString()     // Uncaught TypeError: Cannot read property 'toString' of null
undefined.toString()  // Uncaught TypeError: Cannot read property 'toString' of null
```
---

## 解释下面代码的输出，并修复存在的问题
``` javascript
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function (){
  return this._name;
  }
};
var stoleSecretIdentity = hero.getSecretIdentity;
console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```
将 getSecretIdentity 赋给 stoleSecretIdentity，等价于定义了 stoleSecretIdentity 函数：
``` javascript
var stoleSecretIdentity = function (){
 return this._name;
}
```
stoleSecretIdentity的上下文是全局环境，所以第一个输出 undefined。若要输出 John Doe，则要通过 call 、apply 和 bind 等方式改变 stoleSecretIdentity 的this 指向(hero)。
第二个是调用对象的方法，输出 John Doe。

---

## 给你一个 DOM 元素，创建一个能访问该元素所有子元素的函数，并且要将每个子元素传递给指定的回调函数。
函数接受两个参数：DOM, 指定的回调函数
原文利用 深度优先搜索(Depth-First-Search) 给了一个实现：
``` javascript
function Traverse(p_element,p_callback) {
  p_callback(p_element);
  var list = p_element.children;
  for (var i = 0; i < list.length; i++) {
  Traverse(list[i],p_callback); // recursive call
  }
}
```

---

## 解释以下下面代码的输出
``` javascript
console.log(0.1 + 0.2);   //0.30000000000000004
console.log(0.1 + 0.2 == 0.3);  //false
```
JavaScript 中的 number 类型就是浮点型，JavaScript 中的浮点数采用IEEE-754 格式的规定，这是一种二进制表示法，可以精确地表示分数，比如1/2，1/8，1/1024，每个浮点数占64位。但是，二进制浮点数表示法并不能精确的表示类似0.1这样 的简单的数字，会有舍入误差。

由于采用二进制，JavaScript 也不能有限表示 1/10、1/2 等这样的分数。在二进制中，1/10(0.1)被表示为 0.00110011001100110011…… 注意 0011 是无限重复的，这是舍入误差造成的，所以对于 0.1 + 0.2 这样的运算，操作数会先被转成二进制，然后再计算：

0.1 => 0.0001 1001 1001 1001…（无限循环）
0.2 => 0.0011 0011 0011 0011…（无限循环）

双精度浮点数的小数部分最多支持 52 位，所以两者相加之后得到这么一串 0.0100110011001100110011001100110011001100...因浮点数小数位的限制而截断的二进制数字，这时候，再把它转换为十进制，就成了 0.30000000000000004。

**对于保证浮点数计算的正确性，有两种常见方式。**
1. 先升幂后降幂
``` javascript
function add(num1, num2){
 let r1, r2, m;
 r1 = (''+num1).split('.')[1].length;
 r2 = (''+num2).split('.')[1].length;
 m = Math.pow(10,Math.max(r1,r2));
 return (num1 * m + num2 * m) / m;
}
console.log(add(0.1,0.2)); //0.3
console.log(add(0.15,0.2256)); //0.3756
```
2. 是使用内置的 toPrecision() 和 toFixed() 方法，注意，方法的返回值字符串。
``` javascript
function add(x, y) {
 return x.toPrecision() + y.toPrecision()
}
console.log(add(0.1,0.2)); //"0.10.2"
```

// toPrecision()把数字格式化为指定长度
// toFixed()把数字格式化保存几位小数

---

## 如果 list 很大，下面的这段递归代码会造成堆栈溢出。如果在不改变递归模式的前提下修善这段代码？
``` javascript
var list = readHugeList();
var nextListItem = function() {
  var item = list.pop();
  if (item) {
    // process the list item...
    nextListItem();
  }
};
```
一种解决方式是加个定时器：
``` javascript
var list = readHugeList();
var nextListItem = function() {
  var item = list.pop();
  if (item) {
    // process the list item...
    setTimeout( nextListItem, 0);
  }
};
```


---

## 阻止冒泡，阻止默认事件
- 阻止冒泡：
e.stopPropagation
e.cancleBubble=true（IE）
return false；
- 阻止默认事件：
e.preventDefault();
e.returnValue=false;（IE）
return false;

---

## 函数作用域
函数作用域是指在函数内声明的所有变量在函数体内始终是可见的，可以在整个函数的范围内使用及复用.
**全局变量**：声明在函数外部的变量，在代码中任何地方都能访问到的对象拥有全局作用域（所有没有var直接赋值的变量都属于全局变量）
**局部变量**：声明在函数内部的变量，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部，所有在一些地方也会看到有人把这种作用域称为函数作用域。

---

## 如何解决异步回调地狱
1. promise
let getStuPromise = new Promise((resolve,reject)=>{
    getStu(function(res){
        resolve(res.data);
    });});getStuPromise.then((data)=>{
    // 得到每个学生的课程
    getCourse();
    // 还可以继续返回promise 对象})
2. generator
function *generatorGetStu(){
    let stus = yield getStu();
    // 等到getStu异步执行完才会执行getCourse
    let course = yield getCourse();}
3. async/await
async函数是Generator函数的语法糖。使用 关键字async来表示，在函数内部使用await来表示异步

---

## 事件委托理解
通俗的讲，事件就是onclick，onmouseover，onmouseout，等就是事件，委托呢，就是让别人来做，这个事件本来是加在某些元素上的，然而你却加到别人身上来做，完成这个事件.
原理: 利用冒泡的原理，把事件加到父级上，触发执行效果。
target 事件属性可返回事件的目标节点（触发 该事件的节点）
``` javascript
oUl.onmouseover = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeeName.toLowerCase() == "li"){
      target.style.background = "red";
    }}
```
---

## 图片的懒加载和预加载
1. 预加载：常用的是new Image();，设置其src来实现预载，再使用onload方法回调预载完成事件。
``` javascript
function loadImage(url, callback){
    var img = new Image(); //创建一个Image对象，实现图片预下载
    img.src = url;
    if (img.complete){
        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    }
    img.onload = function (){ 
    //图片下载完毕时异步调用callback函数。
    callback.call(img);//将回调函数的this替换为Image对象 ，如果你直接用img.width的时候，图片还没有完全下载下来
    };}
```
2. 懒加载：主要目的是作为服务器前端的优化，缓解服务器前端压力，一次性请求次数减少或延迟请求。
实现方式：
   - 第一种是纯粹的延迟加载，使用setTimeOut、setInterval进行加载延迟.
   - 第二种是条件加载，符合某些条件，或触发了某些事件才开始异步下载。
   - 第三种是可视区加载，即仅加载用户可以看到的区域，这个主要由监控滚动条来实现，一般会在距用户看到某图片前一定距离遍开始加载，这样能保证用户拉下时正好能看到图片。

---

## bind,apply,call的区别

都可以改变函数内部this指向
区别：
call传递参数aru1， aru2… 形式
apply传递参数必须数组形式[arg]
bind不会调用函数，可以改变函数内部this指向
主要应用场景：
1、call经常做继承。
2、apply经常跟数组有关系。比如借助于数学对象实现数组最大值最小值。
3、bind不会调用函数，可以改变函数内部this指向。

---
## js的节流和防抖
防抖：多次触发事件，事件处理函数只能执行一次，并且是在触发操作结束时执行。也就是说，当一个事件被触发准备执行事件函数前，会等待一定的时间（这时间是码农自己去定义的，比如 1 秒），如果没有再次被触发，那么就执行，如果被触发了，那就本次作废，重新从新触发的时间开始计算，并再次等待 1 秒，直到能最终执行！
节流：当持续触发事件时，保证在一定时间内只调用一次事件处理函数，意思就是说，假设一个用户一直触发这个函数，且每次触发小于既定值，函数节流会每隔这个时间调用一次。时间戳和定时器
区别：防抖是将多次执行变为最后一次执行，节流是将多次执行变为每隔一段时间执行。
使用场景：
节流：滚动加载更多、搜索框的搜索联想功能、高频点击、表单重复提交……
防抖：搜索框搜索输入，并在输入完以后自动搜索、手机号，邮箱验证输入检测、窗口大小 resize 变化后，再重新渲染。

---
## 前端模块化和组件化
模块化：可复用，侧重的功能的封装，主要是针对Javascript代码，隔离、组织复制的javascript代码，将它封装成一个个具有特定功能的的模块。
组件化：可复用，更多关注的UI部分，页面的每个部件，比如头部，弹出框甚至确认按钮都可以成为一个组件，每个组件有独立的HTML、css、js代码。

---
## js单线程怎么执行异步操作
Js作为浏览器脚本语言，它的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。
js怎么异步：浏览器只分配给js一个主线程，用来执行任务（函数），但一次只能执行一个任务，这些任务形成一个任务队列排队等候执行，但前端的某些任务是非常耗时的，比如网络请求，定时器和事件监听，如果让他们和别的任务一样，执行效率会非常的低，甚至导致页面的假死。
所以，浏览器为这些耗时任务开辟了另外的线程，主要包括http请求线程，浏览器定时触发器，浏览器事件触发线程，这些任务是异步的。这些异步任务完成后通过回调函数让主线程知道。

---
## EventLoop 事件循环
JS是单线程的，为了防止一个函数执行时间过长阻塞后面的代码，所以会先将同步代码压入执行栈中，依次执行，将异步代码推入异步队列，异步队列又分为宏任务队列和微任务队列，因为宏任务队列的执行时间较长，所以微任务队列要优先于宏任务队列。微任务队列的代表就是，Promise.then，MutationObserver，宏任务的话就是setImmediate setTimeout setInterval
JS运行的环境。一般为浏览器或者Node。 在浏览器环境中，有JS 引擎线程和渲染线程，且两个线程互斥。 Node环境中，只有JS 线程。 不同环境执行机制有差异，不同任务进入不同Event Queue队列。 当主程结束，先执行准备好微任务，然后再执行准备好的宏任务，一个轮询结束。
浏览器中的事件环（Event Loop)
事件环的运行机制是，先会执行栈中的内容，栈中的内容执行后执行微任务，微任务清空后再执行宏任务，先取出一个宏任务，再去执行微任务，然后在取宏任务清微任务这样不停的循环。


eventLoop 是由JS的宿主环境（浏览器）来实现的；
事件循环可以简单的描述为以下四个步骤:

1. 函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs,接着执行同步任务,直到Stack为空；
2. 此期间WebAPIs完成这个事件，把回调函数放入队列中等待执行（微任务放到微任务队列，宏任务放到宏任务队列）
3. 执行栈为空时，Event Loop把微任务队列执行清空；
4. 微任务队列清空后，进入宏任务队列，取队列的第一项任务放入Stack(栈）中执行，执行完成后，查看微任务队列是否有任务，有的话，清空微任务队列。重复4，继续从宏任务中取任务执行，执行完成之后，继续清空微任务，如此反复循环，直至清空所有的任务。
![eventLoop](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/342e581223d2471d9484fc48beb9f8e1~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
浏览器中的任务源(task):
宏任务(macrotask)：
宿主环境提供的，比如浏览器
ajax、setTimeout、setInterval、setImmediate(只兼容ie)、script、requestAnimationFrame、messageChannel、UI渲染、一些浏览器api
微任务(microtask)：
语言本身提供的，比如promise.then
then、queueMicrotask(基于then)、mutationObserver(浏览器提供)、messageChannel 、mutationObersve

---
## json和xml数据的区别
数据体积方面：xml是重量级的，json是轻量级的，传递的速度更快些。
数据传输方面：xml在传输过程中比较占带宽，json占带宽少，易于压缩。
数据交互方面：json与javascript的交互更加方便，更容易解析处理，更好的进行数据交互
数据描述方面：json对数据的描述性比xml较差
xml和json都用在项目交互下，xml多用于做配置文件，json用于数据交互。

---
## JS常见的dom操作api
[常用DOM操作API](https://juejin.cn/post/6844903604445249543)

---
[DOM事件模型](https://juejin.cn/post/6844903850323755021)
## 解释一下事件冒泡和事件捕获
 element.addEventListener(event, function, useCapture)
 | 参数 | 描述 |
 | --- | --- |
 | event | 必须。字符串，指定事件名。注意: 不要使用 "on" 前缀。 例如，使用 "click" ,而不是使用 "onclick"。 提示： 所有 HTML DOM 事件，可以查看我们完整的 HTML DOM Event 对象参考手册。|
 | function | 必须。指定要事件触发时执行的函数。当事件对象会作为第一个参数传入函数。 事件对象的类型取决于特定的事件。例如， "click" 事件属于 MouseEvent(鼠标事件) 对象。 |
 | useCapture | 可能值:true - 事件句柄在捕获阶段执行（即在事件捕获阶段调用处理函数）false- 默认。事件句柄在冒泡阶段执行（即表示在事件冒泡的阶段调用事件处理函数） |
[事件冒泡、事件捕获、事件委托](https://juejin.cn/post/6844903834075021326)

---
## 对闭包的理解？什么时候构成闭包？闭包的实现方法？闭包的优缺点？
**描述**：当一个函数的返回值是另外一个函数,而返回的那个函数如果调用了其父函数内部的变量,且返回的这个函数在外部被执行，就产生了闭包。闭包是一个环境，能够读取其他函数内部的变量。
**作用**：从外部读取内部的变量（由于作用域，正常情况是无法读取内部的局部变量的），将创建的变量值始终保持在内存中。
**优点**： 可以避免全局变量的污染，将变量私有化。
**缺点**： 1.由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。2.闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

---
## [js的垃圾回收机制与内存泄漏](https://www.51cto.com/article/683431.html)
### 垃圾回收机制
- **原理**：找到不再继续使用的变量，释放其内存。垃圾回收器会按照固定的时间间隔(或代码中预定的收集时间)，周期性地执行回收;
- 全局变量的声明周期会一直持续，直到页面卸载。而局部变量声明在函数中，它的声明周期从执行函数开始，直到函数执行结束。在这个过程中，局部变量会在堆或栈上被分配相应的空间以存储它们的值，函数执行结束，这些局部变量也不再被使用，所占用的空间也就被释放;
- **回收方式**：垃圾回收的两种实现方式：**标记清除**、**引用计数**

**标记清除（主流浏览器）**
思想：垃圾回收器在运行时会给存储在内存中的变量加上标记。环境变量和被环境变量引用的变量的不会被标记，而加上标记的变量(环境变量中没有使用访问的变量)就是准备删除的变量。最后垃圾回收器完成清除工作，销毁那些带标记的值，并回收他们占用的内存空间。

标记和扫描算法经过：
1. 从根节点出发，一般来说，根是代码中引用的全局变量
2. 然后算法检查所有根节点和他们的子节点并且把他们标记为活跃的(意思是他们不是垃圾)。任何根节点不能访问的变量将被标记为垃圾;
3. 最后，垃圾收集器释放所有未被标记为活跃的内存块，并将这些内存返回给操作系统;

**引用计数（IE9以下）**
思想：跟踪记录所有值被引用的次数。例如变量a赋值后，这个值的引用次数为1，这个a值又被赋值给另一个变量b，这时引用次数+1;但当b赋另外的值，引用次数-1;当值的引用书为0，说明没有办法再访问这个值，这时就可以将内存回收了。

IE9以下还在使用引用计数，当对象循环引用时，引用次数无法标记为0，就会导致无法被回收。其他浏览器废弃使用;

### 内存泄漏的场景和原因
1. 未声明的全局变量
js对未声明变量会在全局最高对象上创建它的引用，(是以属性存在的，而不是变量)，如果在游览器上就是window对象，如果在node环境下就是global;如果未声明的变量缓存大量的数据，它可能只有在页面被刷新或者被关闭的时候才会释放内存，这样就造成了内存意外泄漏;

2. 被忘记的定时器或者回调函数
正确的使用方法是，确保一旦依赖于它们的事件已经处理完成，就通过明确的调用来删除它们。

3. 闭包
4. DOM泄漏
浏览器中DOM和js采用的是不一样的引擎，DOM采用的是渲染引擎，而js采用的是v8引擎，所以在用js操作DOM时会比较耗费性能，因为他们需要桥来链接他们。为了减少DOM的操作，我们一般将常用的DOM;
我们会采用变量引用的方式会将其缓存在当前环境。如果在进行一些删除、更新操作之后，可能会忘记释放已经缓存的DOM;

---
## [this有哪些使用场景？跟C,Java中的this有什么区别？如何改变this的值？](https://www.jb51.net/article/180383.htm)
1. 普通函数的调用，this指向的是window
2. 对象方法的调用，this指的是该对象，且是最近的对象
3. 构造函数的调用，this指的是实例化的新对象
4. apply和call调用，this指向参数中的对象
5. 匿名函数的调用，this指向的是全局对象window
6. 定时器中的调用，this指向的是全局变量window

---
## [显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有原型链](https://blog.csdn.net/weixin_40387601/article/details/80327955)
### 原型
是什么：在JavaScript中原型是一个prototype对象，用于表示类型之间的关系。

显式原型：`prototype`            
隐式原型：`__proto__`
1. 每个函数function都有一个prototype，即显式原型(属性)
2. 每个实例对象都有一个__proto__，可称为隐式原型(属性)
3. 对象的隐式原型的值为其对应构造函数的显式原型的值
4. 总结:
  * 函数的prototype属性: 在定义函数时自动添加的, 默认值是一个空Object对象
  * 对象的__proto__属性: 创建对象时自动添加的, 默认值为构造函数的prototype属性值
  *Object.prototype的__proto__属性指向null。

**区别**：
__proto__是每个对象都有的一个属性，而prototype是函数才会有（函数也有__proto__）的属性。
__proto__指向的是当前对象的原型对象，而prototype指向它的构造函数的原型对象。

**作用**：
1、肯定是为了继承！
2、prototype用来实现基于原型的继承与属性的共享。
3、__proto__就构成了我们常说的原型链 访问构造方法中的显示原型，同样用于实现基于原型的继承。

### 原型链
是什么：JavaScript万物都是对象，对象和对象之间也有关系，并不是孤立存在的。对象之间的继承关系，在JavaScript中是通过prototype对象指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条，专业术语称之为原型链。

原型链就是创建一个构造函数，它会默认生成一个prototype属性并指向原型对象。使用下一个构造函数的原型对象作为这个构造函数的实例。即 nextFuction.prototype = new thisFuction(); 

在下下一个构造函数的原型对象 = new nextFuction。这样下去就会构成一条实例与原型之间的链条，这就是原型链。

![手绘原型链](https://img-blog.csdn.net/2018051619312092?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDM4NzYwMQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

---
## [创建对象的多种方式](https://www.cnblogs.com/shirliey/p/11696412.html)
1. new + Object
2. {} 字面式创建
3. 工厂模式：用函数包装一个new 对象，并返回这个新对象
工厂模式解决了重复实例化多个对象的问题，但没有解决对象识别的问题（工厂模式无从识别对象的类型，因为全部都是Object，不像Date、Array等，本例中，得到的都是o对象，对象的类型都是Object，因此出现了构造函数模式）。
4. 构造函数模式：构造函数也有其缺陷，每个实例都包含不同的Function实例（ 构造函数内的方法在做同一件事，但是实例化后却产生了不同的对象，方法是函数 ，函数也是对象）
5. 原型模式：原型模式的好处是所有对象实例共享它的属性和方法（即所谓的共有属性），此外还可以如代码第16,17行那样设置实例自己的属性（方法）（即所谓的私有属性），可以覆盖原型对象上的同名属性（方法）。
6. 混合模式
构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性
混合模式共享着对相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存。

---
## [实现继承的多种方式和优缺点](https://blog.csdn.net/qq_44162474/article/details/98489229)
1. **原型链继承**
缺点：引用值共享问题，不能传参
2. **经典继承（借用构造函数）**
优点：解决了引用值共享问题，可以通过Child向Parent传参
缺点：多执行一次函数call，Parent上的原型不能被继承
3. **伪经典继承（组合继承）**：将原型链继承和借用构造函数阶乘结合在一起
优点（结合了原型链继承和构造函数继承的优点）：Parent上的原型可以被继承，解决了引用值共享的问题，可以通过Child向Parent传参
缺点：函数多执行了一次call
4. **原型式继承**
重点：用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。
特点：类似于复制一个对象，用函数来包装。
缺点：所有实例都会继承原型上的属性。无法实现复用。（新实例属性都是后面添加的）
5. **寄生式继承**
重点：就是给原型式继承外面套了个壳子。
优点：没有创建自定义类型，因为只是套了个壳子返回对象（这个），这个函数顺理成章就成了创建的新对象。
缺点：没用到原型，无法复用。
6. **寄生组合式继承**
优点：解决调用两次call问题

---
## new 一个对象具体做了什么
1. 创建一个新的空对象
2. 将this指向该空对象
3. 将对象的__proto__指向构造函数的prototype
4. 如果没有显示的return则默认返回this

---
## 举例说明一个匿名函数的典型用例
立即执行函数 就是一个典型用例

---
## [宿主对象、原生对象、内置对象](https://blog.csdn.net/weixin_40387601/article/details/80431670)
**原生对象**：独立于宿主环境的ECMAScript实现提供的对象。本地对象就是 ECMA-262 定义的类（引用类型）。在运行过程中动态创建的对象，需要new
Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、Global

**数组对象**：有宿主提供的对象，在浏览器中window对象以及其下边所有的子对象(如bom、dom等等)，在node中是globla及其子对象，也包含自定义的类对象。也包含new出来的实例对象

### 为什么扩展JS内置对象不是好的做法
因为你不知道哪一天浏览器或javascript本身就会实现这个方法，而且和你扩展的实现有不一致的表现。到时候你的javascript代码可能已经在无数个页面中执行了数年，而浏览器的实现导致所有使用扩展原型的代码都崩溃了。。。

### JS内置对象
String对象：字符串对象，提供了对字符串进行操作的属性和方法。
Array对象：数组对象，提供了数组操作方面的属性和方法。
Date对象：日期时间对象，可以获取系统的日期时间信息。
Boolean对象：布尔对象，一个布尔变量就是一个布尔对象。(没有可用的属性和方法)
Number对象：数值对象。一个数值变量就是一个数值对象。
Math对象：数学对象，提供了数学运算方面的属性和方法。
RegExp:正则。

### JS内置函数
js内置函数是浏览器内核自带的，不用任何函数库引入就可以直接使用的函数。 
(1)alert函数：显示一个警告对话框，包括一个OK按钮。 
(2)confirm函数：显示一个确认对话框，包括OK、Cancel按钮。 
(3)escape函数：将字符转换成Unicode码。 
(4)eval函数：计算表达式的结果。 
(5)isNaN函数：测试是(true)否(false)不是一个数字。 
(6)parseFloat函数：将字符串转换成符点数字形式。 
(7)parseInt函数：将符串转换成整数数字形式(可指定几进制)。 
(8)prompt函数：显示一个输入对话框，提示等待用户输入。


**内置对象**：
Global（全局对象）、Math 

**宿主对象**：在浏览器中window对象以及其下边所有的子对象(如bom、dom等等)，在node中是globla及其子对象，也包含自定义的类对象。


---
## [document load和document DOMContentLoaded两个事件的区别](https://blog.csdn.net/weixin_40387601/article/details/80500235)
DOMContentLoaded: DOM解析完成即触发此事件，不等待styles, images等资源的加载
load：依赖的资源也已加载完成
DOMContentLoaded绑定到document，load绑定到window
何时触发这两个事件？
1.当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
2.当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。

为什么要区分？
我们需要给一些元素的事件绑定处理函数。但问题是，如果那个元素还没有加载到页面上，但是绑定事件已经执行完了，是没有效果的。
这两个事件大致就是用来避免这样一种情况，将绑定的函数放在这两个事件的回调中，保证能在页面的某些元素加载完毕之后再绑定事件的函数。

DOM文档加载的步骤为:
1. 解析HTML结构。
2. 加载外部脚本和样式表文件。
3. 解析并执行脚本代码。
4. DOM树构建完成。//DOMContentLoaded
5. 加载图片等外部文件。
6. 页面加载完毕。//load
在第4步，会触发DOMContentLoaded事件。在第6步，触发load事件。

---
## [JS重载(多态)](https://smartline.cc/js-fun-reload/)
函数重载就是使用相同函数名实现不同的函数功能。主要逻辑是通过根据函数argument对象类型判断函数当前应该执行的逻辑。

---
## 常用的数组api，字符串api
数组API：indexOf、reverse、push、pop、shift、unshift、splice、slice、sort、forEach、filter、map、join

**会改变数组的有**：pop / push / shift / unshift / splice / reverse / sort / forEach
forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

join()：数组转为字符串，可带中间符号
push()：数组尾部添加内容，返回新长度
pop()：数组尾部删除一条内容，返回长度
unshift()：数组头部添加内容，返回新长度
shift()：数组头部删除一条内容，返回删除内容
sort()：数组内容从大到小排序
reverse()：反转数组内容项
concat()：拼接数组，若无内容复制数组内容
slice()：截取数组，从指定下标开始
splice()：删除、插入、替换；
删除：2 个参数：要删除的第一项的位置和要删除的项数。
插入：3 个参数：起始位置、 0（要删除的项数）和要插入的项。
替换：3 个参数：起始位置、要删除的项数和要插入的任意数量的项。

---

## 字符串方法

字符串API：charAt、indexOf、toUpperCase、toLowerCase、search、substr、substring、split
charAt()：根据下标找到对应值
charCodeAt()：通过下标值找到对应字符Unicode编码
indexOf()：通过字符查找对应下标（首次出现）
lastIndexOf()：通过字符找最后一次出现的下标值
slice()：截取字符串，2个参数，（起始位置，结束位置）
split()：把字符串按分隔符分割成数组
substring()：截取字符串，（起始位置，结束位置）
substr()：截取指定位置和长度的字符串，（起始位置，长度）
toLowerCase()：字符串转为小写
toUpperCase()：字符串转成大写
trim()：去掉字符串前后所有空格
substr是从起始索引号开始提取指定长度的字符串；substring是提取字符串中两个指定索引号之间的字符

---
## [DOM事件的绑定的几种方式](https://juejin.cn/post/6844903758996963342)
1. 元素行内绑定
`<div id="btn" onclick="func()"></div>`
2. JS代码绑定
``` javascript
document.getElementById('btn').onclick = func()
```
3. 绑定事件监听函数
document.getElementById('btn').addEventListener('click', func(), false)

特点：用 "addeventlistener" 可以绑定多次同一个事件，且都会执行，而在DOM结构如果绑定两个 "onclick" 事件，只会执行第一个；在脚本通过匿名函数的方式绑定的只会执行最后一个事件。

## dom0和dom2的区别？
**dom0是属性绑定**
var btn = document.getElementById("btn");
  btn.onclick = function(){
  alert('cliked');
}
**dom2是函数绑定式**
 var btn = document.getElementById("btn");
 var handler = function(){
 alert(this.id);
 }
 btn.addEventListener("click",handler,false);  
 btn.removeEventListener("click",handler,false);//移除


---
## 给定一个元素获取它相对于视图窗口的坐标
1. **clientHeight**和**clientWidth**用于描述元素内尺寸，是指 **元素内容+内边距** 大小，不包括边框（IE下实际包括）、外边距、滚动条部分 
2. **offsetHeight**和**offsetWidth**用于描述元素外尺寸，是指 **元素内容+内边距+边框**，不包括外边距和滚动条部分 
3. **clientTop**和**clientLeft**返回内边距的边缘和边框的外边缘之间的水平和垂直距离，也就是左，上边框宽度 
4. **offsetTop**和**offsetLeft**表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离 
5. **offsetParent**对象是指元素最近的定位（relative,absolute）祖先元素，递归上溯，如果没有祖先元素是定位的话，会返回null

---
## 正则表达式的函数怎么使用？


---
## web端cookie的设置和获取
- 创建 cookie 如下所示：
`document.cookie="username=John Doe";`
- 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：
`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";`
- 使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。
`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";`
- 获取cookie
`var x = document.cookie;`
- 修改cookie
`document.cookie="username=John Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";`
- 删除cookie，只需要设置 expires 参数为以前的时间即可，如下所示，设置为 Thu, 01 Jan 1970 00:00:00 GMT:
`document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";`

---
## setTimeout和promise的执行顺序
setTimeout属于宏任务，promise属于微任务，在同一事件流里面，优先执行完微任务队列，才会执行宏任务队列中的一个任务

---
## JavaScript 的事件流模型都有什么？
捕获阶段、目标阶段、冒泡阶段
第一阶段：捕获阶段，从window对象传导到目标节点
第二阶段：目标阶段，事件在目标节点上触发
第三阶段：冒泡阶段，从目标节点传回window对象

---
## [navigator对象，location和history](https://developer.aliyun.com/article/883853)
专门保存浏览器配置信息的对象。常用属性如下：
![navigator对象](https://ucc.alicdn.com/pic/developer-ecology/21a8a792011044cdb2b1a3683974e94e.png)
专门保存浏览器地址栏中正在打开的一个 url 的信息的对象。可以分段获得 url 中各个部分的信息：
![location对象](https://ucc.alicdn.com/pic/developer-ecology/de5fcae4295f4dc5bb07203b3d695684.png)
history 是内存中专门保存当前窗口打开后成功访问过得所有 url 的历史记录数组，history 数组不可做任何修改操作，功能有前进、后退和刷新。
![history对象](https://ucc.alicdn.com/pic/developer-ecology/fd674fff63e44451827c59cf5dee3a5a.png)

---
## [DOM事件中target和currentTarget的区别](https://www.jianshu.com/p/1dd668ccc97a)
e.currentTarget始终指向添加监听事件的那个对象，而e.target指向触发事件监听的那个对象

---
## [typeof 和 instanceof 区别，instanceof原理](https://juejin.cn/post/6844903613584654344)
js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息👉
- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数
- null：所有机器码均为0
- undefined：用 −2^30 整数来表示
!!! **由于 null 的所有机器码均为0，因此直接被当做了对象来看待。**

然而用 instanceof 来判断的话👉
null instanceof null // TypeError: Right-hand side of 'instanceof' is not an object
null 直接被判断为不是 object，这也是 JavaScript 的历史遗留bug，可以参考typeof。
因此在用 typeof 来判断变量类型的时候，我们需要注意，最好是用 typeof 来判断基本数据类型（包括symbol），避免对 null 的判断。

instanceof 原理就是递归判断 右边的变量的prototype 是否在右边变量的原型链上即可

---
## js动画和css3动画比较
**代码复杂度方面**：
简单动画，css 代码实现会简单一些，js 复杂一些。复杂动画的话，css 代码就会变得冗长，js实现起来更优。
**动画运行时**：对动画的控制程度上，js 比较灵活，能控制动画暂停，取消，终止等，css动画不能添加事件，只能设置固定节点进行什么样的过渡动画。
**兼容方面**：css 有浏览器兼容问题，js 大多情况下是没有的。
**性能方面**：css动画相对于优一些，css 动画通过GUI解析，js 动画需要经过js 引擎代码解析，然后再进行 GUI 解析渲染。

---
## JavaScript 倒计时（setTimeout） 定时器（setInterval）
倒计时和定时器都属于js事件循环中的宏任务

---
## [js处理异常](http://jartto.wang/2018/11/20/js-exception-handling/)
**常见异常**：
JS 语法错误、代码异常
AJAX 请求异常
静态资源加载异常
Promise 异常
Iframe 异常
跨域 Script error
崩溃和卡顿

1. try-catch：只能捕获到同步的运行时错误，无法捕获语法和异步错误
2. window.onerror：
``` javascript
window.onerror = function(message, source, lineno, colno, error) {
  // message：错误信息（字符串）。
  // source：发生错误的脚本URL（字符串）
  // lineno：发生错误的行号（数字）
  // colno：发生错误的列号（数字）
  // error：Error对象（对象）
  console.log('捕获到异常：',{message, source, lineno, colno, error});
  return true;
}
Jartto;
```
3. window.addEventListener:
``` html
<scritp>
window.addEventListener('error', (error) => {
    console.log('捕获到异常：', error);
}, true)
</script>
<img src="./jartto.png">
```
4. Promise Catch
没有写 catch 的 Promise 中抛出的错误无法被 onerror 或 try-catch 捕获到，所以我们务必要在Promise 中不要忘记写 catch 处理抛出的异常。
``` javascript
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e);
  return true;
});
Promise.reject('promise error');
```
5. Vue errorHandler
``` javascript
Vue.config.errorHandler = (err, vm, info) => {
  console.error('通过vue errorHandler捕获的错误');
  console.error(err);
  console.error(vm);
  console.error(info);
}
```
6. Script error
一般情况，如果出现 Script error 这样的错误，基本上可以确定是出现了跨域问题。这时候，是不会有其他太多辅助信息的，但是解决思路无非如下：

   - 跨源资源共享机制( CORS )：我们为 script 标签添加 crossOrigin 属性。
  `<script src="http://jartto.wang/main.js" crossorigin></script>`

   - 或者动态去添加 js 脚本：
  const script = document.createElement('script');
  script.crossOrigin = 'anonymous';
  script.src = url;

总结：
1.可疑区域增加 Try-Catch
2.全局监控 JS 异常 window.onerror
3.全局监控静态资源异常 window.addEventListener
4.捕获没有 Catch 的 Promise 异常：unhandledrejection
5.VUE errorHandler 和 React componentDidCatch
6.监控网页崩溃：window 对象的 load 和 beforeunload
7.跨域 crossOrigin 解决 

---
## [js的设计模式知道那些](https://juejin.cn/post/6844904032826294286)
设计者模式：
设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。

五大设计模式原则SOLID：
**S – Single Responsibility Principle 单一职责原则**
一个程序只做好一件事
如果功能过于复杂就拆分开，每个部分保持独立
**O – OpenClosed Principle 开放/封闭原则**
对扩展开放，对修改封闭
增加需求时，扩展新代码，而非修改已有代码
**L – Liskov Substitution Principle 里氏替换原则**
子类能覆盖父类
父类能出现的地方子类就能出现
**I – Interface Segregation Principle 接口隔离原则**
保持接口的单一独立
类似单一职责原则，这里更关注接口
**D – Dependency Inversion Principle 依赖倒转原则**
面向接口编程，依赖于抽象而不依赖于具体
使用方只关注接口而不关注具体类的实现

分类：
**创建型**：工厂模式，单例模式，原型模式
**结构型**：适配器模式，代理模式
**行为型**：策略模式，迭代器模式，观察者模式，命令模式，状态模式

---
## [websocket的工作原理和机制](https://juejin.cn/post/7020964728386093093)
**定义**：WebSocket 是一种在单个TCP连接上进行全双工通信的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，**允许服务端主动向客户端推送数据**。浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接， 并进行双向数据传输。
**使用场景**：即时聊天通信，多玩家游戏，在线协同编辑/编辑，实时数据流的拉取与推送，实时地图位置
**与HTTP之比较**：
1、WebSocket是双向通信协议，模拟Socket协议，可以双向发送或接受信息，而HTTP是单向的；
2、WebSocket是需要浏览器和服务器握手进行建立连接的，而http是浏览器发起向服务器的连接。
注意：虽然HTTP/2也具备服务器推送功能，但HTTP/2 只能推送静态资源，无法推送指定的信息。


``` javascript
const ws = new WebSocket('ws://localhost:8080');

let sendTimmer = null;
let sendCount = 0;

ws.onopen = function () {
  console.log('@open');

  sendCount++;
  ws.send('Hello Server!' + sendCount);

  sendTimmer = setInterval(function () {
    sendCount++;
    ws.send('Hi Server!' + sendCount);

    if (sendCount === 10) {
      ws.close();
    }
  }, 2000);
};
ws.onmessage = function (e) {
  console.log('@message');
  console.log(e.data);
};
ws.onclose = function () {
  console.log('@close');
  sendTimmer && clearInterval(sendTimmer);
};
ws.onerror = function () {
  console.log('@error');
};
```

服务端实时通信有哪些方法？
1、AJAX轮询
3、WebSocket

***补充知识点**：全双工是通讯传输的一个术语。通信允许数据在两个方向上同时传输，他在能力上相当于两个单工通信方式的结合。全双工指可以同时进行信号的双向传输。
全双工：例如我们使用的手机就是全双工，在同一时刻两个用户可以同时给对方传送数据
半双工：例如我们使用的对讲机，当A方按住通话按钮才可以向B方传送数据，B方也是，在同一时刻只有一个用户能够传送数据（A/用户都可以传递信息，但是不能够同时传递）
单工：例如我们看电视时，我们只能接收对方发送的信息，不能够给对方传递信息；*

---
## [手指点击可以触控的屏幕时，是什么事件？](https://cloud.tencent.com/developer/article/1709860)
![触屏事件](https://ask.qcloudimg.com/http-save/yehe-7813481/8vmv7vde1g.png?imageView2/2/w/1620)


---
## [什么是函数柯里化？以及说一下JS的API有哪些应用到了函数柯里化的实现？(函数柯里化一些了解，以及在函数式编程的应用，最后说了一下JS中bind函数和数组的reduce方法用到了函数柯里化。)](https://zh.javascript.info/currying-partials)
**柯里化**：函数的一种高阶技术, 用于将一个函数从可调用的 f(a, b, c) 转换为可调用的 f(a)(b)(c)。柯里化不会调用函数。它只是对函数进行转换。
``` javascript
function curry(f) { // curry(f) 执行柯里化转换
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// 用法
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```
应用场景：延迟计算（.bind()是一个典型例子）、动态创建函数、参数复用

---
## [JS代码调试](https://www.51cto.com/article/608892.html)
JS是解释型语言，是逐条语句解释执行的，如果错误发生在某个语句块，此语句块以前的语句一般都可以正常执行。这不同于C等编译型语言。
1. console.log()
2. alert()
3. try catch 捕获
``` javascript
try {
    tryCode - 尝试执行代码块
}
catch(err) {
    catchCode - 捕获错误的代码块
}
finally {
    finallyCode - 无论 try / catch 结果如何都会执行的代码块
}

// 实例
try {
    adddlert("欢迎光临！");
}
catch(err) {
    document.getElementById("demo").innerHTML = err.message;
}
// adddlert is not define
```

4. debugger
![debugger用法1](https://img-blog.csdnimg.cn/20210109153946332.png)
![debugger用法2](https://img-blog.csdnimg.cn/20210109154001661.png)
![debugger用法3](https://img-blog.csdnimg.cn/20210109154025381.png)




