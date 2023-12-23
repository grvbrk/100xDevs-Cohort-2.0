/*
  Implement a class `Calculator` having below methods
    - initialize a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(initialVal=0){
    this.result = initialVal
  }

  add(number){
    this.result += number
  }

  subtract(number){
    this.result -= number
  }

  multiply(number){
    this.result *= number
  }

  divide(number){
    if(number===0) throw new Error("Number cannot be 0")
    this.result /= number
  }

  clear(){
    this.result = 0
  }

  getResult(){
    return this.result
  }

  trim(expression){
    return expression.trim()
  }

  // - calculate: takes a string expression which can take multi-arithmetic operations and give its result
  // example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
  // Points to Note: 
  //   1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
  //   2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  calculate(expression){
    const validInputs = '0123456789()/+-*. '
    expression = expression.trim()
    for(let char of expression){
      if(!validInputs.includes(char)){
        throw new Error(`Invalid Character: ${char}`)
      }
    }
    if(expression.includes(('/ 0') || ('/0'))) throw new Error(`Invalid Character: ${char}`)
    this.result = eval(expression)
  }
}

module.exports = Calculator;
