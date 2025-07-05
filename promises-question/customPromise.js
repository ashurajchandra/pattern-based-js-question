const STATES = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED'
}
class CustomPromise {
    #state= STATES.PENDING;
    #value = undefined;
    #resolverHandlers = [];
    #rejectionHandlers = []
  constructor(executorFn){
     this.resolve = this.#_resolve.bind(this);
     this.reject = this.#_reject.bind(this)
    try{
       executorFn(this.resolve, this.reject)
    }catch(err){
       this.reject(err)
    }
  }

  #_reject(reason){
    queueMicrotask(() => {
      if (this.#state === STATES.PENDING) {
        this.#value = reason;
        this.#state = STATES.REJECTED;
        this.#_executeRejecterHandlers()
      }
    })
  }

  #_resolve(value){
    queueMicrotask(()=>{
      if(this.#state === STATES.PENDING){
        this.#value = value;
        this.#state = STATES.FULFILLED;
        this.#_executeResolverHandlersFn()
      }
    })
  }
  #_executeResolverHandlersFn(){
      this.#resolverHandlers.forEach((handlers) => handlers(this.#value));
      this.#resolverHandlers =[];
  }

  #_executeRejecterHandlers() {
      this.#rejectionHandlers.forEach((handlers) => handlers(this.#value));
      this.#rejectionHandlers = [];
  }

  then(onSuccess, onFailure){

    return new CustomPromise((resolve,reject)=>{
      
      const thenHandler = (result) =>{
       
       if(!onSuccess){
        return resolve(result)
       }

       try{
        const returnedValue = onSuccess(result);
        if(returnedValue instanceof CustomPromise){
          returnedValue.then(resolve, reject)
        }else{
          return resolve(returnedValue)
        }
       }catch(err){
        return reject(err)
       }
      }
       
      const catchHandler = (result) => {

        if (!onFailure) {
          return reject(result)
        }

        try {
          const returnedValue = onFailure(result);
          if (returnedValue instanceof CustomPromise) {
            returnedValue.then(resolve, reject)
          } else {
            return resolve(returnedValue)
          }
        } catch (err) {
          return reject(err)
        }
      }

      this.#resolverHandlers.push(thenHandler);
      this.#rejectionHandlers.push(catchHandler);

      if(this.#state === STATES.FULFILLED){
        //run all then handlers paas current value and reset
        this.#_executeResolverHandlersFn()
      }else if(this.#state === STATES.REJECTED){
        //run all catchHandlers pass the value ans reset
         this.#_executeRejecterHandlers()
      }

    })
  }
  
  catch(onFailure){
    return this.then(null, onFailure)
  }


};