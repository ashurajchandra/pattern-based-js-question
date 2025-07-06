/* 

The Debounce technique allow us to “group” multiple sequential calls in a single one.

Imagine you are in an elevator. 
The doors begin to close, and suddenly another person tries to get on. T
he elevator doesn’t begin its function to change floors, the doors open again. 
Now it happens again with another person. 
The elevator is delaying its function (moving floors), but optimizing its resources.

Leading edge (or “immediate”)
You may find it irritating that the debouncing event waits before triggering the function execution, 
until the events stop happening so rapidly. 
Why not trigger the function execution immediately, 
so it behaves exactly as the original non-debounced handler? 
But not fire again until there is a pause in the rapid calls.
*/

/* Normal Debounce*/

function debounced(func, wait){
   let timerId = null

    return function(...args){
        clearTimeout(timerId)

        timerId = setTimeout(()=>{
         func.apply(this, args)
        },wait)
    }
}


/* 2. Leading edge debounce */

function leadingDebounce(func, wait, option = {leading:False}){
    let timerId = null;
    const {leading=false} = option;

    return function(...args){
        clearTimeout(timerId);

        const isLeading =  leading && !timerId;

        timerId = setTimeout (()=>{
           if(!leading){
            func.apply(this, args)
           } 
        },wait)

        if(isLeading){
            func.apply(this, args)
        }
    }
}

// Button click handler - immediate feedback
const handleSubmit = leadingDebounce((formData) => {
    console.log('Submitting form...', formData);
    // Show loading state immediately
  }, 2000, {leading:true});
  
  // User clicks button multiple times rapidly
  handleSubmit({name: 'John'}); // Executes immediately
  handleSubmit({name: 'John'}); // Ignored (within 2s)
  handleSubmit({name: 'John'}); // Ignored (within 2s)
  // No trailing execution since leading=true


  /* 3. Trailing + Leading Debounce*/

  function trailingLeadingDebounce(func, wait, options = {leading:false, trailing:false}){
    let timerId = null;
    const {leading = false, trailing = false} = options;

    return function(...args){
        clearTimeout(timerId)

        const isLeading = leading && !timerId;

        timerId = setTimeout(()=>{
          if(trailing){
            func.apply(this, args)
          }
        },wait)

        //leading call
        if(isLeading){
         func.apply(this, args)
        }
    }
  }

  // Search with immediate feedback + final search
const searchHandler = trailingLeadingDebounce((query) => {
    console.log('Searching for:', query);
    // API call here
  }, 500, { leading: true, trailing: true });
  
  // User types "react hooks"
  searchHandler('r');     // Executes immediately (leading)
  searchHandler('re');    // Cancelled
  searchHandler('rea');   // Cancelled
  searchHandler('react'); // Cancelled
  // After 500ms: executes with 'react' (trailing)

  /* 4. Debounce with flush and cancel */

  function flushCancelDebounce(func, wait){
    let timerId = null;
    let latestThis = null;
    let latestArgs = null;
    
    function cancel(){
        clearTimeout(timerId)
        timerId = null;
        latestArgs = null;
        latestThis = null;
    }

    function flush(){
     if(timerId){
        clearTimeout(timerId)
        timerId = null;
        func.apply(latestThis, latestArgs);
        latestArgs = null;
        latestThis = null;

     }
    }

     const debouncedFunc =  function(...args){
        clearTimeout(timerId);
        latestArgs = args;
        latestThis = this;

        timerId = setTimeout(()=>{
       func.apply(latestThis, latestArgs)
       latestArgs = null;
       latestThis = null;
        },wait)
    }
    debouncedFunc.cancel = cancel;
    debouncedFunc.flush = flush;

    return debouncedFunc
  }

  // Example function to debounce
function saveData(data) {
    console.log('💾 Saving data:', data, new Date().toLocaleTimeString());
}

// Create debounced version
const debouncedSave = flushCancelDebounce(saveData, 2000);

// Basic usage
debouncedSave('user input 1');
debouncedSave('user input 2');
debouncedSave('user input 3'); // Only this will execute after 2 seconds

// Use flush to execute immediately
debouncedSave.flush(); // Executes immediately with 'user input 3'

// Use cancel to prevent execution
debouncedSave('data to cancel');
debouncedSave.cancel(); // Cancels the pending execution