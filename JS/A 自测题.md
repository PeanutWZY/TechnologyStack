
---
1. undefined 和 null 有什么区别？
两者都属于JS基本类型。值为null的变量是有被赋值的，其值为“空值”；而undefined如字面意思一样是未被定义的值的意思。这几种情况都能够出现undefined：
   1. 变量被定义了，但是没有赋值
   2. 对象的属性没有赋值，该属性为undefined
   3. 函数没有传入应传入的参数，改参数值为undefined
   4. 函数没有返回值时，默认为undefined

---
2. && 运算符能做什么
&& 是js中的逻辑与运算符，只有逻辑符前的表达式为真才会进行逻辑符后的表达式运算。因此它具有短路作用，可以避免不必要的运算，可以替代if写法。

---
3. || 运算符能做什么
|| 是js中的逻辑或运算符，一旦逻辑符前的表达式运算为真，则不进行后续表达式的运算。同样是为短路作用。

---
4. 使用 + 或一元加运算符是将字符串转换为数字的最快方法吗？
根据MDN文档，+ 方法是字符转数字最快的方法，因为如果值已经是数字了，则不会进行任何操作
[+ '143'](https://cloud.tencent.com/developer/article/1452689)

---
5. DOM 是什么？
DOM是Document Object Model，即文本对象模型，是HTML和XML文档的API。当浏览器第一次解析HTML文档时，会创建一个基于该HTML文档的一个超大对象，这个树状结构模型即为DOM，可以用于交互和修改DOM中特定的节点或元素。

---
6. 什么是事件传播?
   1. 捕获阶段–事件从 window 开始，然后向下到每个元素，直到到达目标元素。
   2. 目标阶段–事件已达到目标元素。
   3. 冒泡阶段–事件从目标元素冒泡，然后上升到每个元素，直到到达 window。

---
7. 什么是事件冒泡？
当事件发生在DOM元素上时，该事件并不完全发生在那个元素上。在冒泡阶段，事件冒泡，或者事件发生在它的父代，祖父母，祖父母的父代，直到到达window为止。

---
8.  什么是事件捕获？
当事件发生在 DOM 元素上时，该事件并不完全发生在那个元素上。在捕获阶段，事件从window开始，一直到触发事件的元素。

---
9.  event.preventDefault() 和 event.stopPropagation()方法之间有什么区别？
event.preventDefault() 方法可防止元素的默认行为。如果在表单元素中使用，它将阻止其提交。如果在锚元素中使用，它将阻止其导航。如果在上下文菜单中使用，它将阻止其显示或显示。
event.stopPropagation()方法用于阻止捕获和冒泡阶段中当前事件的进一步传播。

---
10. 如何知道是否在元素中使用了event.preventDefault()方法？
我们可以在事件对象中使用event.defaultPrevented属性。它返回一个布尔值用来表明是否在特定元素中调用了event.preventDefault()。

---
11.  什么是event.target？
简单来说，event.target是发生事件的元素或触发事件的元素。

---
13. 什么是event.currentTarget？
event.currentTarget是我们在其上显式附加事件处理程序的元素。

---
14. == 和 === 有什么区别？
两者最大的区别在于是否检查数据等式两边数据类型。== 只要两边的运算数相等则为true，=== 则需要在两边无需进行数据类型转换的情况下相等才返回true，尽量采用=== 保证数据完全相等。

---
15. 为什么在 JS 中比较两个相似的对象时返回 false？
对于基本类型，JS比较的是两个数的值，而对于应用类型的数据，JS比较的是两个数据的引用或存储变量内存中的地址，如果不是相同地址则为false

---
16. !! 运算符能做什么？
!!Nan = false, !!可以将运算符右侧的数强制转换成布尔数

---
18. 如何在一行中计算多个表达式的值？
可以使用逗号运算符在一行中计算多个表达式。它从左到右求值，并返回右边最后一个项目或最后一个操作数的值。
``` JavaScript
let x = 5;

x = (x++ , x = addFive(x), x *= 2, x -= 5, x += 10);

function addFive(num) {
  return num + 5;
}
```
---
19. 什么是提升？
提升是用来描述变量和函数移动到其(全局或函数)作用域顶部的术语。

为了理解提升，需要来了解一下执行上下文。执行上下文是当前正在执行的“代码环境”。执行上下文有两个阶段:编译和执行。

编译-在此阶段，JS 引荐获取所有函数声明并将其提升到其作用域的顶部，以便我们稍后可以引用它们并获取所有变量声明（使用var关键字进行声明），还会为它们提供默认值：undefined。

执行——在这个阶段中，它将值赋给之前提升的变量，并执行或调用函数(对象中的方法)。

注意:只有使用var声明的变量，或者函数声明才会被提升，相反，函数表达式或箭头函数，let和const声明的变量，这些都不会被提升。

---
20. 什么是作用域？
JavaScript 中的作用域是我们可以有效访问变量或函数的区域。JS 有三种类型的作用域：全局作用域、函数作用域和块作用域(ES6)。

---
21. 什么是闭包？
一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

---
22. JavaScript中的虚值是什么？
Null，false，undefined，Nan，0，''，即转换布尔值为false的值

---
23. 如何检查值是否虚值？
Boolean() 或者 !!

---
25. 'use strict' 是干嘛用的？
ES5的新特性，让代码在函数或者全局脚本启用严格模式，在早期避免Bug，为其添加限制。
具体限制表现为：
    - 变量必须先声明后使用
    - 函数的参数不允许同名
    - 不能使用with语句
    - 不能对只读属性赋值
    - 不能删除不可删除的对象
    - 不能使用前缀0表示八进制数
    - 增加了保留字（protected， static， interface）
严格模式的主要作用是：
规范js语法，减少一些怪异行为
消除代码运行的一些不安全之处
提高编译器效率，增加运行速度

---
26.  JavaScript中 this 值是什么？
这取决于this所在位置。一般来说分为五种情况：
     - 当this出现于对象方法中时，this指向该方法的所有者，也就是对象本身
     - 当this出现于单独情况时，指向全局对象[Object Window]
     - 当this出现于函数内时，指向全局对象
     - 而在函数中的严格模式下是不允许this默认绑定的，所以this指向undefined
     - 在事件中时，this指向的是接收事件的元素

---
27.  对象的 prototype 是什么？
prototype 属性：定义了会被原型链下游继承的属性和方法

原因在于，继承的属性和方法是定义在 prototype 属性之上的（你可以称之为子命名空间 (sub namespace) ）——那些以 Object.prototype. 开头的属性，而非仅仅以 Object. 开头的属性。prototype 属性的值是一个对象，我们希望被原型链下游的对象继承的属性和方法，都被储存在其中。

---
28.  什么是IIFE，它的用途是什么？
IIFE：Immediately-invoked function expression 立即执行函数表达式
标准写法是： (function(){}())
其特点是：声明一个匿名函数，并立即执行它；当函数为IIFE时，表达式中的变量将不能从外部直接访问。
作用：避免变量污染（命名冲突），隔离作用域，模拟块级作用域，改变代码执行的循序。
[IIFE](https://yuguang.blog.csdn.net/article/details/106824296)

---
1.  Function.prototype.toString的用途是什么？
    返回一个表示当前函数源代码的字符串。

---
33.  什么是函数式编程? JavaScript的哪些特性使其成为函数式语言的候选语言？
函数式编程（FP）是通过编写纯函数，避免共享状态，可变数据，副作用来构建软件的过程。JS支持闭包和高阶函数时函数式编程的特点。

---
34. 什么是高阶函数？
高阶函数就是一个可以传入另一个函数作为参数的函数。或则返回是函数。
常用的高阶函数：
    - map 遍历元素/运算/元素类型转换
    - reduce计算+-*/
    - filter筛选元素返回Boolean
    - sort排序元素 返回原数组
[高阶函数](https://blog.csdn.net/qq_25753979/article/details/90294872)

---
35.  为什么函数被称为一等公民？
因为函数既可以作为函数的参数，也可以作为函数的返回值，还可以赋值给变量。这也是函数式编程的基础。让函数作为编程的基本单元。

---
36. 手动实现`Array.prototype.map`方法
map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。 
``` JavaScript
function map(arr, mapCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') { 
    return [];
  } else {
    let result = [];
    // 每次调用此函数时，我们都会创建一个 result 数组
    // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr)); 
      // 将 mapCallback 返回的结果 push 到 result 数组中
    }
    return result;
  }
}
```

---
37. 手动实现`Array.prototype.filter`方法
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
``` JavaScript
function filter(arr, filterCallback) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== 'function') 
  {
    return [];
  } else {
    let result = [];
     // 每次调用此函数时，我们都会创建一个 result 数组
     // 因为我们不想改变原始数组。
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查 filterCallback 的返回值是否是真值
      if (filterCallback(arr[i], i, arr)) { 
      // 如果条件为真，则将数组元素 push 到 result 中
        result.push(arr[i]);
      }
    }
    return result; // return the result array
  }
}
```


---
38.   手动实现`Array.prototype.reduce`方法
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
``` JavaScript
function reduce(arr, reduceCallback, initialValue) {
  // 首先，检查传递的参数是否正确。
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== 'function') 
  {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为initialValue
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];

    // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr); 
    }
    return value;
  }
}
```

---
39.  arguments 的对象是什么？
arguments对象是函数中传递的参数值的集合。它是一个类似数组的对象，因为它有一个length属性，我们可以使用数组索引表示法arguments[1]来访问单个值，但它没有数组中的内置方法，如：forEach、reduce、filter和map。
可以使用Array.prototype.slice将arguments对象转换成一个数组。

---
40. 如何创建一个没有 prototype(原型) 的对象？
我们可以使用Object.create方法创建没有原型的对象。
const o2 = Object.create(null);

---
1.  ECMAScript是什么？
ECMAScript是JavaScript的一种语言规范
ES5的特性：
    - 严格模式 use strict
    - JSON对象：JSON.parse() 将JSON数据转换为JavaScript对象；JSON.stringfy()将对象、数组转换成字符串
    - Object扩展：
        ● Object.create(prototype, [descriptors])
        作用: 以指定对象为原型创建新的对象
        为新的对象指定新的属性, 并对属性进行描述
        value : 指定值
        writable : 标识当前属性值是否是可修改的, 默认为false
        configurable: 标识当前属性是否可以被删除 默认为false
        enumerable： 标识当前属性是否能用for in 枚举 默认为false
        ● Object.defineProperties(object, descriptors)
        作用: 为指定对象定义扩展多个属性
        get ：用来获取当前属性值得回调函数
        set ：修改当前属性值得触发的回调函数，并且实参即为修改后的值
    - Array扩展：
        ● Array.prototype.indexOf(value) : 得到值在数组中的第一个下标
        ● Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标
        ● Array.prototype.forEach(function(item, index){}) : 遍历数组
        ● Array.prototype.map(function(item, index){}) : 遍历数组返回一个新的数组，返回加工之后的值
        ● Array.prototype.filter(function(item, index){}) : 遍历过滤出一个新的子数组， 返回条件为true的值
    - Function扩展
        ● Function.prototype.bind(obj) 作用: 将函数内的this绑定为obj, 并将函数返回

---
43.  ES6或ECMAScript 2015有哪些新特性？
[ES6](https://blog.csdn.net/u012468376/article/details/54565068)

---
44.  `var`,`let`和`const`的区别是什么
var和let用于声明变量，const用于声明常量
var有声明提升，无块级作用域，可以重复声明同名变量，
let，const有块级作用域

---
45. 什么是箭头函数？
箭头函数是一种更加简洁的函数表达式。箭头函数没有自己的this，super，arguments或者new.target。箭头函数的this等同于其父域的this指向。箭头函数时候用于那些需要匿名函数的地方，他不能用作构造函数。只有一行表达式的情况下，可以不用写return即可隐式的返回结果。

---
46. 什么是类？
类是用于创建对象的模板。
使用 class 关键字来创建一个类，类体在一对大括号 {} 中，我们可以在大括号 {} 中定义类成员的位置，如方法或构造函数。每个类中包含了一个特殊的方法 constructor()，它是类的构造函数，这种方法用于创建和初始化一个由 class 创建的对象。

创建一个类的语法格式如下：
``` JavaScript
class Runoob {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}
```

---
47.  什么是模板字符串？
是ES6引入了的一种字符串字面量语法，提供了字符串插值功能 反撇号，可以包裹多行字符，而不使用/n换行符。（`${name}`）可以用作模板占位符

---
48. 什么是对象解构？
也是一种JS表达式，通过把对象（也可以是数组）中的属性取出，也可以说是拆包，赋值给一系列其他变量的操作叫做解构赋值。这是一种比较方便的赋值方式。需要结构的就装在 { } 里
let { a, b } = { name: '王三', age: 16 }

---
49. 什么是 ES6 模块？
ES6引入了导入import和导出export两个模块来输入输出变量。import会声明到整个模块头部，首先执行；而且该导入操作只会执行一次；同时import导入的变量具有只读属性。export { A, B, C } => import { A, B } from 'xxx'; export中只可以export default 一个变量，暴露给外部可以 export default funcA => import funcA from 'xxx'。

---
50. 什么是`Set`对象，它是如何工作的？
Set是一种ES6新引入的数据类型，它类似数组，是一个包含无重复元素的有序列表。而数组可以包含重复元素。他用add，has，delete，clear

---
51. 什么是回调函数？
回调函数就是一个函数作为参数被用另一个函数调用，callback

---
52. Promise 是什么？
Promise是异步编程的一种解决方案，解决了回调地狱问题（回调内部有一个异步操作）。Promise是一个对象，可以获取到异步操作的信息，可以参入resolve和reject分别处理成功和失败。它本身有三种状态pending（等待），fulfiled（成功），rejected（失败）来代表异步操作的进行状态。这个状态从pending到fulfiled或者rejected是单向不可逆的。当进入fulfiled会调用.then方法，失败则调用.catch方法。

---
53. 什么是 `async/await` 及其如何工作？
async/await是一种基于Promise的异步编程和非阻塞代码的方法。async会隐式的返回一个Promise，await只有在async function中使用，await关键字在执行下一行代码之前会一直等待右侧的表达式结果。

---
54. 展开运算符（spread）和剩余运算符（rest）有什么区别？
两种其实都用...的写法来实现，展开运算符是将数组转为按逗号分隔的有序数列。剩余运算符则更用于解构数组和对象
``` JavaScript
// 展开运算
function add(a, b) {
  return a + b;
};
const nums = [5, 6];
const sum = add(...nums);

// 剩余运算
const [first, ...others] = [1, 2, 3, 4, 5];
```
---
55. 什么是默认参数？
ES6的一种新特性，可以在函数定义给参数赋值一个初始值。

---
56. 什么是包装对象（wrapper object）？
JS的基本类型：String、Number、BigInt（大于2^53 - 1的整数）、Boolean、Null、undefined、Symbol
引用类型：Array、Object、Date、RegExp
除了null和undefined，其他基本类型在操作时都能够被临时或者强制转换成对象，让其行为类似于对象。这就叫做包装对象。在起访问完属性或者调用完方法后，新创建的对象会被立即丢弃。

---
57. 隐式和显式转换有什么区别？
隐式转换是JS在自动完成数据间的类型转换的过程，比如说String和number相加得到另一个number这个过程就发生了隐式转换，而显示转换就是parseInt('6')号这种，手动命令将字符串转换为数字这种

---
58. 什么是NaN？以及如何检查值是否为 NaN？
JS不能计算出的非数字运算结果，比如说parseInt('abc')就会得到Nan。js内置有isNan检测是否为Nan

---
59. 如何判断值是否为数组？
1. Array.isArray(arr)
2. 原型Object.prototype.toString.call(value) === "[object Array]"
3. A instanceof Array

---
60.  如何在不使用`%`模运算符的情况下检查一个数字是否是偶数？

---
61. 如何检查对象中是否存在某个属性？
- "prop" in obj
- o.hasOwnProperty("prop")
- o["prop"] 不为undefined则存在

---
62. AJAX 是什么？
即异步的 JavaScript 和 XML，是一种用于创建快速动态网页的技术，传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。使用AJAX则不需要加载更新整个网页，实现部分内容更新
Astnchronous Javascript + XML = 异步传输 + js + xml
![AJAX工作原理](https://www.runoob.com/wp-content/uploads/2013/09/ajax-yl.png)

---
1.   Object.seal 和 Object.freeze 方法之间有什么区别？
Object.freeze 是直接冻结对象，对象及其原型完全完全不能修改，属性不可写。
Object.seal 是密封对象，如果属性可写，那么还是可以修改其属性值。

---
1.  对象中的 in 运算符和 hasOwnProperty 方法有什么区别？
in会查找对象本身与其原型链上是否有其指定属性，而hasOwnProperty指挥查询对象本身属性，而不去查找它的原型链

---
66. 有哪些方法可以处理javascript中的异步代码？
回调， Promise， asycn/await

---
68. 函数表达式和函数声明之间有什么区别？
声明式会被提升到作用域顶部

---
69. 调用函数，可以使用哪些方法？
作为函数调用，作为方法调用，作为构造函数调用new

---
70. 什么是缓存及它有什么作用？
缓存时建立一个函数的过程，让这个函数能够暂存之前计算的结果或值。缓存的好处在于可以避免重复计算，节省了计算开销和计算时间，不利之处在于会占用更多存储空间保存缓存结果。

---
71. 手动实现缓存方法
``` JavaScript
const slice = Array.prototype.slice;
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const params = slice.call(args);
    console.log(params);
    if (cache[params]) {
      console.log('cached');
      return cache[params];
    } else {
      let result = fn(...args);
      cache[params] = result;
      console.log(`not cached`);
      return result;
    }
  }
}
const makeFullName = (fName, lName) => `${fName} ${lName}`;
const reduceAdd = (numbers, startingValue = 0) => numbers.reduce((total, cur) => total + cur, startingValue);

const memoizedMakeFullName = memoize(makeFullName);
const memoizedReduceAdd = memoize(reduceAdd);

memoizedMakeFullName("Marko", "Polo");
memoizedMakeFullName("Marko", "Polo");

memoizedReduceAdd([1, 2, 3, 4, 5], 5);
memoizedReduceAdd([1, 2, 3, 4, 5], 5);0
```
---
72. 为什么typeof null返回 object？如何检查一个值是否为 null？
因为这就是null的实现，检测null可以使用严格等于===

---
73. new 关键字有什么作用？
new和构造函数一起使用用于创建对象
new的过程中：
- 创建空对象{}
- 将this指向该对象
- 将空对象的proto指向构造函数的prototype
- 如果没有使用显示return，则返回this
根据上面描述的，new Person()做了：
创建一个空对象：var obj = {}
将空对象分配给 this 值：this = obj
将空对象的_proto_指向构造函数的prototype: this._proto_ = Person().prototype
返回this:return this

---
74.  什么时候不使用箭头函数? 说出三个或更多的例子？
- 需要函数被提升
- 需要在函数中使用this/arguments时，因为箭头函数本身不包含this/arguments，他们取决于外部上下文
- 命名函数
- 作为构造函数
- 当想在对象字面是以将函数作为属性添加并在其中使用对象时，因为咱们无法访问 this 即对象本身

---
75. Object.freeze() 和 const 的区别是什么？
const声明一个只读变量，但是如果他是一个对象，其属性值可以修改
Object.freeze()怎是冻结一个对象，让其对象所有属性不可操作

---
76.  `Iterator`是什么，有什么作用？
Iterator 是js中的遍历器，任何数据结构只要部署了Iterator接口，就可以完成遍历操作（一次处理该数据结构的所有成员）

**作用**有三个：
- 为各种数据结构，提供一个统一的、简便的访问接口；
- 使得数据结构的成员能够按某种次序排列；
- ES6 创造了一种新的遍历命令for…of循环，Iterator 接口主要供for…of消费。

**遍历过程**：
创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
不断调用指针对象的next方法，直到它指向数据结构的结束位置。
``` JavaScript
//obj就是可遍历的，因为它遵循了Iterator标准，且包含[Symbol.iterator]方法，方法函数也符合标准的Iterator接口规范。
//obj.[Symbol.iterator]() 就是Iterator遍历器
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
```
1.  `Generator` 函数是什么，有什么作用？
[Generator](https://www.runoob.com/w3cnote/es6-generator.html)

[答案](https://cloud.tencent.com/developer/article/1621572)