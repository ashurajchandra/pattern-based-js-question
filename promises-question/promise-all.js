/* Promise.all() takes an iterable of promises as input and 
returns a  single promise. The returned promise fulfills when
all of the input promises fulfill (including when an empty 
iterable is passed). With an array of fulfillment values it 
rejects when any of the input promises rejects with the first 
rejection reason fulfills when all the inout promises fulfill */

const customPromiseAll = (inputPromises = []) =>{
     //final array of resolved promise
    const result = Array(inputPromises.length);
    //to keep the track of the successful promise
    let completedPromises = 0;

    return new Promise((resolve, reject)=>{
        inputPromises.forEach((input, index )=>{
         Promise.resolve(input).then((data)=>{
            result[index] = data;
            completedPromises ++;

            if(completedPromises === result.length){
                resolve(resolve)
            }
         }).catch((err)=>reject(err))
        })
    })
}