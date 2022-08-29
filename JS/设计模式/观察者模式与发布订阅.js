/**
 * 观察者模式
 * 1. 被观察者拥有所有观察者的完整数组；2. 事件发布时，遍历这个观察者列表，通知每一个观察者 
**/
class Student{
  constructor(name){
    this.name = name
  }
  notice(msg){
    console.log(`我: ${this.name}, 收到了这条消息:${msg}`)
  }
}

class Teacher{
  constructor(){
    this.observer = []
  }
  addObserver(ob){
    this.observer.push(ob)
    return this
  }
  sentMsg(msg){
    this.observer.forEach(ele=>ele.notice(msg))
  }
}

let MissLiu = new Teacher()
let ZhangSan = new Student('张三')
let LiSi = new Student('李四')
let WangWu = new Student('王五')
MissLiu.addObserver(ZhangSan).addObserver(LiSi).addObserver(WangWu)
MissLiu.sentMsg('刘老师叫你们快做作业')

/**
 * 发布/订阅模式
 * 1. 订阅者提前订阅对应事件
 * 2. 事件发布时所有对应消息订阅回调全部执行
 */
class Manager{
  // 私有变量，所有消息的消息池
  messages = {'刘老师消息': []}

  // 订阅函数
  on(msgName, callback){
    if(this.messages[msgName]){
      // 如果有人订阅
      this.messages[msgName].push(callback)
    }else{
      // 如果暂时没有
      this.messages = [callback]
    }
  }
  // 发布函数
  emit(msgName, ...param){
    if(this.messages[msgName]){
      this.messages[msgName].forEach(callback=>{
        callback.call(this, ...param)
      })
    }
  }
}

let manager = new Manager()
manager.on('刘老师消息',(msg)=>{
  console.log(`张三收到了老师的消息：${msg}`)
})
manager.on('刘老师消息',(msg)=>{
  console.log(`李四收到了老师的消息：${msg}`)
})
manager.on('周老师消息',(msg)=>{
  console.log(`王五收到了老师的消息：${msg}`)
})

setTimeout(()=>{
  manager.emit('刘老师消息','快做作业！！！')
},3000)