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

### 跨域资源共享（CORS）
CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

浏览器将CORS跨域请求分为简单请求和非简单请求。
只要同时满足一下两个条件，就属于简单请求。反之，则为非简单请求
(1)使用下列方法之一：
head
get
post
(2)请求的Heder是
Accept
Accept-Language
Content-Language
Content-Type: 只限于三个值：application/x-www-form-urlencoded、multipart/form-data、text/plain

1. 简单请求
**浏览器**：浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。
```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
**服务器**：CORS请求设置的响应头字段，都以 Access-Control-开头:
1）Access-Control-Allow-Origin：必选
  它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。
2）Access-Control-Allow-Credentials：可选
  它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。
3）Access-Control-Expose-Headers：可选
  CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。

2. 非简单请求
非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

预检请求
  预检"请求用的请求方法是OPTIONS，表示这个请求是用来询问的。请求头信息里面，关键字段是Origin，表示请求来自哪个源。除了Origin字段，"预检"请求的头信息包括两个特殊字段。
``` 
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..
```
1）Access-Control-Request-Method：必选
  用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。
2）Access-Control-Request-Headers：可选
  该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。
预检请求的回应
  服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
  HTTP回应中，除了关键的是Access-Control-Allow-Origin字段，其他CORS相关字段如下：
1）Access-Control-Allow-Methods：必选
  它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
2）Access-Control-Allow-Headers
  如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
3）Access-Control-Allow-Credentials：可选
  该字段与简单请求时的含义相同。
4）Access-Control-Max-Age：可选
  用来指定本次预检请求的有效期，单位为秒。


1. 

2. [proxy代理](https://marendu.blog.csdn.net/article/details/103733286) 目前常用方式,通过服务器设置代理 
3. 
4. [window.postMessage()](https://blog.csdn.net/AIWWY/article/details/121666983)


https://www.nowcoder.com/discuss/1034478

https://www.nowcoder.com/discuss/1023956

https://www.nowcoder.com/discuss/1018429

https://www.nowcoder.com/discuss/1023886

https://www.nowcoder.com/discuss/1025225

https://www.nowcoder.com/discuss/1028740

https://www.nowcoder.com/discuss/1033388

https://www.nowcoder.com/discuss/1034478

https://www.nowcoder.com/discuss/1028574

https://www.nowcoder.com/discuss/1025864