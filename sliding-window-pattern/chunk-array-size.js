/**
 * Splits an array into smaller chunks of a specified size.
 * Creates a new array with sub-arrays containing elements from the original array,
 * where each sub-array has at most 'size' elements.
 * 
 * @param {Array} array - The array to be chunked
 * @param {number} [size=1] - The size of each chunk (defaults to 1)
 * @returns {Array[]} Array of chunks, where each chunk is an array of elements
 * 
 * @example
 * // Basic chunking
 * chunk([1, 2, 3, 4, 5, 6], 2)
 * // Returns: [[1, 2], [3, 4], [5, 6]]
 * 
 * @example
 * // Uneven chunks (last chunk may be smaller)
 * chunk([1, 2, 3, 4, 5], 3)
 * // Returns: [[1, 2, 3], [4, 5]]
 * 
 * @example
 * // Default chunk size
 * chunk([1, 2, 3])
 * // Returns: [[1], [2], [3]]
 * 
 * @example
 * // Single chunk (size equals array length)
 * chunk([1, 2, 3], 3)
 * // Returns: [1, 2, 3] (original array, not chunked)
 * 
 * @example
 * // Edge cases
 * chunk([], 2)           // Returns: []
 * chunk([1, 2, 3], 0)    // Returns: infinite loop (consider validation)
 * chunk([1, 2], 5)       // Returns: [1, 2] (size > array length)
 * 
 * @throws {Error} May cause infinite loop if size is 0 or negative
 * 
 * @since 1.0.0
 * @author Your Name
 */
 export default function chunk(array, size = 1) {
  
    if(array.length === 0) return []
    if(array.length === size) return array;
  
    let startIndex = 0
    const resultArray = []
  
    while(startIndex < array.length){
     const endIndex = startIndex + size;
     resultArray.push(array.slice(startIndex, endIndex))
     startIndex = endIndex
    }
    return resultArray
  }