# VUE篇

---
## Vue优点
- 轻量级
- 入门简单
- 双向数据绑定
- 组件化
- 视图，数据，结构分离 —— MVVM架构
- 虚拟DOM
- 运行速度更快

---
## Vue底层实现原理
vue.js是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter和getter，在数据变动时发布消息给订阅者，触发相应的监听回调
Vue是一个典型的MVVM框架，模型（Model）只是普通的javascript对象，修改它则视图（View）会自动更新。这种设计让状态管理变得非常简单而直观

- Observer（数据监听器） : Observer的核心是通过Object.defineProperty()来监听数据的变动，这个函数内部可以定义setter和getter，每当数据发生变化，就会触发setter。这时候Observer就要通知订阅者，订阅者就是Watcher

- Watcher（订阅者） : Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是：
   - 在自身实例化时往属性订阅器(dep)里面添加自己
   - 自身必须有一个update()方法
   - 待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调

- Compile（指令解析器） : Compile主要做的事情是解析模板指令，将模板中变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

- MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化 (input) -> 数据 model 变更的双向绑定效果。

---
## vue2和vue3响应式数据的理解/双向数据绑定的原理
- 响应式数据的核心是数据变化能够被实时监控
- 对象在vue2中采用了defineProperty（Vue.util.defineReactive）将数据定义成了响应式的数据（拦截所有属性增加了getter和setter）缺陷是需要递归遍历，不存在的属性无法被监控到。vue2里采用重写数组的方法来实现（7个变异方法，能改变原数组的方法）通过原型链 + 函数劫持的方法实现的（缺陷是不能检测到索引更改和数组长度的更改）
- vue3采用了proxy可以直接对对象拦截，无需重写get和set方法，性能高，不需要直接递归，对数组没有采用defineProperty 因为数组很长的情况下用户可能不会操作索引更改数据
- vue2中减少层级，嵌套不要过深
- 如果不需要响应式的数据尽量不要妨碍data中，合理使用object.freeze
- 尽量缓存使用过的变量

---
## Proxy与defineProperty
- **defineProterty** 的局限性在于只能对针对单例属性进行监听，它对data中的属性做了遍历+递归，为每个属性设置getter，setter。对于深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行object.defineProperty把每一层对象数据都变成响应时的，会产生很大的性能消耗
- **Proxy** 是针对一个对象的监听，对该对象的所有操作都会进入监听操作，因此可以代理所有属性，proxy在目标对象前设置了一层拦截，可以对外界的访问进行过滤和改写。proxy是在getter中递归响应式，这样只有真正访问到内部属性才会变成响应式。

---

## Vue实现数据双向绑定的原理：Object.defineProperty（）
vue实现数据双向绑定主要是：采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty（）来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。
vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化，通过Compile来解析编译模板指令（vue中是用来解析 {{}}），最终利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。
数据双向绑定示例：
``` HTML
<body>
  <div id="app">
    <input type="text" id="txt">
    <p id="show"></p>
  </div>
</body>
<script type="text/javascript">
    var obj = {}
    Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            // document.getElementById('txt').value = newValue
            document.getElementById('show').innerHTML = newValue
        }
    })
    document.addEventListener('keyup', function (e) {
        obj.txt = e.target.value
    })
</script>
```
<body>
    <div id="app">
    <input type="text" id="txt">
    <p id="show"></p>
</div>
</body>
<script type="text/javascript">
    var obj = {}
    Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            document.getElementById('txt').value = newValue
            document.getElementById('show').innerHTML = newValue
        }
    })
    document.addEventListener('keyup', function (e) {
        obj.txt = e.target.value
    })
</script>

---

## vue中如何进行依赖收集
- **目的**：当数据变化时就可以更新视图
- **方式**：每一个属性都有一个dep属性，每一个对象也有一个dep属性，每个组件在渲染的过程中都会创建一个渲染watcher（三种watcher，渲染watcher，计算属性watcher，用户watcher），一个属性可能会有多个watcher
- **过程**：当调用取值方法的时候如果有watcher就会将watcher收集起来，数据变化后会通知自身对应的dep出发更新调用watcher.updata方法
每一个属性和对象都有一个dep，存放watcher，当属性改变时会通知其对应的watcher去更新数据
默认在渲染的时候（获取到这个响应式数据），此时会触发属性收集依赖dep.depend()
当属性发生改变时则会触发watcher，通过dep.notify()通知渲染watcher重新渲染页面watcher.update

---

## Vue和React的不同，应用场景分别是什么
- vue是双向绑定。**vue属于框架**，是一套完整的解决方案，使用框架的时候，需要把你的代码放到框架适合的地方，框架会在合适的实际调用你的代码。使用框架的时候由框架控制一切，代码编写者只要按照规则写代码框架的入侵性很高从头到尾。应用场景：用模板即可搭建起来的应用，简单和能用，尽可能的小而快。  
- react没有数据双向绑定，react是单项数据流。**react属于库**，库本质上是一些函数的集合。每次调用函数，实现一定的特定的功能，接着把控制权交给使用者。应用场景：构建大型应用程序，同时适用于web端和原生app的框架，甚至是一套完整的生态系统。
- Jquery与Vue，react，angularjs最大的区别是Jquery是事件驱动，其他的都是数据驱动，Jquery的业务逻辑和UI混在了一起，所以整体逻辑很混乱。
- Angular，vue是双向绑定，react则不是

---

## vue中MVVM的理解
早期是MVC(model,view,control): 页面中进行操作 -> 后端的路由 ->控制器 -> 获取数据 -> 回传给页面。传统的MVC会使大量的逻辑会耦合在 C 层中

MVVM是一个软件架构设计模式，能够实现前端开发和后端业务逻辑的分离
**M**：模型（Model）：数据模型；负责数据存储。泛指后端进行的各种业务逻辑处理和数据操控，主要围绕数据库系统展开。
**V**：View 视图： 负责页面展示，也就是用户界面。主要由 HTML 和 CSS 来构建
**VM**：视图模型（View-Model）： 负责业务逻辑处理（比如Ajax请求等），对数据进行加工后交给视图展示
通过vue类创建的对象叫Vue实例化对象，这个对象就是MVVM模式中的VM层，模型通过它可以将数据绑定到页面上，视图可以通过它将数据映射到模型上

**优点**
1. 低耦合。视图（View）可以独立于Model变化和修改，
2. 可复用性。你可以把一些视图逻辑放在一个ViewModel里面，让很多view重用这段视图逻辑
3. 前后端分离，开发人员可以专注于业务逻辑（ViewModel）和数据的开发，设计人员可以专注于页面设计

---

## 为什么说VUE是一个渐进式的javascript框架, 渐进式是什么意思？
VUE允许将一个网页分割成可复用的组件，每个组件都包含属于自己的HTML、CSS、JAVASCRIPT以用来渲染网页中相应的地方。对于VUE的使用可大可小，它都会有相应的方式来整合到你的项目中。所以说它是一个渐进式的框架。VUE是响应式的（reactive）这是VUE最独特的特性，也就是说当我们的数据变更时，VUE会帮你更新所有网页中用到它的地方。

---
## 请说下封装 vue 组件的过程
首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。

然后，使用 Vue.extend 方法创建一个组件，然后使用 Vue.component 方法注册组件。子组件需要数据，可以在 props 中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用 emit 方法。

---

## vue生命周期
1. **beforeCreate（创建前/初始化页面前）** ：组件实例被创建之初，组件的属性生效之前
//beforeCreate生命周期执行的时候，data和methods中的数据都还没有初始化。不能在这个阶段使用data中的数据和methods中的方法
2. **created（创建后/初始化页面后）** ：组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用
// data 和 methods都已经被初始化好了，如果要调用 methods 中的方法，或者操作 data 中的数据，最早可以在这个阶段中操作
3. **beforeMount（挂载前/渲染页面前）**：在挂载开始之前被调用：相关的 render 函数首次被调用
// 执行到这个钩子的时候，在内存中已经编译好了模板了，但是还没有挂载到页面中，此时，页面还是旧的
4. **mounted（挂载后/渲染页面后）** ：在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
// 到mounted周期的时候，Vue实例已经初始化完成了。此时组件脱离了创建阶段，进入到了运行阶段。 如果我们想要通过插件操作页面上的DOM节点，最早可以在和这个阶段中进行
5. **beforeUpdate（更新前/更新数据前）** ：组件数据更新之前调用，真实DOM还没被渲染
// 当执行这个钩子时，页面中的显示的数据还是旧的，data中的数据是更新后的，页面还没有和最新的数据保持同步
6. **update（更新后/更新数据后）** ：组件数据更新之后
// 页面显示的数据和data中的数据已经保持同步了，都是最新的
7. **activated（激活前）** ：keep-alive专属，组件被激活时调用
// 当组件被切回来时，再去缓存里找这个组件、触发 activated钩子函数。
8. **deactivated（激活后）** ：keep-alive专属，组件被销毁时调用
// 当组件被换掉时，会被缓存到内存中、触发 deactivated 生命周期
9. **beforeDestory（销毁前）** ：组件销毁前调用
// Vue实例从运行阶段进入到了销毁阶段，这个时候上所有的data和methods，指令，过滤器……都是处于可用状态。还没有真正被销毁
10. **destoryed（销毁后）** ：组件销毁前调用
// 这个时候上所有的 data 和 methods，指令，过滤器……都是处于不可用状态。组件已经被销毁了。

Vue 实例从创建到销毁的过程，就是生命周期。从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、销毁等一系列过程，称之为 Vue 的生命周期。

