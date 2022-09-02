# [ES6](https://www.runoob.com/w3cnote/es6-tutorial.html)
1. let、const
2. 解构赋值
3. Symbol
4. Map、Set
5. Reflect、Proxy
6. 字符串
7. 数值
8. 函数 -> 默认参数、箭头函数
9. Class类
10. export、import
11. Promise、Generator、async


---
## 特性 1 ： let 和 const
1. **变量声明 let**: 块级作用域，无声明提升，不可重复声明
2. **常量声明 const**: 块级作用域，不可改变，不可重复声明

---
## 特性 2 ：解构赋值
定义：对数组或对象进行拆包
解构的源，解构赋值表达式的右边部分。
解构的目标，解构赋值表达式的左边部分。

1. 数组解构
``` javascript
// 基本
let [a, b, c] = [1, 2, 3]; // a = 1, b = 2, c= 3
// 可嵌套
let [a, [[b], c]] = [1, [[2], 3]]; // a = 1, b = 2, c= 3
// 可忽略
let [a, , b] = [1, 2, 3]; // a = 1; b = 3
// 不完全解构
let [a = 1, b] = []; // a = 1, b = undefined
// 剩余运算符
let [a, ...b] = [1, 2, 3]; //a = 1, b = [2, 3]
// 字符串
let [a, b, c, d, e] = 'hello'; // a = 'h', b = 'e', c = 'l', d = 'l', e = 'o'
// 解构默认值
let [a = 2] = [undefined]; // a = 2
// 当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。
let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```
2. 对象解构
``` javascript
// 基本
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb'
let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'

// 可嵌套，可忽略
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
// x = 'hello'
// y = 'world'
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj;
// x = 'hello'

// 不完全解构
let obj = {p: [{y: 'world'}] };
let {p: [{ y }, x ] } = obj;
// x = undefined
// y = 'world'

// 剩余运算符
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}

// 解构默认值
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```

## 特性 3 ： Symbol
定义：表示独一无二的值，最大的用法是用来定义对象的唯一属性名。
1. 基本用法：
``` javascript
let sy = Symbol("KK");
console.log(sy);   // Symbol(KK)
typeof(sy);        // "symbol"
 
// 相同参数 Symbol() 返回的值不相等
let sy1 = Symbol("kk"); 
sy === sy1;       // false
```
2. 作为对象属性：
``` javascript
let sy = Symbol("key1");
 
// 写法1
let syObject = {};
syObject[sy] = "kk";
console.log(syObject);    // {Symbol(key1): "kk"}
 
// 写法2
let syObject = {
  [sy]: "kk"
};
console.log(syObject);    // {Symbol(key1): "kk"}
 
// 写法3
let syObject = {};
Object.defineProperty(syObject, sy, {value: "kk"});
console.log(syObject);   // {Symbol(key1): "kk"}
```
Symbol 作为对象属性名时不能用.运算符，要用方括号。因为.运算符后面是字符串，所以取到的是字符串 sy 属性，而不是 Symbol 值 sy 属性。
``` javascript
let syObject = {};
syObject[sy] = "kk";
console.log(syObject);
 
for (let i in syObject) {
  console.log(i);
}    // 无输出
 
Object.keys(syObject);                     // []
Object.getOwnPropertySymbols(syObject);    // [Symbol(key1)]
Reflect.ownKeys(syObject);                 // [Symbol(key1)]
```
3. 定义常量
``` javascript
const COLOR_RED = Symbol("red");
const COLOR_YELLOW = Symbol("yellow");
const COLOR_BLUE = Symbol("blue");
```
4. Symbol.for()
Symbol.for() 类似单例模式，首先会在全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索。
``` javascript
let yellow = Symbol("Yellow");
let yellow1 = Symbol.for("Yellow");
yellow === yellow1;      // false
 
let yellow2 = Symbol.for("Yellow");
yellow1 === yellow2;     // true
```
5. Symbol.keyFor()
Symbol.keyFor() 返回一个已登记的 Symbol 类型值的 key ，用来检测该字符串参数作为名称的 Symbol 值是否已被登记。

---
## 特性 4 ：Map 和 Set
### Map
Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

#### Map 和 Object 的区别
- 一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。
- Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
- Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
- Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。


### Set
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

#### Set 中的特殊值
Set 对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待：
- +0 与 -0 在存储判断唯一性的时候是恒等的，所以不重复；
- undefined 与 undefined 是恒等的，所以不重复；
- NaN 与 NaN 是不恒等的，但是在 Set 中只能存一个，不重复。

