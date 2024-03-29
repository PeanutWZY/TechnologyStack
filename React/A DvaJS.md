# DvaJs
***dva = React-Router + Redux + Redux-saga***
[DvaJS原理](https://zhuanlan.zhihu.com/p/373201039)

---
## redux
1、定位：它是将flux和函数式编程思想结合在一起形成的架构；
2、思想：视图与状态是一一对应的；所有的状态，都保存在一个对象里面；
3、API：
**store**：就是一个数据池，一个应用只有一个；　　
**state**：一个 State 对应一个 View。只要 State 相同，View 就相同。
**action**：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置。
**dispatch**：它是view发出action的唯一方法；
**reducer**：view发出action后，state要发生变化，reducer就是改变state的处理层，它接收action和state，通过处理action来返回新的state；
**subscribe**：监听。监听state，state变化view随之改变；

---
## react-redux
1、定位：react-redux是为了让redux更好的适用于react而生的一个库，使用这个库，要遵循一些规范；
2、主要内容
UI组件：就像一个纯函数，没有state，不做数据处理，只关注view，长什么样子完全取决于接收了什么参数（props）
容器组件：关注行为派发和数据梳理，把处理好的数据交给UI组件呈现；React-Redux规定，所有的UI组件都由用户提供，容器组件则是由React-Redux自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。
**connect**：这个方法可以从UI组件生成容器组件；但容器组件的定位是处理数据、响应行为，因此，需要对UI组件添加额外的东西，即mapStateToProps和mapDispatchToProps，也就是在组件外加了一层state；
**mapStateToProps**：一个函数， 建立一个从（外部的）state对象到（UI组件的）props对象的映射关系。 它返回了一个拥有键值对的对象；
**mapDispatchToProps**：用来建立UI组件的参数到store.dispatch方法的映射。 它定义了哪些用户的操作应该当作动作，它可以是一个函数，也可以是一个对象。

以上，redux的出现已经可以使react建立起一个大型应用，而且能够很好的管理状态、组织代码，但是有个棘手的问题没有很好地解决，那就是异步；在react-redux中一般是引入middleware中间件来处理，redux-thunk

---
## redux-saga
1、定位：react中间件；旨在于更好、更易地解决异步操作（有副作用的action）,不需要像在react-redux上还要额外引入redux-thunk；redux-saga相当于在Redux原有数据流中多了一层，对Action进行监听，捕获到监听的Action后可以派生一个新的任务对state进行维护；
2、特点：通过 Generator 函数来创建，可以用同步的方式写异步的代码；
3、API：
**Effect**： 一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。所有的Effect 都必须被 yield 才会执行。
**put**：触发某个action，作用和dispatch相同；

---
## ！！！dva
1、定位：dva 首先是一个基于redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。dva = React-Router + Redux + Redux-saga；
2、核心：
State：一个对象，保存整个应用状态；
View：React 组件构成的视图层；
Action：一个对象，描述事件(包括type、payload)
connect 方法：一个函数，绑定 State 到 View
dispatch 方法：一个函数，发送 Action 到 State
3、model：dva 提供 app.model 这个对象，所有的应用逻辑都定义在它上面。
4、model内容：
**namespace**：model的命名空间；整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成；
**state**：该命名空间下的数据池；
**effects**：副作用处理函数；
**reducers**：等同于 redux 里的 reducer，接收 action，同步更新打state；
**subscriptions**：订阅信息；

dva 是基于现有应用架构 (redux + react-router + redux-saga 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。dva 实现上尽量不创建新语法，而是用依赖库本身的语法，比如 router 的定义还是用 react-router 的 JSX 语法的方式(dynamic config 是性能的考虑层面，之后会支持)。
他最核心的是提供了 app.model 方法，用于把 reducer, initialState, action, saga 封装到一起