---

## Vue子组件和父组件执行顺序
**加载渲染过程**：beforeCreate(父) —> created(父)—>beforeMount(父)—>beforeCreate(子)—>created(子)—>beforeMount(子)—>mounted(子)—>mounted(父)
**更新过程**：beforeUpdate(父) —> beforeUpdate(子) —> update(子) —> update(父)
**父组件更新**：beforeUpdate(父) —> updated（父）
**销毁过程**：beforeDestory(父) —> beforeDestory(子) —> destoryed(子) —> destoryed(父)

---

## 组件中的data为什么是一个函数
1.一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。 
2.如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。

---

## v-el 作用是什么
提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

Vue的el属性和$mount优先级？
``` javascript
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#div')
/*当出现上面的情况就需要对el和$mount优先级进行判断，从下面的官方图片我们可以看出来，
el的优先级是高于$mount的，因此以el挂载节点为准*/
```
---

## 假如data里面的数据不想做响应式，该怎么做

1、数据放在vue实例外（vue template中访问不到数据）
2、created, mounted钩子函数中定义(注意data中不要声明该变量名)
3、自定义Options
4、Object.freeze()

---
## 如何将获取data中某一个数据的初始状态？
``` javascript
data() {
    return {
      num: 10
  },
mounted() {
    this.num = 1000
  },
methods: {
    countNum() {
    	// 可以通过this.$options.data().keyname来获取初始值
        // 计算出num增加了多少
        console.log(1000 - this.$options.data().num)
    }
  }
```

---

## 动态给vue的data添加一个新的属性时为什么不刷新？怎样解决？
**原因**：一开始data里面的obj的属性会被设成了响应式数据，而后面新增的属性，并没有通过Object.defineProperty设置成响应式数据，所以当我们动态添加的时候并不会刷新
*解决路线：*
1. **Vue.set(参数)**
``` javascript
{Object | Array} target
{string | number} propertyName/index
{any} value*/
Vue.set(this.list, 0, {name: 'zhangsan', age: 18})
this.$set(this.list, 0, {name: 'zhangsan', age: 18})
//如果是在组件中使用，就不能直接使用Vue实例来调用，但是可以使用this
```
2. **Object.assign()**
//直接使用Object.assign()添加到对象的新属性不会触发更新, 应创建一个新的对象，合并原对象和混入对象的属性
this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})
3. **`$forcecUpdated()`**
//`$forceUpdate`迫使Vue 实例重新渲染,且仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。
*小结：*
如果为对象添加少量的新属性，可以直接采用Vue.set()
如果需要为新对象添加大量的新属性，则通过Object.assign()创建新对象
如果你实在不知道怎么操作时，可采取$forceUpdate()进行强制刷新 (不建议)
*PS：vue3是用过proxy实现数据响应式的，直接动态添加新属性仍可以实现数据响应式*

---
## observable
Vue.observable，让一个对象变成响应式数据。Vue 内部会用它来处理 data 函数返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器
使用场景：
在非父子组件通信时，可以使用通常的bus或者使用vuex，但是一些小项目上功能不是太复杂，而使用上面两个又有点繁琐。这时，observable就是一个很好的选择
``` javascript
// 先新建一个js文件，引入vue
import Vue from vue
// 创建state对象，使用observable让state对象可响应
export let state = Vue.observable({
  name: '张三',
  age: 18
})
// 创建对应的方法
export let mutations = {
  changeName(name) {
    state.name = name
  },
  setAge(age) {
    state.age = age
  }
}

```
``` HTML
//在需要使用的文件中获取
<template>
  <div>
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <button @click="changeName('李四')">改变姓名</button>
    <button @click="setAge(20)">改变年龄</button>
  </div>
</template>
<script>
import { state, mutations } from '@/store
export default {
  // 在计算属性中拿到值
  computed: {
    name() {
      return state.name
    },
    age() {
      return state.age
    }
  },
  // 调用mutations里面的方法，更新数据
  methods: {
    changeName: mutations.changeName,
    setAge: mutations.setAge
  }
}
</script>
```
---

## 简单实现数据响应（数据劫持）
``` javascript
var demo={
    name:'张三'
}
//Object.defineProperty(obj,prop,descriptor)
//obj:目标对象，prop:需要新增，或者修改的属性名，descriptor:定义的特性
Object.defineProperty(demo,'name',{
    set(value){
        console.log('重新设为：'+value)
        name=value
    },

    get(){
        return name
    }
})

demo.name='李四'
console.log(demo.name)//李四
```

---

## 动态指令设置及动态传参
``` HTML
<template>
    ...
    <child @[someEvent]="handleSomeEvent()" :[someProps]="1000" />...
</template>
<script>
  ...
  data(){
    return{
      ...
      someEvent: type ? "click" : "dbclick",
      someProps: type ? "num" : "price"
    }
  },
  methods: {
    handleSomeEvent(){
      // do some
    }
  }  
</script>
//应用场景：用于页面中根据不同的返回值进行事件的触发和值的传参
```

---

## Vue组件间的参数传递
1. 父组件传给子组件：子组件通过props方法接受数据;
2. 父传子孙：provide和inject
3. 子组件传给父组件：通过事件形式，$emit()方法传递参数
4. 非父子组件间的数据传递，兄弟组件传值借用eventBus，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。发送数据使用 $emit方法，使用 $on 接收
5. 通信组件：PubSub.js
6. vuex

### provide和inject使用（响应式）
provide和inject是用来实现父组件向深层的子组件传值和接收的语法，具体如下：
```
// 祖先组件
provide(){
    return {
   	  // keyName: { name: this.name }, // value 是对象才能实现响应式，也就是引用类型
      keyName: this.changeValue // 通过函数的方式也可以[注意，这里是把函数作为value，而不是this.changeValue()]
     // keyName: 'test' value 如果是基本类型，就无法实现响应式
    }
},
data(){
	  return {
		msg:'初始mesg'
	}
},
methods: {
  	changeValue(){
  		this.msg= '改变后的msg'
  	}
}  
  
// 后代组件
inject:['keyName']
create(){
	console.log(this.keyName) // 改变后的msg
}
```

---

## Vue的路由实现：hash模式 和 history模式
- hash模式： 在浏览器中符号“#”，#以及#后面的字符称之为hash，用window.location.hash读取；特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，对服务端安全无用，hash不会重加载页面。可以为hash的改变添加监听事件，每一次改变hash(window.location.hash)都会在浏览器的访问历史中增加一个记录。利用hash的以上特点，可以实现前端路由的“更新视图但不重新请求页面”的功能。
- history模式： history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，history采用HTML5的新特性；且提供了两个新方法：pushState（），replaceState（）可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。

---

## $nextTick原理及运用
1. nextTick是啥?
nextTick是Vue提供的一个全局API,是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM；
Vue.nextTick( [callback, context] )：将回调函数延迟在下一次dom更新数据后调用。 **简单来说：当数据更新了。在dom中渲染过后，自动执行该函数**
2. 为什么需要它呢?
Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop)当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。
这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOM操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。
假使你设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。
为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。
3. 我在什么地方用它呢?
   - 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。
原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，
所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，
因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
   - 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候
(譬如v-if/v-show根据字段变化显隐)，这个操作都应该放进Vue.nextTick()的回调函数中。

---

## Compute和watch区别和应用场景
- computed 计算属性中的属性不需要在data中定义，而且必须有return
``` javascript
data(){
	return{
    	firstName:"张",
        lastName:"三"
    }
}
computehd(){
	fullname(){
    	return this.firstname+this.lastname
    }
}
```
计算属性具有缓存，计算属性是基于它们的依赖进行缓存的，只有在它的相关依赖发生改变时才会重新求值。
只要计算属性的依赖没有改变，那么调用它就会直接返回之前的缓存。 同时computed对于其中变量的依赖时多个的时候，只要其中一个发生了变化都会触发这个函数

***应用场景***: 当一个变量的值受多个变量的值影响

- watch 监听器watch中的值需要在data中定义，且函数有参数，newval和oldval
``` javascript
data: {
  firstName: '张',
  lastName: '三',
  fullName: '张三'
},
watch: {
  firstName: function (oval，nval) {
    this.fullName = nval + ' ' + this.lastName
  },
  lastName: function (oval，nval) {
    this.fullName = this.firstName + ' ' + nval
  },
  immediate: true,// 代表在wacth里声明了firstName之后立即先去执行其函数方法
  deep: true //深度监听
}
```
watch的依赖是单个的，它每次只可以对一个变量进行监控，并且区别于computed属性，监听器watch可以是异步的而computed则不行
***应用场景***：当一个变量的值影响着多个变量的值

---

