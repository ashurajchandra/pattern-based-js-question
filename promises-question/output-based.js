// What's the output?
const promise = new Promise((resolve, reject) => {
    console.log("Inside Promise");
    resolve("Success");
});
console.log("After Promise");


// What's the output and execution order?
Promise.resolve(1)
    .then(x => {
        console.log(x);
        return x + 1;
    })
    .then(x => {
        console.log(x);
        throw new Error("Something went wrong");
    })
    .then(x => {
        console.log("This won't run");
    })
    .catch(err => {
        console.log("Caught:", err.message);
        return 10;
    })
    .then(x => {
        console.log("Final:", x);
    });

    //1,2,caught,final: 10

    // What happens here? all vs allSettled
const p1 = Promise.resolve(1);
const p2 = Promise.reject("Error");
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3]).then(console.log).catch(console.log);
Promise.allSettled([p1, p2, p3]).then(console.log);


// What's the output? promise.race
const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 200));
const error = new Promise((_, reject) => setTimeout(() => reject("Error race"), 50));

Promise.race([fast, slow, error]).then(console.log).catch(console.log);

// What's the output and why?
console.log("p1 1");

const promise1 = new Promise((resolve) => {
    console.log("p1 2");
    resolve();
    console.log("p1 3");
});

promise1.then(() => {
    console.log("p1 4");
});

console.log("p1 5");

// What's the execution order?
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
    return Promise.resolve();
}).then(() => console.log("Promise 2"));

setTimeout(() => console.log("Timeout 2"), 0);

console.log("End");

//start, end, promise1, promise2, timeout1, timeout2
    