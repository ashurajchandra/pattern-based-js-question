function MyPromise(executor) {
  this.state = "PENDING";
  this.value = undefined;
  this.handlers = [];
  const resolve = (value) => {
    if (this.state === "PENDING") {
      this.state = "FULFILLED";
      this.value = value;
      this.handlers.forEach((handler) => handler.onFulfilled(value));
    }
  };
  const reject = (reason) => {
    if (this.state === "PENDING") {
      this.state = "REJECTED";
      this.value = reason;
      this.handlers.forEach((handler) => handler.onRejected(reason));
    }
  };
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  return new MyPromise((resolve, reject) => {
    const handle = () => {
      try {
        if (this.state === "FULFILLED") {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(this.value);
            resolve(result);
          } else {
            resolve(this.value);
          }
        } else if (this.state === "REJECTED") {
          if (typeof onRejected === "function") {
            const result = onRejected(this.value);
            resolve(result);
          } else {
            reject(this.value);
          }
        }
      } catch (error) {
        reject(error);
      }
    };
    if (this.state === "PENDING") {
      this.handlers.push({ onFulfilled: handle, onRejected: handle });
    } else {
      setTimeout(handle, 0);
    }
  });
};
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => resolve(value));
};
MyPromise.reject = function (reason) {
  return new MyPromise((_, reject) => reject(reason));
};
MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }
    const results = new Array(promises.length);
    let completed = 0;
    promises.forEach((promise, index) => {
      MyPromise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      MyPromise.resolve(promise).then(resolve).catch(reject);
    });
  });
};