## filters
过滤器分为全局过滤和局部过滤，当命名冲突时以局部过滤器权重高
```
//插值中
{{msg|filterMsg}}
//bind中
<div v-bind:"id|filterId"></div>
```
***运用场景*** ：一般来说我们用过滤器来格式化一些数据或者渲染的文本对于格式展现的要求
- 全局：
Vue.filter('过滤器名',function(value){
	//do some
  }
- 局部：
filters:{
	过滤器名称:function(value){
	//do some
	  }
}

---

## vuex是什么？怎么使用？哪种功能场景使用它？
- 是什么
vue框架中状态管理。在main.js引入store注入。新建一个目录store 。场景有：单页应用中，组件之间的状态，
音乐播放、登录状态、加入购物车等。
- 属性：
State、 Getter、Mutation 、Action、 Module
- State
state是数据源存放地，对应于一般Vue对象里面的data。state里面存放的数据是响应式的，
Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新
需要通过mapState把全局 state 和 getters 映射到当前组件的 computed 计算属性中。
- Getter
getters 可以对State进行计算操作，在多个组件间复用
- Mutation 
提交更新数据的方法，必须是同步的（异步需要使用action）。每个mutation都有一个字符串的事件类型（type）和一个回调函数（handler）。回调函数就是实际进行状态更改的地方，并且他会接收state左右第一个参数，提交载荷作为第二个参数。
- Action
Action 类似于 mutation，不同在于Action 提交的是 mutation，而不是直接变更状态；Action 可以包含任意异步操作。
- Module
Vuex允许我们将store分隔成模块（module），每个模块拥有自己的state，mutation，action，getter，甚至是嵌套子模块
- 使用场景
一句话，不要为了使用vuex而去使用vuex，推荐组件间数据复用，记录登录及其它状态值数据，一些需要缓存的数据使用vuex都能达到很好的管理

![vuex](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7249773a1634f779c48f3f0ffabf968~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

---

## v-show 与 v-if 的区别，两者的优先级
- v-show指令是通过修改元素的display的CSS属性让其显示或者隐藏；
- v-if指令是直接销毁和重建DOM达到让元素显示和隐藏的效果；

使用v-show会更加节省性能上的开销；当只需要一次显示或隐藏时，使用v-if更加合理。


---
## v-for 和 v-if 的优先级
- 优先级
v-for优先级比v-if高(vue2.x中)

- 注意事项
不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）。正确的做法应该是再v-for的外面新增一个模板标签template，在template上使用v-if也能结合filters或者是computed属性对数据进行加工，避免v-if判断，更好的渲染

注意：在vue2.x中，v-for的优先级会比v-if的优先高，但在vue3.x中这一判断优先级被换了过来，在3.x的环境下v-if优先级更高，除此之外v-for和v-if在同一标签中使用也会报错，解决办法可以在外面套一个template标签，或者使用computed来对数组进行过滤然后渲染

---

## vue中key的原理及其必要性
vue中key作用：key是给每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确， 更快的找到对应的vnode节点
key是每一个节点的唯一标识
***必要性***：当我们对数据进行更新的时候，譬如在数组中插入、移除数据时，设置的key值能让vue底层高效的对新旧vnode进行diff，然后将比对出的结果用来更新真实的DOM

---

## [diff 算法](https://blog.csdn.net/m0_64023259/article/details/125476986)
Diff算法的作用:比较新旧节点,找到可复用的节点,比对进行增删移的操作,节省性能。

- 简单Diff算法:
  实现:通过虚拟节点的key属性找到可复用的节点,找到了就记录该索引,设为最大索引,通过DOM移动后续小于该索引的节点。类似冒泡排序。

- 双端Diff算法:
  实现:标记新旧两组节点的各自首尾节点,将其标记为新头,新尾,旧头,旧尾,与相对的首尾节点互相比较(例如新头和旧头旧尾比对,旧尾和新头新尾比对),都没找到相同的节点就将新头与旧头旧尾之间的节点进行比对,例如旧三和新头一样,那么就把旧三移到顶部,然后旧三和新头不参与后续比对,将新二设为新头,继续与相对的首尾节点互相比较,如果发现了相同节点,就根据key属性将旧节点移动到新节点对应的位置,然后以此类推。

  而需要增加新元素的情况则全部比对完进行if判断(旧头key > 旧尾key & 新头key <= 新尾key),将剩下的新头和新尾之间的遍历挂载到旧头处。

  删除没有的元素就简单了,就是上面if的else情况(旧头key <= 旧尾key & 新头key > 新尾key),将剩下的旧头和旧尾之间的遍历删除。

- 快速Diff算法:
  >概述:先处理新旧两组节点中相同的前置和后置节点,然后将中间相同且连续的新旧节点设置一个递增序列,然后移动其他的节点完成更新。

---

## vue路由传参
``` javascript
//通过 params 传参
this.$router.push({
        name: '目标组件名',
        params: {
          id: id
        }
      })
//接收：
this.$route.params

//通过 query 传参
this.$router.push({
      path: '目标组件路径',
      query: {
        id: id
      }
   })
//接收
this.$route.query
```
***区别***：query使用path来引入，params使用name来引入，接收方式是this.$route.query.name和this.$route.params.name，值得注意的是query传递的参数会显示在url后面以?id=？形式展示。

``` javascript
// 动态路由传参
// 直接调用$router.push 实现携带参数的跳转
     this.$router.push({
       path: `/particulars/${id}`,
     })
//通过this.$route.params.id接收
```
可以看到，和上面传参不一样的是我们直接把动态参数加在路径后面实现动态路由

---

## vue路由的钩子函数
导航钩子种类，路由的钩子函数总结有6个
- 全局的路由钩子函数：beforeEach、afterEach
- 单个的路由钩子函数：beforeEnter
- 组件内的路由钩子函数：beforeRouteEnter、beforeRouteLeave、beforeRouteUpdate

1. 全局导航钩子
全局前置守卫：beforeEach
```javascript
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
     	// ...
})
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法不然会阻塞路由。执行效果依赖 next 方法的调用参数。
// next（）方法接收的参数：
// next()//直接进to 所指路由
// next(false) //中断当前路由
// next('route') //跳转指定路由
// next('error') //跳转错误路由
```

2. 全局后置钩子：afterEach
``` javascript
router.afterEach((to, from) => {
     // do someting
});

//后置钩子并没有 next 函数
```

3. 路由独享的钩子
路由独享的导航钩子，它是在路由配置上直接进行定义的，参数的使用，和全局前置守卫是一样的
使用的钩子函数与全局路由守卫一致，为beforeEnter，不同的是，路由独享守卫是定义在路由记录中，全局路由守卫是定义在入口文件中，路由独享守卫只在路由进入时有效，全局路由守卫是所有路由跳转都会被拦截。

4. 组件内的导航钩子
   - beforeRouteEnter：在渲染该组件的对应路由前调用
   - beforeRouteUpdate：在当前路由改变，但是该组件被复用时调用
   - beforeRouteLeave：导航离开该组件的对应路由时调用
***注意***：beforeRouteEnter 不能获取组件实例 this，因为当守卫执行前，组件实例被没有被创建出来，剩下两个钩子则可以正常获取组件实例 this

---
## 共享组件将不会重新渲染问题
我们有时候开发中会把多个路由解析为同一个Vue组件。问题是，Vue默认情况下共享组件将不会重新渲染，如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化，此时我们需要传递key来区分，达到刷新的目的
``` javascript
const routes = [
  {
    path: "/a",
    component: MyComponent
  },
  {
    path: "/b",
    component: MyComponent
  },
];
``` 
``` HTML
<template>
    <router-view :key="$route.path"></router-view>
</template>
```

---
## v-slot插槽
插槽就是子组件中用slot标签定义的预留位置，有name属性叫具名插槽，不设置name属性的叫不具名插槽，使用插槽主要是为了在父组件中使用子组件标签的时候可以往子组件内写入html代码。
插槽使用：
``` vue
//父组件：
<template>
    <div>
        <div>这是父组件</div>
        <son>slot内容</son>
    </div>
</template>
//子组件
<template>
    <div>
        <div>这是子组件</div>
        <input type="text" placeholder="请输入">
    </div>
</template>
//一般情况下想在子组件内插入内容像上面直接在标签里书写时不显示的需要以slot为媒介

//改写后：
//子组件:
<template>
    <div>
        <div>这是子组件</div>
        <input type="text" placeholder="请输入">
        <slot></slot> 
    </div>
</template>
//此时我们没有给插槽设置name，所以这是一个不具名插槽

//具名插槽：
//父组件：
<template>
    <div>
        <d iv>这是父组件</div>
        <son>
        	<template slot="myslot">
                <div>
                    实践具名slot
                </div>
            </template>
        </son>
    </div>
</template>
//子组件
<template>
    <div>
        <div>这是子组件</div>
        <input type="text" placeholder="请输入">
        <slot name="myslot"></slot> 
    </div>
</template>
//此时设置name属性的插槽为具名插槽，与之相对应的用了slot的设置为相同属性名的内容则会被渲染在插槽中，此时如果有未设置slot插槽名的内容则会被渲染在不具名插槽中
```

插槽作用域：
``` HTML
//父组件:
<template>
    <div>
        <div>父组件</div>
        <son>
            <template slot="myslot" slot-scope="props">
                <ul>
                    <li v-for="item in props.data">
                        {{item}}
                    </li>
                </ul>
            </template>
        </son>
    </div>
</template>
//子组件:
<template>
    <div>
        <div>子组件</div>
        <input type="text" placeholder="请输入">
        <slot name="myslot" :data='list'></slot>
    </div>
</template>
<script>
export default {
    name:'Son',
    data(){
        return{
            list:[
                {name:"张三",age:3},
                {name:"李四",age:4},
                {name:"王五",age:5}
            ]
        }
    }
}
</script>
```


---
## mixins
mixins是一种分发Vue组件中可复用功能的一种灵活方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
mixins是一个JavaScript对象，可以包含组件中的任意选项，比如Vue实例中生命周期的各个钩子函数，也可以是data、components、methods或directives等
运用：
``` javascript
//mixin文件
export const myMixin={
    data(){
        return{
            msg:1
        }
    },
    created(){
        console.log('myMixin')
    },
    methods:{
        Fn(){
            console.log('myMixin')
        }
    }
}
```
``` HTML
//引入
<template>
	<div>运用mixin的组件</div>
</template>
<script>
    import {myMixin} from'目标文件路径'
    export default{
        mixins:[myMixin]
    }
</script>
```
***特点***：
1. 在组件A对混入的数据做出更改后组件B获取到的仍是混入初始设置的数据，组件间操作互不污染。
2. 值为对象的如methods,components等，选项会被合并，组件会覆盖混入对象的方法。
比如混入对象里有个方法A，组件里也有方法A，这时候在组件里调用的话，执行的是组件里的A方法。
3. created,mounted等，就会被合并调用，混合对象里的钩子函数在组件里的钩子函数之前调用，
同一个钩子函数里，会先执行混入对象的东西，再执行本组件的。
4. 在mixins里面包含异步请求函数的时候，通过直接调用异步函数获取返回数据

***组件的选项和混入的选项是怎么合并的***
数据对象【data 选项】，在内部进行递归合并，并在发生冲突时以组件数据优先；
同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用；
watch 对象合并时，相同的 key 合成一个对象，且混入监听在组件监听之前调用；
值为对象的选项【filters 选项、computed 选项、methods 选项、components 选项、directives 选项】将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

***运用场景区别***：
- vuex：用来做状态管理，可以看做全局变量，里面定义的变量在每个组件中均可以使用和修改，
在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。
- mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，
值的修改在组件中不会相互影响。
- 父子组件：父子组件相对来说比较独立，只是父组件将一部分使用子组件，而mixins更像是对于组件的拓展，并且组件可以对于混入的数据和方法进行多样化操作。

---

## vue自定义组件添加事件
使用修饰符.native 监听组件根元素的原生事件,把子组件当做原生html标签
``` HTML
<my-button  @click.native="alert()" names="点击触发"></my-button>
```

---

## axios
axios是一个基于proimise的http/ajax请求库，可以用在浏览器和node.js中。
***axios特点***：
- 在浏览器中创建XMLHttpRequest请求
- 在node.js中发送http请求
- 支持Promise所有API
- 批量发送多个请求
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防止CSRF/XSRF(跨域请求伪造)

***axios的请求方式***：
``` javascript
axios(config) // 通用/最本质的发任意类型的请求方式
axios.request(config) // 等同于axios(config)
axios.(url[, config]) // 指定url发get请求
axios.get(url, [config]) //发get请求
axios.post(url, [data [config]]) // 发post请求
axios.put(url, [data [config]]) // 发put请求
axios.delete(url, [config]) // 发delete请求
axios.all(promises) // 批量执行多个异步请求
axios.spread() // 接收所有成功数据的回调函数的方法
```
***axios一般用法配置与请求***
``` javascript
//引入axios
import axios from 'axios'
//定义axios请求接口的baseURL
axios.default.baseURL = 'http://localhost:8080/api/products'

//执行GET请求
axios.get('/user?ID=12345')  //返回的是一个Promise
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

//可配置参数的方式
axios.get('/user',{
    params:{
        ID:12345
    }
}).then(res=>console.log(res))
    .catch(err=>console.log(err));

//发送post请求
axios.post('/user',{
    firstName: 'simon',
    lastName:'li'
}).then(res=>console.log(res))
    .catch(err=>console.log(err));
    
//发送post请求
axios({
    method: 'post',  //请求方式，默认是get请求
    url:'/user/12345', //地址
    data:{ //参数
        firstName: 'simon',
        lastName: 'li'
    }
});
```

***发送并发请求***：
``` javascript
//发送多个请求(并发请求)，类似于promise.all，若一个请求出错，那就会停止请求
const get1 = axios.get('/user/12345');
const get2 = axios.get('/user/12345/permission');
axios.all([get1,get2])
    .then(axios.spread((res1,res2)=>{
    	console.log(res1,res2);
	}))
    .catch(err=>console.log(err))
    
//函数返回的是一个数组axios.spread(callback)可用于将结果数组展开
```

***请求配置***：
``` javascript
{
    //服务器的地址，是必须的选项
    url: '/user',
        
    //请求的方式，若没有则默认是get
    method:'get',
        
    //如果url不是绝对地址，则会加上baseURL
    baseURL: 'http://localhost:3000/',
       
    //transformRequest允许请求的数据在发送至服务器之前进行处理，这个属性只适用于put、post、patch方式
    //数组的最后一个函数必须返回一个字符串或者一个'ArrayBuffer'或'Stream'或'Buffer' 实例或'ArrayBuffer'，'Formdata'，
    //若函数中用到了headers，则需要设置headers属性    
    transformRequest: [function(data,headers){
        //根据需求对数据进行处理
        return data;
    }],    
    
    //transformResponse允许对返回的数据传入then/catch之前进行处理    
    transformResponse:[function(data){
        //依需要对数据进行处理
        return data;
    }],   
    
    //headers是自定义的要被发送的信息头
    headers: {'X-Requested-with':'XMLHttpRequest'},
        
    //params是请求连接中的请求参数，必须是一个纯对象
    params:{
      ID:12345  
    },    
    
    //paramsSerializer用于序列化参数
    paramsSerializer: function(params){
      return Qs.stringify(params,{arrayFormat:'brackets'});  
    },     
    
    //data是请求时作为请求体的数据——request.body
    //只适用于put、post、patch请求方法
    //浏览器:FormData，File，Blob;Node:stream
    data:{
      firstName: 'simon',  
    },    
    
    //timeout定义请求的时间，单位是毫秒，如果请求时间超过设定时间，请求将停止
    timeout:1000,
        
    //withCredentials表明跨跨域请求是否需要证明。
    withCredentials:false, //默认值
        
    //adapter适配器，允许自定义处理请求
    //返回一个promise
    adapter:function(config){
        /*...*/
    },    
     
    //auth表明HTTP基础的认证应该被使用，并提供证书
    auth:{
      username:'simon',
      password:'123456',    
    },    
    
    //responseType表明服务器返回的数据类型，这些类型包括：json/blob/document/ 		arraybuffer/text/stream    
     responseType: 'json',   
         
     //proxy定义服务器的主机名和端口号
     //auth属性表明HTTP基本认证应该跟proxy相连接，并提供证书
     //这将设置一个'Proxy-Authorization'头(header)，覆盖原来自定义的
     proxy:{
         host:127.0.0.1,
         port:8080,
         auth:{
             username:'simon',
             password:'123456'    
         }    
     },   
     
     //取消请求
     cancelToken: new CancelToken(cancel=>{})    
}
```

---
## keep-alive
活动组件实例在切换离开时将被卸载。这将导致它持有的任何更改状态丢失
我们在开发过程中经常会有tab切换的这种需求，此时如果说有接口请求或者组件的刷新将会导致我们原来的数据重置，如果不想组件重置数据，我们可以用< keep-alive >标签包裹

上面是官网的一个例子，当从A切换到B组件再切回A时候，count计数将会重置，但是当用< keep-alive >包裹时候，再切换，我们会发现count能够得以保留了
``` HTML
<!-- Inactive components will be cached! -->
<keep-alive>
  <component :is="activeComponent" />
</keep-alive>
```
***includes和exclude***：
``` HTML
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
```
``` HTML
<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
```
``` HTML
<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```
匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 
(父组件 components 选项的键值)，匿名组件不能被匹配

设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（activated与deactivated）：
首次进入组件时：beforeRouteEnter > beforeCreate > created> mounted >
activated > … … > beforeRouteLeave > deactivated
再次进入组件时：beforeRouteEnter >activated > … … > beforeRouteLeave >
deactivated

---
## Vue常用的修饰符及其使用
修饰符是用于限定类型以及类型成员的声明的一种符号,常见修饰符种类：
- 表单修饰符
- 事件修饰符
- 鼠标按键修饰符
- 键值修饰符
- v-bind修饰符

1. 表单修饰符
lazy、trim、number
``` HTML
//光标离开标签的时候，才会将值赋予给value
<input type="text" v-model.lazy="value">
//过滤用户输入的首尾空格字符，注意，如果是中间的空格则不会过滤
<input type="text" v-model.trim="value">
//自动将用户的输入值转为数值类型，但如果这个值无法被parseFloat解析，则会返回原来的值
<input v-model.number="age" type="number">
```
2. 事件修饰符
stop、prevent、self、once、capture、passive、native
``` HTML
//阻止了事件冒泡
<button @click.stop="btn()">ok</button>
//阻止了事件的默认行为
<form v-on:submit.prevent="onSubmit"></form>
//只当在 event.target 是当前元素自身时触发处理函数
<div v-on:click.self="doSome">...</div>
//事件只能触发一次
<button @click.once="btn()">ok</button>
//事件触发从包含这个元素的顶层开始往下触发 //输出结构: 1 2
<div @click.capture="btn(1)">
    1
    <div @click.capture="btn(2)">
	    2
	</div>
</div>
/* 在移动端，当我们在监听元素滚动事件的时候，会一直触发onscroll事件会让我们的网页变卡，
因此我们使用这个修饰符的时候，相当于给onscroll事件整了一个.lazy修饰符*/
<div v-on:scroll.passive="onScroll">...</div>
/*让组件变成像html内置标签那样监听根元素的原生事件，否则组件上使用 v-on 只会监听自定义事件
注意：使用.native修饰符来操作普通HTML标签是会令事件失效的*/
<my-component v-on:click.native="doSomething"></my-component>
```

3. 鼠标按钮修饰符
left 左键点击、right 右键点击、middle 中键点击
``` HTML
<button @click.left="btn('left')">ok</button>
<button @click.right="btn('right')">ok</button>
<button @click.middle="btn('middle')">ok</button>
```

4. 键盘修饰符
onkeyup，onkeydown，后面需要跟keycode编码名或者按键编码
``` HTML
<input type="text" @keyup.keyCode="btn()">
```

5. v-bind修饰符
async、prop、camel
``` HTML
//能对props进行一个双向绑定
//父组件
<comp :myMessage.sync="bar"></comp> 
//子组件
this.$emit('update:myMessage',params);

//上面代码与以下代码是等同的,实际上就是实现了获取子组件信息处理并回传
//父亲组件
<comp :myMessage="bar" @update:myMessage="func"></comp>
func(e){
 this.bar = e;
}
//子组件js
func2(){
  this.$emit('update:myMessage',params);
}
```
***注意***：
1. 使用sync的时候，子组件传递的事件名格式必须为update:value，其中value必须与子组件中props中
声明的名称完全一致
2. 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用
3. 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的
``` HTML
//设置自定义标签属性，避免暴露数据，防止污染HTML结构
<input id="uid" title="title1" value="1" :index.prop="index">

//将命名变为驼峰命名法，如将view-Box属性名转换为 viewBox
<svg :view-Box.camel="viewBox"></svg>
```

---
## 什么是ssr
Server-Side Rendering 我们称其为SSR，意为服务端渲染，展开说就是通过服务侧完成页面的 HTML 结构拼接的页面处理技术，发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的过程
***ssr作用：***
seo：搜索引擎优先爬取页面HTML结构，使用ssr时，服务端已经生成了和业务相关联的HTML，有利于seo
首屏呈现渲染：用户无需等待页面所有js加载完成就可以看到页面视图（压力来到了服务器，所以需要权衡哪些用服务端渲染，哪些交给客户端）
***缺点：***
项目复杂度高
需要库的支持性，代码兼容
服务器负载变大，相对于前后端分离服务器只需要提供静态资源来说，服务器负载更大

---
## scoped 样式隔离
vue在创建组件的时候，会给组件生成唯一的id值，当style标签给scoped属性是，会给组件的html结点都加上这个id值标识，如data-v4d5aa038，然后样式表会根据这个id值标识去匹配样式，从而实现样式隔离

---
## 函数式组件使用场景和原理
***什么是函数式组件？***
函数式组件就是函数是组件，组件是函数，它的特征是没有内部状态、没有生命周期钩子函数、没有this（不需要实例化的组件）。在日常开发中，我们经常会开发一些纯展示性的业务组件，比如一些详情页面，列表界面等，它们有一个共同的特点是：只要你传入数据，我就进行展现。不需要有内部状态，不需要在生命周期钩子函数里面做处理。

***为什么要用它?***
函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件。函数式组件结构更简单，代码结构更清晰

***函数式组件与普通组件的区别?***
- 函数式组件需要在声明组件时指定functional。
- 函数式组件不需要实例化，所以没有this，this通过render函数的第二个参数来代替。
- 函数式组件没有生命周期钩子函数，不能使用计算属性，watch等等。
- 函数式组件不能通过$emit对外暴露事件，调用事件只能通过context.listeners.click的方式调用外部传入的事件。
- 因为函数式组件是没有实例化的，所以在外部通过ref去引用组件时，实际引用的是HTMLElement。
- 函数式组件的props可以只声明一部分或者全都不声明，所有没有在props里面声明的属性都会被自动隐式解析为prop，而普通组件所有未声明的属性都被解析到$attrs里面，并自动挂载到组件根元素上面(可以通过inheritAttrs属性禁止)。

***使用场景***
上面已经反复强调，凡是不需要实例化，无状态，没有生命周期的组件，除了props之外没有别的配置项，都可以改写成函数式组件。

模板写法：
``` HTML
<!-- 父组件 -->
<template>
  <div>
    <func text="aaaaaaaa" />
  </div>
</template>
<script>
import func from '@/components/func.vue';
export default {
  components: {
    func
  }
};
</script>

<!-- func.vue -->
<template functional>
  <p>{{props.text ? props.text : '哈哈'}}</p>
</template>
```
JSX写法：
``` HTML
<script>
export default {
  functional: true,
  props: {
    text: {
      type: String
    }
  },
  /**
   * 渲染函数
   * @param {*} h
   * @param {*} context 函数式组件没有this, props, slots等都在context上面挂着
   */
  render(h, context) {
    console.log(context);
    const { props } = context
    if (props.text) {
      return <p>{props.text}</p>
    }
    return <p>哈哈嗝</p>
  }
}
</script>
```

---

## vue-loader是什么？用途？
vue 文件的一个加载器，跟 template/js/style 转换成 js 模块
- 作用：解析和转换.vue文件，提取其中的逻辑代码scrpt，样式代码style，以及html，模板template，在分别把他们交给对应的loader处理
- 用途：js可以写成es6，style样式可以scss或less，template可以加js

---

## 接口请求一般放在哪个生命周期中？

一般放在mounted中，在html渲染后调用，但服务器端渲染时不支持mounted，需要放在created中

---

## 如何实现vue首屏加载优化？
1. 把不常改变的库放到index.html中，通过cdn引入
2. 开启GZIP压缩
3. vue路由的懒加载
4. vue组件尽量不要全局引入
5. 使用轻量级的工具库

---

## Vue.cli项目中src目录小的每个文件夹和文件的用法
1. assets 静态资源
2. components 组件
3. router 路由配置
4. view 视图 
5. app.vue 应用主组件
6. main.js 入口文件

---

## vue-router
vue官方路由管理器，组件包含router-link, router-view，keep-alive 


### $route 和 $router 的区别
router为Vue Router的实例，相当于一个全局的路由器对象，包含很多属性和子对象，例如history对象。
经常用的跳转链接就可以用this.$router.push和router-link跳转一样

---

## vue3.0特点
1. 简介：页面由HTML模板+JSON数据格式+Vue.js实例化对象组成
2. 数据驱动：自动计算属性和追踪依赖的模板表达式
3. 组件化：高复用性，低耦合性
4. 轻量：代码量小，不依赖其他库
5. 快速：虚拟DOM可以精确而有效的批量实现DOM更新

---

## 虚拟DOM的优缺点
**优点：**
1. 保证性能下线
2. 无需手动操作DOM
3. 跨平台

**缺点：**
无法进行极致优化

---

## Vue不能检测到哪些数据变化
1. 利用索引直接设置一个数组项时
2. 修改数组长度时

---

## 简述原型与原型链，原型链的作用？
每一个类都是一个显示原型prototype
每一个类都有一个隐式原型__proto__
实例__proto__等于类的显示类型prototype
当去查找一个实例的属性或方法时，现在自身查找，找不到则沿着__proto__向上查找
我们把原型__proto__与prototype的关系叫做原型链
作用是：实现了JS的继承，让实例拥有了类的共用方法

---

## 怎样理解vue的单项数据流
数据总是从父组件传到子组件，子组件没有权利修改父组件传过来的数据，只能请求父组件对原数据进行修改

---

## vue-extend
子类构造器，vue组件的核心api。实现思路是使用原型链继承的方式返回了vue的子类，并且利用mergeOptions把数据传入组件

---

## vue-set
在实例创建后添加新的属性到实例上（给响应式对象新增属性）
直接更改数组下标来修改数组的值

---

## vuex为啥要分模块
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store对象就有可能会变得相当臃肿。所以vuex允许将store分割成module，每个模块拥有独立的state，mutation，action，getter，甚至是嵌套子模块

---

## VNode是什么？ 虚拟DOM?
Vue在页面上渲染的结点，及其子节点称为“虚拟结点Virtual Node”，简写为“VNode”。“虚拟DOM”是由Vue组件树建立起来的整个VNode数的称呼

---

## Vue项目性能优化
1. v-if和v-for区分使用场景
2. computed和method区分使用场景
3. v-for遍历必须为item添加key，且避免同时使用v-if
4. 懒加载
5. 事件的销毁
6. 第三方库按需导入
7. SPA页面采用keep-alive缓存组件
8. 路由懒加载，组件的延迟加载，可以把页面资源划分为多分，用到的时候才会按需加载，减少第一次加载的消耗
9. 对于短时间的大量操作（缩放、滚动）使用防抖、节流函数
10. 代码精简，去除console，封装复用
11. 尽量避免行内样式，避免DOM重绘
12. key保证唯一性
13. 根据情况选用v-if代替v-show
14. 服务端渲染SSR

---

## 在vue.js中循环插入图片
v-bind：src

---

## 如何解决数据层级结构太深的问题
手动定义 用vm.$set("demo", a.b.c.d) 替换 < span v-text = "a.b.c.d" >

---

## v-model的原理
v-model本质是一种语法糖，为不同的输入元素和使用不同的属性并抛出不同的事件

---

## 会被vue拦截到的数组方法及不能拦截到的方法
会：push(), pop(), shift(), unshift(), splice(), sort(), reverse() 会检测变动，进行页面更新
不会：filter(), concat(), slice(), map(), 
Vue.set/this.$set 强制更新

---

## Vue初始化过程中（new Vue(options)）都做了什么


---

## vue中data的属性可以和methods中的方法同名吗？
可以同名，methods的方法会被data的属性覆盖
源码定义的initState函数内部执行的循序：props > methods > data > computed > watch

---

## Vue的异步更新机制是如何实现的


---

## 自定义指令
1. 自定义指令的生命周期，5个事件钩子
- bind：只能调用一次，指令第一次绑定到元素时使用，改函数可以定义在一个绑定执行一次的初始化动作
- inserted：被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）
- update：被绑定元素所在的模板更新时调用，而不论绑定之是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
- componentUpdated：被绑定元素所在的模板完成一次更新周期时调用
- unbind：只调用一次，指令与元素解绑时调用

2. 钩子函数参数
- el：指令所绑定的元素，可以用来直接操作DOM
- binding：一个对象，包含以下属性：
   - name：指令名
   - value：指令的绑定值
   - oldValue：指定绑定的前一个值
   - expression：绑定值的字符串形式
   - arg：传给指令的参数
   - modifiers：一个包含修饰符的对象
- Vnode：vue编译生成的虚拟节点
- oldVnode：上一个虚拟节点，仅在update和componentUpdate钩子中使用

---

## vue动态组件
动态组件就是几个组件放在一个挂在点下，然后根据父组件的某个变量来而决定显示

``` HTML
<div id="app">
  <component is="one"></component>
</div>

new Vue({
  el: '#app',
  component: {
    one: {template: '<div>线路一</div>'},
    two: {template: '<div>线路二</div>'},
    thr: {template: '<div>线路三</div>'},
  }
})
```

---

## vue如何快速定位那个组件出现性能问题的
timeline工具。用过timeline来查看每个函数的调用时常，定位成哪个函数的问题

---

## vue为什么要使用异步组件
组件功能越多打包出的结果也越大，这种情况渲染速度会变慢。而异步组件的核心是把组件定义成一个函数，主要依赖import()这个语法，从而实现文件的分割加载

---

## vue的更新和渲染过程
- 渲染
  1. 把模板解析为render函数
  2. 触发响应式，监听data属性getter，setter
  3. 执行render函数，生成vnode，patch（elem，vnode）

- 更新
  1. getter监听数据变化，触发setter进行data修改
  2. 重新执行render函数，生成new Vnode
  3. patch (vnode，newVnode)

---

## 子组件里可以修改父组件的值吗
- 对象和数组可以，因为二者都是引用类型，父组件传过来的是一个地址，子组件修改的时地址里面的内容，地址本身不产生变化，所以不会报错。
- 基础类型则不行，因为直接修改了传递的值，所以vue不允许在子组件中直接修改prop值，会报错

---

## template模板引擎的渲染过程
template作用时模板占位符，可以包裹元素，循环过程中template不会被渲染到页面上

在vue实例初始化$mount的时候，先调用render函数，如果render函数不存在，则调用template进行编译得到render函数，如果没有template则会调用el来获取template

**渲染过程**:
1. 获取模板，并将模板通过compile编译器（通过正则等方式解析template里面的指令，class、style等）编译成AST语法树
2. 把得到的AST通过generate转化成render渲染函数，render函数返回值是vdom
3. vue构造函数直接使用render渲染函数渲染dom

简而言之，就是先转化成 AST 树，再得到的 render 函数返回 VNode（Vue 的虚拟 DOM 节点），详细步骤如下：
首先，通过 compile 编译器把 template 编译成 AST 语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile 是 createCompiler 的返回值，createCompiler 是用以创建编译器的。另外 compile 还负责合并 option。
然后，AST 会经过 generate（将 AST 语法树转化成 render funtion 字符串的过程）得到 render 函数，render 的返回值是 VNode，VNode 是 Vue 的虚拟 DOM 节点，里面有（标签名、子节点、文本等等）

---
## vue 如何监听对象或者数组某个属性的变化
当在项目中直接设置数组的某一项的值，或者直接设置对象的某个属性值，这个时候，你会发现页面并没有更新。这是因为 Object.defineProperty () 限制，监听不到变化。

解决方式：
this.$set (你要改变的数组 / 对象，你要改变的位置 /key，你要改成什么 value)
this.$set(this.arr, 0, "OBKoro1"); // 改变数组
this.$set(this.obj, "c", "OBKoro1"); // 改变对象

或者调用以下几个数组的方法
splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
vue 源码里缓存了 array 的原型链，然后重写了这几个方法，触发这几个方法的时候会 observer 数据，意思是使用这些方法不用我们再进行额外的操作，视图自动进行更新。 推荐使用 splice 方法会比较好自定义，因为 splice 可以在数组的任何位置进行删除 / 添加操作

---
## assets 和 static 的区别
这两个都是用来存放项目中所使用的静态资源文件。
两者的区别：
- assets 中的文件在运行 npm run build 的时候会打包，简单来说就是会被压缩体积，代码格式化之类的。打包之后也会放到 static 中。
- static 中的文件则不会被打包。
- 建议：将图片等未处理的文件放在 assets 中，打包减少体积。而对于第三方引入的一些资源文件如 iconfont.css 等可以放在 static 中，因为这些文件已经经过处理了。

---
## vue 初始化页面闪动问题
使用 vue 开发时，在 vue 初始化之前，由于 div 是不归 vue 管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于`{{message}}` 的字样，虽然一般情况下这个时间很短暂，但是我们还是有必要让解决这个问题的。
首先：在 css 里加上以下代码
[v-cloak] {
    display: none;
}

---
## vue如何获取DOM
先给标签设置一个 ref 值，再通过 this.$refs.domName 获取，例如：
``` html
<div ref="test"></div>
const dom = this.$refs.test
```
首先ref的引用是相当于一个DOM节点（如果是子组件则指向的是其实例），而且是一个string类型的值。
通俗的将就类似于原生js用document.getElementById("#id")
但是只是类似，他们的不同点是Vue是操控虚拟DOM ，也就是说在渲染初期并没有这个ref的属性，这个属性是在创建Vue实例以后才被加到虚拟DOM中的。所以在官方文档的最后提醒开发者不能将ref的结果在模版中进行数据绑定

this.$refs是什么呢？
通俗的将就是搜集所有的ref的一个对象。通过this.$refs 可以访问到此vue实例中的所有设置了ref属性的DOM元素，并对其进行操作。
其实组件中的子组件的ref原理也类似，只是指向的不是原组件而是组件的实例。
用法和普通DOM元素一样。

--- 
## 请说下封装 vue 组件的过程
首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。
然后，使用 Vue.extend 方法创建一个组件，然后使用 Vue.component 方法注册组件。子组件需要数据，可以在 props 中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用 emit 方法。

---
## v-on 可以监听多个方法吗？
是可以的，来个例子：
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur, }">

---
## 20.computed 中的属性名和 data 中的属性名可以相同吗？
不能同名，因为不管是 computed 属性名还是 data 数据名还是 props 数据名都会被挂载在 vm 实例上，因此这三个都不能同名。

---
## 怎么强制刷新组件？
this.$forceUpdate()。
组件上加上 key，然后变化 key 的值。

---
## 怎么访问子组件的实例或者子元素？
先用 ref 特性为子组件赋予一个 ID 引用 <base-input ref="myInput"></<base-input>

比如子组件有个 focus 的方法，可以这样调用 this.$refs.myInput.focus()；
比如子组件有个 value 的数据，可以这样使用 this.$refs.myInput.value。
先用 ref 特性为普通的 DOM 元素赋予一个 ID 引用
``` html
<ul ref="mydiv">
    <li class="item">第一个li</li>
    <li class="item">第一个li</li>
</ul>
console.log(this.$refs['mydiv'].getElementsByClassName('item')[0].innerHTML)//第一个li
```

---
## 怎么在子组件中访问父组件的实例？怎么在组件中访问到根实例？
使用 this.$parent 来访问
this.$root

---
## 组件会在什么时候下被销毁？
- 没有使用 keep-alive 时的路由切换；
- v-if='false'；
- 执行 vm.$destroy()；

---
## is 这个特性你有用过吗？主要用在哪些方面？
动态组件
`<component :is="componentName"></component>`， componentName 可以是在本页面已经注册的局部组件名和全局组件名，也可以是一个组件的选项对象。 当控制 componentName 改变时就可以动态切换选择组件。
is 的用法
有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。
而有些 HTML 元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。
``` html
<ul>
    <card-list></card-list>
</ul>
```
所以上面 `<card-list></card-list>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。应该这么写：
``` html
<ul>
    <li is="cardList"></li>
</ul>
```
---
## prop 验证的 type 类型有哪几种？
String、Number、Boolean、Array、Object、Date、Function、Symbol， 此外还可以是一个自定义的构造函数 Personnel，并且通过 instanceof 来验证 propwokrer 的值是否是通过这个自定义的构造函数创建的。
``` javascript
function Personnel(name,age){
    this.name = name;
    this.age = age;
}
export default {
    props:{
        wokrer:Personnel
    }
}
```
---
## 在 Vue 事件中传入 $event ，使用 $event.target和 event.currentTarget 有什么区别？
$event.currentTarget 始终指向事件所绑定的元素，而 $event.target 指向事件发生时的元素。

---
## 使用事件修饰符要注意什么？
要注意顺序很重要，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击。

---
## 说说你对 Vue 的表单修饰符.lazy 的理解？
input 标签 v-model 用 lazy 修饰之后，并不会立即监听 input 的 value 的改变，会在 input 失去焦点之后，才会监听 input 的 value 的改变。

---
## v-once 的使用场景有哪些？
其作用是只渲染元素和组件一次。随后的重新渲染，元素 / 组件及其所有的子节点将被视为静态内容并跳过。故当组件中有大量的静态的内容可以使用这个指令。

---
## v-cloak 和 v-pre 有什么作用？
v-cloak：可以解决在页面渲染时把未编译的 Mustache 标签（`{{value}}`）给显示出来。
```
[v-cloak] {
    display: none!important;
}
<div v-cloak>
    {{ message }}
</div>
```
v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
```
<span v-pre>{{ this will not be compiled }}</span>
```

---
## 怎么使 css 样式只在当前组件中生效？在 style 上加 scoped 属性需要注意哪些？你知道 style 上加 scoped 属性的原理吗？
<style lang="less" scoped> </style>
如果在公共组件中使用，修改公共组件的样式需要用 /deep/。
vue 通过在 DOM 结构以及 css 样式上加上唯一的标记 data-v-xxxxxx，保证唯一，达到样式私有化，不污染全局的作用。

---
## Vue 渲染模板时怎么保留模板中的 HTML 注释呢？
在组件中将 comments 选项设置为 true
`<template comments> ... <template>`

---
## Vue 中怎么重置 data？
Object.assign(this.$data,this.$options.data())

---
## 过滤器中可以用 this 吗？
不可以

---
## Vue在created和mounted这两个生命周期中请求数据有什么区别呢？
在created中，页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态，DOM节点没出来，无法操作DOM节点。在mounted不会这样，比较好。

---
## 说说你对keep-alive的理解
keep-alive是一个抽象组件：它自身不会渲染一个DOM元素，也不会出现在父组件链中；使用keep-alive包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
其有三个参数

include定义缓存白名单，会缓存的组件；
exclude定义缓存黑名单，不会缓存的组件；
以上两个参数可以是逗号分隔字符串、正则表达式或一个数组,include="a,b"、:include="/a|b/"、:include="['a', 'b']"；
匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配；
max最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉；
不会在函数式组件中正常工作，因为它们没有缓存实例；
当组件在内被切换，它的activated和deactivated这两个生命周期钩子函数将会被对应执行。

---
## v-if和v-for的优先级是什么？如果这两个同时出现时，那应该怎么优化才能得到更好的性能？
当它们处于同一节点，v-for的优先级比v-if更高，这意味着v-if将分别重复运行于每个v-for循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用。
``` html
<ul>
    <li v-for="item in items" v-if="item.show">{{item}}</li>
</ul>
```
如果你的目的是有条件地跳过循环的执行，那么可以将 v-if 置于外层元素 (或 <template>)上。
``` html
<ul v-if="items.length">
    <li v-for="item in items">{{item}}</li>
</ul>
```

---
## 使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？
按 Object.keys() 的顺序的遍历，转成数组保证顺序。

---
## key除了在v-for中使用，还有什么作用？
还可以强制替换元素/组件而不是重复使用它。在以下场景可以使用
完整地触发组件的生命周期钩子
触发过渡
```
<transition>
  <span :key="text">{{ text }}</span>
</transition>
```
当 text 发生改变时，`<span`>会随时被更新，因此会触发过渡。

---
## 使用key要什么要注意的吗？
不要使用对象或数组之类的非基本类型值作为key，请用字符串或数值类型的值；
不要使用数组的index作为key值，因为在删除数组某一项，index也会随之变化，导致key变化，渲染会出错。
例：在渲染[a,b,c]用 index 作为 key，那么在删除第二项的时候，index 就会从 0 1 2 变成 0 1（而不是 0 2)，随之第三项的key变成1了，就会误把第三项删除了。

---
## 说说组件的命名规范
给组件命名有两种方式，一种是使用链式命名my-component，一种是使用大驼峰命名MyComponent，
在字符串模板中<my-component></my-component> 和 <MyComponent></MyComponent>都可以使用，
在非字符串模板中最好使用<MyComponent></MyComponent>，因为要遵循W3C规范中的自定义组件名
(字母全小写且必须包含一个连字符)，避免和当前以及未来的 HTML 元素相冲突。

---
## 为什么组件中data必须用函数返回一个对象？
对象为引用类型，当重用组件时，由于数据对象都指向同一个data对象，当在一个组件中修改data时，其他重用的组件中的data会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object的实例），引用地址不同，则不会出现这个问题。

---
## 组件的name选项有什么作用？
递归组件时，组件调用自身使用；
用is特殊特性和component内置组件标签时使用；
keep-alive内置组件标签中include 和exclude属性中使用。

---
## 说下$attrs和$listeners的使用场景？
$attrs: 包含了父作用域中（组件标签）不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。 在创建基础组件时候经常使用，可以和组件选项inheritAttrs:false和配合使用在组件内部标签上用v-bind="$attrs"将非prop特性绑定上去；
$listeners: 包含了父作用域中（组件标签）的 (不含.native) v-on 事件监听器。 在组件上监听一些特定的事件，比如focus事件时，如果组件的根元素不是表单元素的，则监听不到，那么可以用v-on="$listeners"绑定到表单元素标签上解决。

## EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
在有使用$on的组件中要在beforeDestroy钩子函数中用$off销毁。

## Vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
要，不然会造成多次绑定和内存泄露。

## Vue组件里的定时器要怎么销毁？
如果页面上有很多定时器，可以在data选项中创建一个对象timer，给每个定时器取个名字一一映射在对象timer中，在beforeDestroy构造函数中for(let k in this.timer){clearInterval(k)}；
如果页面只有单个定时器，可以这么做。
const timer = setInterval(() =>{}, 500);
this.$once('hook:beforeDestroy', () => {
   clearInterval(timer);
})

---
## Vue中能监听到数组变化的方法有哪些？为什么这些方法能监听到呢？
push()、pop()、shift()、unshift()、splice()、sort()、reverse()，这些方法在Vue中被重新定义了，故可以监听到数组变化；
filter()、concat()、slice()，这些方法会返回一个新数组，也可以监听到数组的变化。

---
## 在Vue中哪些数组变化无法监听，为什么，怎么解决？
利用索引直接设置一个数组项时；第一个情况，利用已有索引直接设置一个数组项时Object.defineProperty()是可以监听到，利用不存在的索引直接设置一个数组项时Object.defineProperty()是不可以监听到，但是官方给出的解释是由于JavaScript的限制，Vue不能检测以上数组的变动，其实根本原因是性能问题，性能代价和获得的用户体验收益不成正比。
用this.$set(this.items, indexOfItem, newValue)或this.items.splice(indexOfItem, 1, newValue)来解决第一种情况；

修改数组的长度时。第二个情况，原因是Object.defineProperty()不能监听到数组的length属性。
用this.items.splice(newLength)来解决第二种情况。

---
## 在Vue中哪些对象变化无法监听，为什么，怎么解决？
对象属性的添加 用this.$set(this.obj,"key","newValue")来解决第一种情况；
对象属性的删除 用Object.assign来解决第二种情况。
因为Vue是通过Object.defineProperty来将对象的key转成getter/setter的形式来追踪变化，但getter/setter只能追踪一个数据是否被修改，无法追踪新增属性和删除属性，所以才会导致上面对象变化无法监听。

---
## 删除对象用delete和Vue.delete有什么区别？
delete：只是被删除对象成员变为' '或undefined，其他元素键值不变；
Vue.delete：直接删了对象成员，如果对象是响应式的，确保删除能触发更新视图，这个方法主要用于避开 Vue 不能检测到属性被删除的限制。

---
## `<template></template>`有什么用？
当做一个不可见的包裹元素，减少不必要的DOM元素，整个结构会更加清晰。

---
## Vue怎么定义全局方法
有三种
1. 挂载在Vue的prototype上
``` javascript
// base.js
const install = function (Vue, opts) {
    Vue.prototype.demo = function () {
        console.log('我已经在Vue原型链上')
    }
}
export default {
    install
}

//main.js
//注册全局函数
import base from 'service/base';
Vue.use(base);
```

2. 利用全局混入mixin

3. 用`this.$root.$on`绑定方法，用`this.$root.$off`解绑方法，用`this.$root.$emit`全局调用。
``` javascript
this.$root.$on('demo',function(){
    console.log('test');
})
this.$root.$emit('demo')；
this.$root.$off('demo')；
```
---
## Vue怎么改变插入模板的分隔符？
用delimiters选项,其默认是["{{", "}}"]

// 将分隔符变成ES6模板字符串的风格
new Vue({
  delimiters: ['${', '}']
})

---
## Vue变量名如果以_、$开头的属性会发生什么问题？怎么访问到它们的值？
以 _ 或 $ 开头的属性 不会 被 Vue 实例代理，因为它们可能和 Vue 内置的属性、API 方法冲突，你可以使用例如 vm.$data._property 的方式访问这些属性。

---
## 怎么捕获Vue组件的错误信息？
errorCaptured是组件内部钩子，当捕获一个来自子孙组件的错误时被调用，接收error、vm、info三个参数，return false后可以阻止错误继续向上抛出。

errorHandler为全局钩子，使用Vue.config.errorHandler配置，接收参数与errorCaptured一致，2.6后可捕捉v-on与promise链的错误，可用于统一错误处理与错误兜底。

---
## 60.Vue.observable你有了解过吗？说说看
让一个对象可响应。可以作为最小化的跨组件状态存储器。

---
## Vue项目中如何配置favicon？
静态配置 `<link rel="icon" href="<%= BASE_URL %>favicon.ico">`, 其中`<%= BASE_URL %>`等同vue.config.js中publicPath的配置;
动态配置 `<link rel="icon" type="image/png" href="">`
``` javascript
import browserImg from 'images/kong.png';//为favicon的默认图片
const imgurl ='后端传回来的favicon.ico的线上地址'
let link = document.querySelector('link[type="image/png"]');
if (imgurl) {
    link.setAttribute('href', imgurl);
} else {
    link.setAttribute('href', browserImg);
}
```

---
## 怎么修改Vue项目打包后生成文件路径？
在Vue CLI2中修改config/index.js文件中的build.assetsPublicPath的值；
在Vue CLI3中配置publicPath的值。

---
## 怎么解决Vue项目打包后静态资源图片失效的问题？
在项目中一般通过配置alias路径别名的方式解决,下面是Vue CLI3的配置。
``` javascript
configureWebpack: {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'assets': resolve('src/assets'),
            'css': resolve('src/assets/css'),
            'images': resolve('src/assets/images'),
        }
    },
},
```
---
## 怎么解决Vue中动态设置img的src不生效的问题？
因为动态添加src被当做静态资源处理了，没有进行编译，所以要加上require。
``` javascript
<template>
    <img class="logo" :src="logo" alt="公司logo">
