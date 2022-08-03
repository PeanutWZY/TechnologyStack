# ajax axios fetch
*前端请求基于ajax的时代已逐渐成为将要成为历史了，es6的fetch和node的axios将会逐渐代替它，本篇博文将就这三者的区别做以比较方便对后两者的理解和使用。*

---
## ajax

传统 Ajax 指的是 XMLHttpRequest（XHR）， 最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现回调地狱。

1. 什么是ajax
　　Ajax是对原生XHR的封装，为了达到跨域的目的，增添了对JSONP的支持。
　　异步的javascript和xml，ajax不是一门新技术，而是多种技术的组合，用于快速的创建动态页面，能够实现无刷新更新数据从而提高用户体验。

2. ajax的原理？
　　由客户端请求ajax引擎，再由ajax引擎请求服务器，服务器作出一系列响应之后返回给ajax引擎，由ajax引擎决定将这个结果写入到客户端的什么位置。实现页面无刷新更新数据。

3. 核心对象？
　　XMLHttpReques

4. ajax优缺点？
   - 优点　
   1、无刷新更新数据
   2、异步与服务器通信
   3、前端和后端负载平衡
   4、基于标准被广泛支持
   5、界面与应用分离

   - 缺点：
   1、ajax不能使用Back和history功能，即对浏览器机制的破坏。
   2、安全问题 ajax暴露了与服务器交互的细节
   3、对收索引擎的支持比较弱
   4、破坏程序的异常处理机制
   5、违背URL和资源定位的初衷
   6、ajax不能很好的支持移动设备
   7、太多客户端代码造成开发上的成本

5. Ajax适用场景
表单驱动的交互
深层次的树的导航
快速的用户与用户间的交流响应
类似投票、yes/no等无关痛痒的场景
对数据进行过滤和操纵相关数据的场景
普通的文本输入提示和自动完成的场景

6. Ajax不适用场景
部分简单的表单
搜索
基本的导航
替换大量的文本
对呈现的操纵

7. 代码
- 原始XHR方法
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
- Jquery封装ajax写法
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
8. ajax请求的五个步骤
   1. 创建XMLHttpRequest异步对象
   2. 设置回调函数
   3. 使用open方法与服务器建立连接
   4. 向服务器发送数据
   5. 在回调函数中针对不同的响应状态进行处理

---
## axios
axios是通过Promise实现对ajax技术的一种封装，就像jquery对ajax的封装一样。
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
``` javascript
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
```
axios中发送的字段参数是**data**和**params**
区别：params和请求地址一起发送
data作为一个请求体发送
params一般适用于get，data一般适用于post put


---
## fetch
fetch是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。
``` javascript
fetch(url,options).then((response)=>{
//处理http响应
},(error)=>{
//处理错误
})
```
url ：是发送网络请求的地址。
options：发送请求参数,
   - body - http请求参数
   - mode - 指定请求模式。默认值为cros:允许跨域;same-origin:只允许同源请求;no-cros:只限于get、post和head,并且只能使用有限的几个简单标头。
   - cache - 用户指定缓存。
   - method - 请求方法，默认GET
   - signal - 用于取消 fetch
   - headers - http请求头设置
   - keepalive - 用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。
   - credentials - cookie设置，默认omit，忽略不带cookie，same-origin同源请求带cookie，inclue无论跨域还是同源都会带cookie。

response 对象根据服务器返回的不同类型数据，提供了不同的读取方法。分别有：
response.text() -- 得到文本字符串
response.json() - 得到 json 对象
response.blob() - 得到二进制 blob 对象
response.formData() - 得到 fromData 表单对象
response.arrayBuffer() - 得到二进制 arrayBuffer 对象

主要优势就是：
语法简洁，更加语义化
基于标准 Promise 实现，支持 async/await
同构方便，使用更加底层，提供的API丰富（request, response）
脱离了XHR，是ES规范里新的实现方式
fetch的不足之处：
fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: ‘include’})
fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
fetch没有办法原生监测请求的进度，而XHR可以
另外还有跨域方案不成熟等。

Jquery老迈笨拙，fetch年轻稚嫩，只有Axios正当其年！