Set 对象作用
``` javascript
// 数组去重
var mySet = new Set([1, 2, 3, 4, 4]);
[...mySet]; // [1, 2, 3, 4]

// 并集、交集、差集
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);

// 并集
var union = new Set([...a, ...b]); // {1, 2, 3, 4}
// 交集
var intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}
// 差集
var difference = new Set([...a].filter(x => !b.has(x))); // {1}
```
---
## 特性 5 ：Proxy 与 Reflect
`Proxy` 与 `Reflect` 是 ES6 为了操作对象引入的 API 。
`Proxy` 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。
`Reflect` 可以用于获取目标对象的行为，它与 Object 类似，但是更易读，为操作对象提供了一种更优雅的方式。它的方法与 Proxy 是对应的。

### Proxy
一个 Proxy 对象由两个部分组成： target 、 handler 。在通过 Proxy 构造函数生成实例对象时，需要提供这两个参数。 target 即目标对象， handler 是一个对象，声明了代理 target 的指定行为。
``` javascript
let target = {
    name: 'Tom',
    age: 24
}
let handler = {
    get: function(target, key) {
        console.log('getting '+key);
        return target[key]; // 不是target.key
    },
    set: function(target, key, value) {
        console.log('setting '+key);
        target[key] = value;
    }
}
let proxy = new Proxy(target, handler)
proxy.name     // 实际执行 handler.get
proxy.age = 25 // 实际执行 handler.set
// getting name
// setting age
// 25
 
// target 可以为空对象
let targetEpt = {}
let proxyEpt = new Proxy(targetEpt, handler)
// 调用 get 方法，此时目标对象为空，没有 name 属性
proxyEpt.name // getting name
// 调用 set 方法，向目标对象中添加了 name 属性
proxyEpt.name = 'Tom'
// setting "Tom"
// 再次调用 get ，此时已经存在 name 属性
proxyEpt.name
// getting "Tom"
 
// 通过构造函数新建实例时其实是对目标对象进行了浅拷贝，因此目标对象与代理对象会互相影响
console.log(targetEpt) // {name: "Tom"}
 
// handler 对象也可以为空，相当于不设置拦截操作，直接访问目标对象
let targetEmpty = {}
let proxyEmpty = new Proxy(targetEmpty,{})
proxyEmpty.name = "Tom"
console.log(targetEmpty) // {name: "Tom"}
```
实例方法：
`get(target, propKey, receiver)`：用于 target 对象上 propKey 的读取操作。
target：目标对象
propKey：属性名
receiver：处理函数
`set(target, propKey, value, receiver)`：set(target, propKey, value, receiver)
value：赋值value

### Reflect
ES6 中将 Object 的一些明显属于语言内部的方法移植到了 Reflect 对象上（当前某些方法会同时存在于 Object 和 Reflect 对象上），未来的新方法会只部署在 Reflect 对象上。

Reflect 对象对某些方法的返回结果进行了修改，使其更合理。
Reflect 对象使用函数的方式实现了 Object 的命令式操作。

---
## 特性 6 ：字符串的新API
1. 字串识别方法：
includes('s')：返回布尔值，判断是否找到参数字符串。
startsWith('s')：返回布尔值，判断参数字符串是否在原字符串的头部。
endsWith('s')：返回布尔值，判断参数字符串是否在原字符串的尾部。

2. 字符串重复
repeat(n)：返回新的字符串，表示将字符串重复n次数返回。

3. 字符串补全
padStart(n, 's')：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
padEnd(n, 's')：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。
无第二个参数输入则默认填充' '

4. 模板字符串
反引号：` `` `

5. 标签模板
标签模板，是一个函数的调用，其中调用的参数是模板字符串。
``` javascript
alert`Hello world!`;
// 等价于
alert('Hello world!');
```

---
## 特性 7 ：对象
1. 对象字面量
`const person = {arg: arg, name: name}`
2. Object.assign(target, source_1, ...)  (浅拷贝)
用于将源对象的所有可枚举属性复制到目标对象中。
``` javascript
let target = {a: 1};
let object2 = {b: 2};
let object3 = {c: 3};
Object.assign(target,object2,object3);  
// 第一个参数是目标对象，后面的参数是源对象
target;  // {a: 1, b: 2, c: 3
```
3. Object.is(value1, value2)
用来比较两个值是否严格相等，与（===）基本类似。