</template>
<script>
export default {
    data() {
        return {
            logo:require("assets/images/logo.png"),
        };
    }
};
</script>
```
---
## 在Vue项目中如何引入第三方库（比如jQuery）？有哪些方法可以做到？
先在主入口页面 index.html 中用 script 标签引入`< script src="./static/jquery-1.12.4.js"></ script>`,如果你的项目中有用ESLint检测，会报'$' is not defined，要在文件中加上/* eslint-disable */
先在主入口页面 index.html 中用 script 标签引入`< script src="./static/jquery-1.12.4.js"></ script>`,然后在webpack 中配置一个 externals，即可在项目中使用。
``` JavaScript
externals: {
    'jquery': 'jQuery'
}
```
先在webpack中配置alias，最后在main.js中用import $ from 'jquery'，即可在项目中使用。
``` JavaScript
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        '@': resolve('src'),
        'jquery': resolve('static/jquery-1.12.4.js')
    }
}
```
在webpack中新增一个plugins，即可在项目中使用
``` javascript
plugins: [
         new webpack.ProvidePlugin({
             $:"jquery",
             jQuery:"jquery",
             "windows.jQuery":"jquery"
         })
     ]
```
---
## 说说你对SPA单页面的理解，它的优缺点分别是什么？
是一种只需要将单个页面加载到服务器之中的web应用程序。当浏览器向服务器发出第一个请求时，服务器会返回一个index.html文件，它所需的js，css等会在显示时统一加载，部分页面按需加载。url地址变化时不会向服务器在请求页面，通过路由才实现页面切换。
**优点**：
良好的交互体验，用户不需要重新刷新页面，获取数据也是通过Ajax异步获取，页面显示流畅；
良好的前后端工作分离模式。
**缺点**：
SEO难度较高，由于所有的内容都在一个页面中动态替换显示，所以在SEO上其有着天然的弱势。
首屏加载过慢（初次加载耗时多）

---
## SPA单页面的实现方式有哪些？
在hash模式中，在window上监听hashchange事件（地址栏中hash变化触发）驱动界面变化；
在history模式中，在window上监听popstate事件（浏览器的前进或后退按钮的点击触发）驱动界面变化，监听a链接点击事件用history.pushState、history.replaceState方法驱动界面变化；
直接在界面用显示隐藏事件驱动界面变化。

---
## 说说你对Object.defineProperty的理解
Object.defineProperty(obj,prop,descriptor)方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

obj：要在其上定义属性的对象。
prop：要定义或修改的属性的名称。
descriptor：将被定义或修改的属性描述符。
descriptor属性描述符主要有两种形式：数据描述符和存取描述符。

描述符必须是这两种形式之一；不能同时是两者。

数据描述符和存取描述符共同拥有
configurable：特性表示对象的属性是否可以被删除，以及除value和writable特性外的其他特性是否可以被修改。默认为false。
enumerable：当该属性的enumerable为true时，该属性才可以在for…in循环和Object.keys()中被枚举。默认为false。
数据描述符
value：该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。默认为undefined。
writable：当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为false。
存取描述符
get：一个给属性提供 getter的方法，如果没有getter则为undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象（由于继承关系，这里的this并不一定是定义该属性的对象）。默认为undefined。
set：一个给属性提供 setter的方法，如果没有setter则为undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。默认为undefined。
定义descriptor时，最好先把这些属性都定义清楚，防止被继承和继承时出错。
``` javascript
function Archiver() {
    var temperature = null;
    var archive = [];
    Object.defineProperty(this, 'temperature', {
        get: function() {
          console.log('get!');
          return temperature;
        },
        set: function(value) {
          temperature = value;
          archive.push({ val: temperature });
        }
    });
    this.getArchive = function() { return archive; };
}
var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
```

---
## 说说你对Proxy的理解
官方定义：proxy对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。
通俗来说是在对目标对象的操作之前提供了拦截，对外界的操作进行过滤和修改某些操作的默认行为，可以不直接操作对象本身，而是通过操作对象的代理对象来间接来操作对象。
`let proxy = new Proxy(target, handler)`
target 是用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）;
handler 一个对象，其属性是当执行一个操作时定义代理的行为的函数，也就是自定义的行为。
handle可以为{}，但是不能为null，否则会报错

Proxy 目前提供了 13 种可代理操作，比较常用的
handler.get(target,property,receiver)获取值拦截
handler.set(target,property,value,receiver)设置值拦截
handler.has(target,prop)in 操作符拦截
``` javascript
let obj = {
	a : 1,
	b : 2
}
let test = new Proxy(obj,{
    get : function (target,property) {
        return property in target ? target[property] : 0
    },
    set : function (target,property,value) {
        target[property] = 6;
    },
    has: function (target,prop){
        if(prop == 'b'){
            target[prop] = 6;
        }
        return prop in target;
    },
})

