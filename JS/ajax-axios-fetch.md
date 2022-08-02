# ajax axios fetch

*前端请求基于ajax的时代已逐渐成为将要成为历史了，es6的fetch和node的axios将会逐渐代替它，本篇博文将就这三者的区别做以比较方便对后两者的理解和使用。*

---
## ajax

传统 Ajax 指的是 XMLHttpRequest（XHR）， 最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现回调地狱。
ajax最经典的实现莫非jQuery ajax了。
JQuery ajax 是对原生XHR的封装，除此以外还增添了对JSONP的支持。缺点如下：
1.本身是针对MVC的编程,不符合现在前端MVVM的浪潮
2.基于原生的XHR开发，XHR本身的架构不清晰。
3.JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务）
4.不符合关注分离（Separation of Concerns）的原则
5.配置和调用方式非常混乱，而且基于事件的异步模型不友好

1. 原始方法
``` javascript
<scripttype="text/JavaScript">  
function load(){
   var xmlhttp;
   if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera,Safari
      xmlhttp= newXMLHttpRequest();
   }else{// code for IE6, IE5
      xmlhttp= newActiveXObject("Microsoft.XMLHTTP");
   } 
   xmlhttp.onreadystatechange= function(){
      if (xmlhttp.readyState ==4 && xmlhttp.status == 200) {//获得了请求数据
 var expertinfolist = xmlhttp.responseText;
   //发送请求数据到myDiv     document.getElementById("myDiv").innerHTML=expertinfolist;              
      }
   }
   var url="expert_ZFTservlet?expert_name="+"曾攀";
   xmlhttp.open("GET", url,true);
   xmlhttp.send();
}
</script>
```

``` javascript
$.ajax({
   type: 'POST',
   url: url,
   data: data,
   dataType: dataType,
   success: function () {},
   error: function () {}
});
```
---
## axios

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
浏览器中使用依然是XMLHttpRequest对象。

axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});
1
2
3
4
5
6
7
8
9
10
11
12
13
14
axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范，它本身具有以下特征：

从浏览器中创建 XMLHttpRequest
支持 Promise API
客户端支持防止CSRF
提供了一些并发请求的接口（重要，方便了很多的操作）
从 node.js 创建 http 请求
拦截请求和响应
转换请求和响应数据
取消请求
自动转换JSON数据
注意:防止CSRF:就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

fetch
fetch是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。

try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
1
2
3
4
5
6
7
主要优势就是：

语法简洁，更加语义化
基于标准 Promise 实现，支持 async/await
同构方便，使用
更加底层，提供的API丰富（request, response）
脱离了XHR，是ES规范里新的实现方式
fetch的不足之处：

fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: ‘include’})
fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
fetch没有办法原生监测请求的进度，而XHR可以
另外还有跨域方案不成熟等。

Jquery老迈笨拙，fetch年轻稚嫩，只有Axios正当其年！