---
## 特性 8 ：数组
1. 数组创建
Array.of(1, 2, 3, 's', true)
转换可迭代对象
``` javascript
Array.from([1, 2, 3, , 's', true])

// map
let map = new Map();
map.set('key0', 'value0');
map.set('key1', 'value1');
console.log(Array.from(map)); // [['key0', 'value0'],['key1', 'value1']]

// set
let arr = [1, 2, 3];
let set = new Set(arr);
console.log(Array.from(set)); // [1, 2, 3]

// 字符串
let str = 'abc';
console.log(Array.from(str)); // ["a", "b", "c"]
```
2. 新的API
- find() 查找数组中符合条件的元素,若有多个符合条件的元素，则返回第一个元素。
``` javascript
let arr = Array.of(1, 2, 3, 4);
console.log(arr.find(item => item > 2)); // 3
 
// 数组空位处理为 undefined
console.log([, 1].find(n => true)); // undefined
```
- findIndex() 查找数组中符合条件的元素索引，若有多个符合条件的元素，则返回第一个元素索引。
``` javascript
let arr = Array.of(1, 2, 1, 3);
// 参数1：回调函数
// 参数2(可选)：指定回调函数中的 this 值
console.log(arr.findIndex(item => item == 2)); // 1
 
// 数组空位处理为 undefined
console.log([, 1].findIndex(n => true)); //0
```
- fill() 将一定范围索引的数组元素内容填充为单个指定的值。
``` javascript
let arr = Array.of(1, 2, 3, 4);
// 参数1：用来填充的值
// 参数2：被填充的起始索引
// 参数3(可选)：被填充的结束索引，默认为数组末尾
console.log(arr.fill(0,1,2)); // [1, 0, 3, 4]
```
- copyWithin() 将一定范围索引的数组元素修改为此数组另一指定范围索引的元素。.
``` javascript
// 参数1：被修改的起始索引
// 参数2：被用来覆盖的数据的起始索引
// 参数3(可选)：被用来覆盖的数据的结束索引，默认为数组末尾
console.log([1, 2, 3, 4].copyWithin(0,2,4)); // [3, 4, 3, 4]
 
// 参数1为负数表示倒数
console.log([1, 2, 3, 4].copyWithin(-2, 0)); // [1, 2, 1, 2]
console.log([1, 2, ,4].copyWithin(0, 2, 4)); // [, 4, , 4]
```
- includes() 数组是否包含指定值。
``` javascript
// 参数1：包含的指定值
[1, 2, 3].includes(1);    // true
 
// 参数2：可选，搜索的起始索引，默认为0
[1, 2, 3].includes(1, 2); // false
 
// NaN 的包含判断
[1, NaN, 3].includes(NaN); // true
```

---
## 特性 7 ：函数
1. 默认参数
``` javascript
function fn(name,age=17){
 console.log(name+","+age);
}
fn("Amy",18);  // Amy,18
fn("Amy","");  // Amy,
fn("Amy");     // Amy,17
```
2. 不定参数
``` javascript
function f(...values){
    console.log(values.length);
}
f(1,2);      //2
f(1,2,3,4);  //4
```
3. 箭头函数
参数 => 函数体
箭头函数没有 this、super、arguments 和 new.target 绑定。

---
## 特性 8 ：Class 类
在ES6中，class (类)作为对象的模板被引入，可以通过 class 关键字定义类。
class 的本质是 function。
它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

``` javascript
// getter 与 setter 必须同级出现
class Father {
    constructor(){}
    get a() {
        return this._a;
    }
}
class Child extends Father {
    constructor(){
        super();
    }
    set a(a) {
        this._a = a;
    }
}
let test = new Child();
test.a = 2;
console.log(test.a); // undefined
 
class Father1 {
    constructor(){}
    // 或者都放在子类中
    get a() {
        return this._a;
    }
    set a(a) {
        this._a = a;
    }
}
class Child1 extends Father1 {
    constructor(){
        super();
    }
}
let test1 = new Child1();
test1.a = 2;
console.log(test1.a); // 2
```

---
## 特性 9 ：export 与 @import
**特点**：
ES6 的模块自动开启严格模式，不管你有没有在模块头部加上 use strict;。
模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等。
每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。
每一个模块只加载一次（是单例的）， 若再去加载同目录下同文件，直接从内存中读取。

**as**：
export 命令导出的接口名称，须和模块内部的变量有一一对应关系。
导入的变量名，须和导出的接口名称相同，即顺序可以不一致。

**import** 命令的特点
**只读属性**：不允许在加载模块的脚本里面，改写接口的引用指向，即可以改写 import 变量类型为对象的属性值，不能改写 import 变量类型为基本类型的值。
**单例模式**：多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。import 同一模块，声明不同接口引用，会声明对应变量，但只执行一次 import 。

**export default** 命令
在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
export default 中的 default 是对应的导出接口变量。
通过 export 方式导出，在导入时要加{ }，export default 则不需要。
export default 向外暴露的成员，可以使用任意变量来接收。

---
## 特性 10 ：Promise 对象
## 特性 11 ：Generator 函数
## 特性 12 ：async函数