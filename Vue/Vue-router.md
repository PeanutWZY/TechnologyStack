# Vue-Router

---
1. vue-router怎么重定向的？
在routes怕配置中加入redirect属性指向具体路径
*方式一（直接传入路径）*：
``` javascript
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: '/b' }
    ]
})
```
*方式二（传入路径对象）*：
``` javascript
const router = new VueRouter({
    routes: [
        { path: '/a', redirect: { name: 'foo' }}
    ]
})
```
*方式三（传入to方法）*：
``` javascript
const router = new VueRouter({
    routes: [
        { 
            path: '/a', 
            redirect: to =>{
                const { hash, params, query } = to
                if (query.to === 'foo') {
                    return { path: '/foo', query: null }
                }else{
                   return '/b' 
                }
            }
            
        }
    ]
})
```
---
2. vue-router 是什么?它有哪些组件
答：vue用来配置路由的一个插件。有router-link、router-view。

---
3. active-class 是哪个组件的属性？
答：vue-router模块的router-link组件。children数组来定义子路由。

---
4. 怎么定义 vue-router 的动态路由? 怎么获取传过来的值？怎么获取当前的路由信息？
答：在router目录下的index.js文件中，对path属性加上/:id。 使用router对象的params.id。使用this.$router获取当前的路由信息。

---
5. vue-router钩子函数有哪些？都有哪些参数？有哪些作用？
- 全局：
  前置守卫：beforeEach((to, from, next)=>{to：即将进入的路由对象；form：当前导航正要离开的路由；next()：进行管道中的下一个钩子})
  解析守卫：beforeResolve((to, from, next)=>{})
  后置钩子：afterEach((to,form)=>{})
``` javascript
import VueRouter from 'vue-router';
const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
})
router.beforeEach((to, from, next) => {
    //...
    next();
})
router.beforeResolve((to, from, next) => {
    //...
    next();
})
router.afterEach((to, from) => {
    //...
});
```

- 路由：beforeEnter((to, from, next)=>{})
``` javascript
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
            // ...
            }
        }
    ]
})
```
 