console.log(test.a);        // 1
console.log(test.c);        // 0

test.a = 3;
console.log(test.a)         // 6

if('b' in test){
    console.log(test)       // Proxy {a: 6, b: 6}
}
```
---
## Object.defineProperty和Proxy的区别
- Object.defineProperty
不能监听到数组length属性的变化；
不能监听对象的添加；
只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。

- Proxy
可以监听数组length属性的变化；
可以监听对象的添加；
可代理整个对象，不需要对对象进行遍历，极大提高性能；
多达13种的拦截远超Object.defineProperty只有get和set两种拦截。

---
## Vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解?
采用的是Mustache的web模板引擎mustache.js
``` html
<script type="text/javascript" src="./mustache.js"></script>
<script type="text/javascript">
    var data = {
        "company": "Apple",
    }

    var tpl = '<h1>Hello {{company}}</h1>';
    var html = Mustache.render(tpl, data);

    console.log(html);
</script>
```

---
## 你认为Vue的核心是什么？
Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统。

---
## 说说你对单向数据流和双向数据流的理解
单向数据流是指数据只能从父级向子级传递数据，子级不能改变父级向子级传递的数据。
双向数据流是指数据从父级向子级传递数据，子级可以通过一些手段改变父级向子级传递的数据。
比如用v-model、.sync来实现双向数据流。

---
## 什么是虚拟DOM？
虚拟DOM是将状态映射成视图的众多解决方案中的一种，其是通过状态生成一个虚拟节点树，然后使用虚拟节点树进行渲染生成真实DOM，在渲染之前，会使用新生成的虚拟节点树和上一次虚拟节点树进行对比，只渲染不同的部分。

---
## Vue中如何实现一个虚拟DOM？说说你的思路
首先要构建一个VNode的类，DOM元素上的所有属性在VNode类实例化出来的对象上都存在对应的属性。例如tag表示一个元素节点的名称，text表示一个文本节点的文本，chlidren表示子节点等。将VNode类实例化出来的对象进行分类，例如注释节点、文本节点、元素节点、组件节点、函数式节点、克隆节点。

然后通过编译将模板转成渲染函数render，执行渲染函数render，在其中创建不同类型的VNode类，最后整合就可以得到一个虚拟DOM（vnode）。

最后通过patch将vnode和oldVnode进行比较后，生成真实DOM。

---
## Vue为什么要求组件模板只能有一个根元素？
当前的virtualDOM差异和diff算法在很大程度上依赖于每个子组件总是只有一个根元素。

---
## axios是什么？怎样使用它？怎么解决跨域的问题？
axios 是一个基于 promise 的 HTTP 库，先封装在使用。
使用proxyTable配置解决跨域问题。
比如你要调用http://172.16.13.205:9011/getList这个接口

先在axios.create()配置baseURL增加标志
``` javascript
const service = axios.create({
  baseURL: '/api',
});

service.get(getList, {params:data});
```
然后在config/index.js文件中配置
``` javascript
dev:{
    proxyTable: {
        '/api': {
            target: 'http://172.16.13.205:9011', // 设置你调用的接口域名和端口号
            secure: false,
            changeOrigin: true,// 跨域
            pathRewrite: {
                '^/api': '' // 去掉标志
            }
        }
    },
}
```
配置后要重新npm run dev
F12中看到请求是http://localhost:8080/api/getList，实际上请求是http://172.16.13.205:9011/getList。

---
## 如果想扩展某个现有的Vue组件时，怎么做呢？
用mixins混入
用extends，比mixins先触发
用高阶组件HOC封装

---
## vue-loader是什么？它有什么作用？
vue-loader是一个webpack的loader，是一个模块转换器，用于把模块原内容按照需求转换成新内容。
它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件。可以解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的loader去处理。

---
## 你有使用过JSX吗？说说你对JSX的理解？
JSX就是Javascript和XML结合的一种格式。React发明了JSX，利用HTML语法来创建虚拟DOM。当遇到<，JSX就当HTML解析，遇到{就当JavaScript解析。