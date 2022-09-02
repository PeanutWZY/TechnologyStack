https://juejin.cn/post/6850037281206566919

## 基础版
``` javascript
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks= [];

    let resolve = (value) => {
      if(this.status ===  PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    } 

    let reject = (reason) => {
      if(this.status ===  PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    }

    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      });

      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onRejectedCallbacks.push(()=> {
        onRejected(this.reason);
      })
    }
  }
}

```


## then 的链式调用&值穿透特性
``` javascript
class MyPromise {
    constructor(executor) {
      this.state = 'pending'    // 初始化状态
      this.value = null         // 初始化resolve的值
      this.reason = null        // 初始化reject的结果
      this.callbacks = []       // 定义回调
    //   executor成功后处理方法
      const resolve = value => {
        if (this.state !== 'pending') return
        this.state = 'fulfilled'
        this.value = value
        this.callbacks.forEach(callback => callback.fulfilled(value))
      }
    //   executor失败后处理方法
      const reject = reason => {
        if (this.state !== 'pending') return
        this.state = 'rejected'
        this.reason = reason
        this.callbacks.forEach(callback => callback.rejected(reason))
      }
      try {
        executor(resolve, reject)
      } catch (error) {
        reject(error)
      }
    }
    // 定义then方法
    then(onFulfilled, onRejected) {
        // 如果onFulfilled或onRejected不是函数时，就忽略他们，直接赋值（来自Promise/A+ 2.2规定）
      if(typeof onFulfilled !== 'function') onFulfilled = value => value
      if(typeof onRejected !== 'function') onRejected = reason => { throw reason }

      let promise = new MyPromise((resolve, reject) => {
        if (this.state === 'fulfilled') {
          setTimeout(() => {
            try {
              this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
        }
        if (this.state === 'rejected') {
          setTimeout(() => {
            try {
              this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        }
        if (this.state === 'pending') {
          this.callbacks.push({
            fulfilled: () => {
              setTimeout(() => {
                try {
                  this.resolvePromise(promise, onFulfilled(this.value), resolve, reject)
                } catch (error) {
                  reject(error)
                }
              })
            },
            rejected: () => {
              setTimeout(() => {
                try {
                  this.resolvePromise(promise, onRejected(this.reason), resolve, reject)
                } catch (error) {
                  reject(error)
                }
              })
            }
          })
        }
      })
      return promise
    }
    resolvePromise(promise, result, resolve, reject) {
      if (promise === result) reject(new TypeError('Chaining cycle detected for promise'))
      if (result && typeof result === 'object' || typeof result === 'function') {
        let called
        try {
          let then = result.then
          if (typeof then === 'function') {
            then.call(result, value => {
              if (called) return
              called = true
              this.resolvePromise(promise, value, resolve, reject)
            }, reason => {
              if (called) return
              called = true
              reject(reason)
            })
          } else {
            if (called) return
            called = true
            resolve(result)
          }
        } catch (error) {
          if (called) return
          called = true
          reject(error)
        }
      } else {
        resolve(result)
      }
    }
  }
```


## promise.all
``` javascript
// 输入不仅仅只有Array
function promiseAll (args) {
  return new Promise((resolve, reject) => {
    const promiseResults = [];
    let iteratorIndex = 0;
    // 已完成的数量，用于最终的返回，不能直接用完成数量作为iteratorIndex
    // 输出顺序和完成顺序是两码事
    let fullCount = 0;
    // 用于迭代iterator数据
    for (const item of args) {
      // for of 遍历顺序，用于返回正确顺序的结果
      // 因iterator用forEach遍历后的key和value一样，所以必须存一份for of的 iteratorIndex
      let resultIndex = iteratorIndex;
      iteratorIndex += 1;
      // 包一层，以兼容非promise的情况
      Promise.resolve(item).then(res => {
        promiseResults[resultIndex] = res;
        fullCount += 1;
        // Iterator 接口的数据无法单纯的用length和size判断长度，不能局限于Array和 Map类型中
        if (fullCount === iteratorIndex) {
          resolve(promiseResults)
        }
      }).catch(err => {
        reject(err)
      })
    }
    // 处理空 iterator 的情况
    if(iteratorIndex===0){
      resolve(promiseResults)
    }
  }
  )
}
if (!Promise.all) Promise.all = promiseAll;

```