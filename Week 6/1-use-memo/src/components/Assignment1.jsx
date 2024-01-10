import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs
// an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when
// the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState(0);
  const [count, setCount] = useState(0);

  //With useMemo()
  const expensiveValue = useMemo(() => {
    console.log("Ran");
    let result = 1;
    for (let i = 1; i <= input; i++) {
      result = result * i;
    }
    return result;
  }, [input]);

  //   Without useMemo()
  //   function factorial(input) {
  //     console.log("ran")
  //     let result = 1;
  //     for (let i = 1; i <= input; i++) {
  //       result = result * i;
  //     }
  //     return result;
  //   }

  //   const expensiveValue = factorial(input)

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <br />
      <br />
      <br />
      <button onClick={increment}>Increment</button>
      <p>Count Value: {count}</p>

      <p>Calculated Value: {expensiveValue}</p>
    </div>
  );
}
