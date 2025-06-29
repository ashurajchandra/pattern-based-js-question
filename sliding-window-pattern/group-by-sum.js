/**
 * Groups array elements into sub-arrays where each sub-array's sum doesn't exceed maxSum.
 * Elements are processed in order and added to the current group until adding the next 
 * element would exceed the sum limit.
 * 
 * @param {number[]} array - Array of positive numbers to be grouped
 * @param {number} maxSum - Maximum sum allowed for each sub-array
 * @returns {number[][]} Array of sub-arrays where each sub-array's sum ≤ maxSum
 * 
 * @example
 * // Basic grouping
 * groupBySum([1, 2, 3, 4, 5], 6)
 * // Returns: [[1, 2, 3], [4], [5]]
 * 
 * @example
 * // Element exceeds limit (placed in its own group)
 * groupBySum([10, 1, 1, 1], 5)
 * // Returns: [[10], [1, 1, 1]]
 * 
 * @example
 * // Equal sum groups
 * groupBySum([2, 2, 2, 2], 4)
 * // Returns: [[2, 2], [2, 2]]
 * 
 * @example
 * // Edge cases
 * groupBySum([], 10)        // Returns: []
 * groupBySum([1, 2, 3], 0)  // Returns: []
 * 
 * @since 1.0.0
 * @author Your Name
 */
 export default function groupBySum(array, maxSum) {
    // Handle edge cases
    if (array.length === 0) return []
    if (maxSum <= 0) return []
    
    let output = [];
    let startIndex = 0
    let temp = []
    let sum = 0
    
    while (startIndex < array.length) {
        // Check if adding current element would exceed maxSum
        if (sum + array[startIndex] > maxSum) {
            // Push current group if it has elements
            if (temp.length > 0) {
                output.push(temp)
            }
            // Start new group with current element
            temp = [array[startIndex]]
            sum = array[startIndex]
        } else {
            // Add element to current group
            temp.push(array[startIndex])
            sum += array[startIndex]
        }
        startIndex++
    }
    
    // Push final group if it has elements
    if (temp.length) {
        output.push(temp)
    }
    
    return output
}

// Test cases
console.log("Test 1:", groupBySum([10, 1, 1, 1], 5))
console.log("Test 2:", groupBySum([1, 2, 3, 4, 5], 6))
// Expected: [[1, 2, 3], [4], [5]]