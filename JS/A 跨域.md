# 跨域问题

## 跨域的原理
跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的。
同源策略,是浏览器对 JavaScript 实施的安全限制，只要协议、域名、端口有任何一个不同，都被当作是不同的域。
跨域原理，即是通过各种方式，避开浏览器的安全限制。

---
## 解决方案
### JSONP：
ajax 请求受同源策略影响，不允许进行跨域请求，而 script 标签 src 属性中的链接却可以访问跨域的 js 脚本，利用这个特性，服务端不再返回 JSON 格式的数据，而是 返回一段调用某个函数的 js 代码，在 src 中进行了调用，这样实现了跨域。
**JSONP 的缺点**:
JSON 只支持 get，因为 script 标签只能使用 get 请求； JSONP 需要后端配合返回指定格式的数据。

实现方式：
1. **原生JS实现**
``` JavaScript
// 动态创建 script
var script = document.createElement('script');
script.type = 'text/javascript';

// 设置回调函数
function getData(data) {
    console.log(data);
}
//设置 script 的 src 属性，并设置请求地址
script.src = 'http://localhost:3000/?callback=getData';
// 让 script 生效
document.body.appendChild(script);
```
2. **jQuery Ajax实现**
``` javascript
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "handleCallback",  // 自定义回调函数名
    data: {}
});
```
3. **Vue axios实现**
``` javascript
this.$http = axios;
this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'handleCallback'
}).then((res) => {
    console.log(res); 
})
```

**后端node.js代码**
``` javascript
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = querystring.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

2. 

1. [proxy代理](https://marendu.blog.csdn.net/article/details/103733286) 目前常用方式,通过服务器设置代理 
2. 
3. [window.postMessage()](https://blog.csdn.net/AIWWY/article/details/121666983)