- 组件：beforeRouteEnter (to, from, next) {// 在渲染该组件的对应路由被 confirm 前调用// 不！能！获取组件实例 this// 因为当守卫执行前，组件实例还没被创建},
  beforeRouteUpdate (to, from, next) {// 在当前路由改变，但是该组件被复用时调用// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。// 可以访问组件实例 this},
  beforeRouteLeave (to, from, next) {// 导航离开该组件的对应路由时调用 //可以访问组件实例 this}。

作用：vue-router提供的导航钩子主要用来拦截导航，让它完成跳转或取消。

---
6. $route 和 $router 的区别是什么？
- `$router`是VueRouter的实例，包括了路由的跳转方法，钩子函数等。在script标签中想要导航到不同的URL,使用`$router.push`方法。返回上一个历史history用`$router.to(-1)`
- `$route`为当前router跳转对象。里面可以获取当前路由的name,path,query,parmas等路由信息参数。

---
7. 说说vue-router的两种模式
- hash: 兼容所有浏览器，包括不支持 HTML5 History Api 的浏览器，例http://www.abc.com/#/index，hash值为#/index， hash的改变会触发hashchange事件，通过监听hashchange事件来完成操作实现前端路由。**hash值变化不会让浏览器向服务器请求**。
``` javascript
// 监听hash变化，点击浏览器的前进后退会触发
window.addEventListener('hashchange', function(event){ 
    let newURL = event.newURL; // hash 改变后的新 url
    let oldURL = event.oldURL; // hash 改变前的旧 url
},false)
```
- history: 兼容能支持 HTML5 History Api 的浏览器，依赖HTML5 History API来实现前端路由。没有#，路由地址跟正常的url一样，但是**初次访问或者刷新都会向服务器请求，如果没有请求到对应的资源就会返回404**，所以路由地址匹配不到任何静态资源，则应该返回同一个index.html 页面，需要在nginx中配置。
- abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

---
8. vue-router实现路由懒加载（ 动态加载路由 ）的方式有哪些?
- 第一种：vue异步组件技术 ==== 异步加载，vue-router配置路由，使用vue的异步组件技术, 可以实现按需加载。但是,这种情况下一个组件生成一个js文件。
- 第二种：路由懒加载（使用import）。
- 第三种：webpack提供的require.ensure() ，vue-router配置路由，使用webpack的require.ensure技术，也可以实现按需加载。这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。
- 第四种：`vm.$router.addRoutes(routes);`
``` javascript
const routes = [
    {
        path: '/overview',
        name: 'overview',
        component: () => import('@/views/account/overview/index'),
        meta: {
            title: '账户概览',
            pid: 869,
            nid: 877
        },
    },
    {
        path: '*',
        redirect: {
            path: '/'
        }
    }
]
vm.$router.options.routes.push(...routes);
vm.$router.addRoutes(routes);
```
---
9. Vue-router跳转和location.href有什么区别？
答：使用`location.href='/url'`来跳转，简单方便，但是刷新了页面；
使用`history.pushState('/url')`，无刷新页面，静态跳转；
引进router，然后使用`router.push('/url')`来跳转，使用了diff算法，实现了按需加载，减少了dom的消耗。
其实使用router跳转和使用`history.pushState()`没什么差别的，因为vue-router就是用了history.pushState()，尤其是在history模式下。

---
10. 怎么配置404页面？
``` javascript
{   
  path: '/404',       
  component: () => import('@/views/error-page/404'),       
  hidden: true     
},     
//这个*匹配必须放在最后，将改路由配置放到所有路由的配置信息的最后， 
//否则会其他路由path匹配造成影响。     
{     
  path: '*',
  redirect: '/404', 
  hidden: true 
}
```

---
11. 切换路由时需要保存草稿的功能，怎么实现？
`<keep-alive>`是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
``` javascript
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
 
<router-view v-if="!$route.meta.keepAlive"></router-view>
// 动态缓存需要在router中设置router的元信息meta：
//...router.js 
export default new Router({
    routes: [ 
      { path: '/',
        name: 'Hello',
        component: Hello, 
        meta: {
          keepAlive: false    // 不需要缓存 
  } 
}, 
       { path: '/page1', 
         name: 'Page1', 
         component: Page1, 
         meta: {
           keepAlive: true    // 需要被缓存 
       } 
     } 
   ] 
})
```
---
12. vue-router如何响应路由参数的变化？什么是路由参数的变化？
当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。
监测路由参数变化的方法？
- 方法一:watch监听
``` javascript
watch: {
    '$route'(to, from) {
        //这里监听
    },
},
```
- 方法二：导航守卫
``` javascript
beforeRouteUpdate (to, from, next) {
    //这里监听
},
```
---
13.  切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？
通过配置`scrollBehavior(to, from, savedPosition)`
``` javascript
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});
```
---
14.  说说vue-router完整的导航解析流程是什么？
  1. 导航被触发
  2. 在即将离开的组件里调用离开守卫 `beforeRouteLeave(to,from,next)`
  3. 调用全局前置守卫 `beforeEach( (to,from,next) =>{} )`
  4. 在重用的组件里调用 `beforeRouteUpdate(to,from,next)` 守卫 / 调用路由配置的 `beforeEnter(to,from,next)` 守卫
  5. 解析异步路由组件
  6. 在被激活的组件里调用 `beforeRouteEnter(to,from,next)`
  7. 在所有组件内守卫和异步路由组件被解析之后调用全局的 `beforeResolve( (to,from,next) =>{} ) `解析守卫。
  8. 导航被确认
  9. 调用全局的 `afterEach( (to,from) =>{} )` 钩子
  10. 触发DOM更新
  11. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
  ``` javascript
  beforeRouteEnter(to, from, next) {
      next(vm => {
          //通过vm访问组件实例
      })
  },
  ```

---
15.  路由之间是怎么跳转的？有哪些方式？
- 组件导航（声明式）router-link router-view 通过使用内置组件<router-link :to="/home">来跳转
- 编程导航（编程式）router.push router.replace router.go

---
16.  说说你对router-link的了解
`<router-link>`是Vue-Router的内置组件，在具有路由功能的应用中作为声明式的导航使用。
`<router-link>`有8个props，其作用是：
**to**：必填，表示目标路由的链接。当被点击后，内部会立刻把to的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。
``` javascript
<router-link to="home">Home</router-link>
<router-link :to="'home'">Home</router-link>
<router-link :to="{ path: 'home' }">Home</router-link>
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
<router-link :to="{ path: 'user', query: { userId: 123 }}">User</router-link>
```
*注意path存在时params不起作用，只能用query*
**replace**：默认值为false，若设置的话，当点击时，会调用router.replace()而不是router.push()，于是导航后不会留下 history 记录。
**append**：设置 append 属性后，则在当前 (相对) 路径前添加基路径。
**tag**：让`<router-link>`渲染成tag设置的标签，如tag:'li,渲染结果为<li>foo</li>。
**active-class**：默认值为router-link-active,设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。
**exact-active-class**：默认值为router-link-exact-active,设置链接被精确匹配的时候应该激活的 class。默认值可以通过路由构造函数选项 linkExactActiveClass 进行全局配置的。
**exact**：是否精确匹配，默认为false。

<!-- 这个链接只会在地址为 / 的时候被激活 -->
`<router-link to="/" exact></router-link>`

---
17. Vue路由怎么跳转打开新窗口？
``` javascript
const obj = {
    path: xxx,//路由地址
    query: {
       mid: data.id//可以带参数
    }
};
const {href} = this.$router.resolve(obj);
window.open(href, '_blank');
```

---
18. 路由组件和路由为什么解耦，怎么解耦？
因为在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，所有要解耦。耦合如以下代码所示:
``` javascript
// Home组件只有在`http://localhost:8036/home/123`URL上才能使用。

const Home = {
    template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
    routes: [
        { path: '/home/:id', component: Home }
    ]
})
```
使用 props 来解耦
props为true，route.params将会被设置为组件属性。
props为对象，则按原样设置为组件属性。
props为函数，http://localhost:8036/home?id=123,会把123传给组件Home的props的id。
``` javascript
const Home = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
    routes: [
        { path: '/home/:id', component: Home, props: true},
        // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
        {
            path: '/home/:id',
            components: { default: Home, sidebar: Sidebar },
            props: { default: true, sidebar: false }
        }
        { path: '/home', component: Home, props: {id:123} },
        { path: '/home', component: Home, props: (route) => ({ id: route.query.id }) },
    ]
})
```
