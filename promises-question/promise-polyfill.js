

const STATES = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}

class CustomPromise {
     #state = STATES.PENDING;
     #value = undefined;
     #resolverHandlers = [];
     #rejectionHandlers = [];
    //executor function
    constructor(executorFn){
        //need to pass proper context to resolve/reject as this will get executed in different context
          this.resolve = this.#_resolve.bind(this);
          this.reject = this.#_reject.bind(this);
        try{
          //execute executor function
          executorFn(this.resolve, this.reject)   //executor function has resolve and reject as argument
        }catch(err){
           this.reject(err)
        }
    }

    #_resolve = (value) =>{
        //once promise state is changed from PENDING to either FullFilled/Rejected that it only one time change
    queueMicrotask(()=>{
        if(this.#state === STATES.PENDING){
            this.#value = value;
            this.#state = STATES.FULFILLED
            this.#resolverExecuterFn()
        }
    })

    }
    #_reject(reason){
     queueMicrotask(()=>{
        if(this.#state === STATES.PENDING){
            this.#state = STATES.REJECTED;
            this.#value = reason;
            this.#rejecterExecutorFn()
          }
     })

    }

    #resolverExecuterFn(){
        this.#resolverHandlers.forEach((handler)=>handler(this.#value))
        this.#resolverHandlers = []
     }

     #rejecterExecutorFn (){
        this.#rejectionHandlers.forEach((handler) =>handler(this.#value))
        this.#rejectionHandlers = []
     }

    then(resolverFn, rejectorFn){

        return new CustomPromise((resolve,reject)=>{

            const thenHandler = (result) =>{

                if(!resolverFn){
                   return  resolve(result)
                }

                const returned = resolverFn(result);

                if(returned instanceof CustomPromise){
                    try{
                      returned.then(resolve,reject)
                    }catch(err){
                      reject(err)
                    }
                }else{
                    resolve(returned)
                }

            }
            this.#resolverHandlers.push(thenHandler)

            const catchHandler = (result) =>{

                if(!rejectorFn){
                   return  resolve(result)
                }

                const returned = rejectorFn(result);

                if(returned instanceof CustomPromise){
                    try{
                      returned.then(resolve,reject)
                    }catch(err){
                      reject(err)
                    }
                }else{
                    resolve(returned)
                }

            }
            this.#rejectionHandlers.push(catchHandler)

            if(this.#state === STATES.FULFILLED){
                this.#resolverExecuterFn()

            }else if(this.#state === STATES.REJECTED){
               this.#rejecterExecutorFn()
            }
        })
    }

    catch(){
        this.then(null , rejectorFn)
    }

}


const init = () =>{
    return new CustomPromise ((resolve)=>resolve(10))
}

console.log("init", init())
init().then((value)=>console.log("value",value))