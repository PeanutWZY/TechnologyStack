# babel

---
## 是什么？
babel是一种JS编译器，它可以把高阶ES2015+版本的代码转换成浏览器可以解析的代码(向后兼容)。

---
## 为什么要用babel？
现在ECMAScript已经到了ES10了，已经迭代了10个版本；不过现在多数浏览器支持的主流js语言是ES2014语法，有很多对ES2015以及ES2015+的一些语法是不支持的，也就是你用这些语法有部分浏览器是不支持的，就会报错。
但是高阶语法就是很方便啊，我就是想用，怎么办？这个时候为什么要用babel就很明显了，就是用它来把ES2015+的语法编译成浏览器能识别的通用语言，举个最简单的例子：
// babel编译前，ES2015箭头函数
(n) => { return n + 1 }
// babel编译后，ES2014函数
function (n) { return n + 1 }

---
## babel如何工作的？
看了一些关于babel的博客，我觉得babel就是一个插件集合，里面有一个个的插件。
babel将代码解析成AST(抽象语法树)，然后用一个个对应的插件修改AST，将修改好的AST输出。

---
## babel的一些其他的特性
babel默认是只会去转义js语法的，不会去转换新的API，比如像Promise、Generator、Symbol这种全局API对象，babel是不会去编译的；
这个时候就需要使用babel的babel-polyfill或者babel-runtime库 和 babel-plugins-transform-runtime插件结合使用按需添加polyfill。
列下我自己学习babel的目录脑图，我将开启我的babel学习之旅。
![思维导图](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4a3881af6ad40ed871ea36eb2a9ca4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

---
[配置方法](https://juejin.cn/post/7031848448831946760)