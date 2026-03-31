// Stack Overflow Link: https://stackoverflow.com/questions/159590/convert-recursion-to-iteration
// In general, a good approach to converting a recursive algo into an iterative one is by
// pushing the paramaters that would normally be passed to the recursive calls onto a stack.
// This can be seen as replacing the program call stack with a manually created one.
// Example:
// Note: if you have more than one recursive call inside and you want to preserve the order
// of invocation, you have to push the objects to invoke in reverse order that you want to invoke them in

function performIteraveImplementationOfRecursion(collection) {
    var [firstObject, secondObject] = collection;

    var stack = [];
    stack.push(secondObject);
    stack.push(firstObject);

    // while not empty
    while (stack.length) {

        // Pop off end of stack.
        obj = stack.pop();

        // Do stuff.
        // Push other objects on the stack as needed.
        // ...
    }
}

// The article Stacks and Recursion Elimination goes into more details on this subject.(http://cs.saddleback.edu/rwatkins/CS2B/Lab%20Exercises/Stacks%20and%20Recursion%20Lab.pdf or https://web.archive.org/web/20120227170843/http://cs.saddleback.edu/rwatkins/CS2B/Lab%20Exercises/Stacks%20and%20Recursion%20Lab.pdf)