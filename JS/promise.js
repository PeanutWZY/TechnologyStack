// https://juejin.cn/post/6850037281206566919

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