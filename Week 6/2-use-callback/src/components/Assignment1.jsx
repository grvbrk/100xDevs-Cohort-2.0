import { useState, useCallback, memo } from "react";

// Create a counter component with increment and decrement functions.
// Pass these functions to a child component which has buttons to perform the
// increment and decrement actions.
// Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);

  //   function handleIncrement() {
  //     console.log("Increment");
  //     setCount((prevCount) => prevCount + 1);
  //   }

  const handleIncrement = useCallback(() => {
    console.log("Increment");
    setCount((prevCount) => prevCount + 1);
  }, []);

  //   function handleDecrement() {
  //     console.log("Decrement");
  //     setCount((prevCount) => prevCount - 1);
  //   }

  const handleDecrement = useCallback(() => {
    console.log("Decrement");
    setCount((prevCount) => prevCount - 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      <CounterButtonsOne
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

const CounterButtons = memo(function CounterButtons({
  onIncrement,
  onDecrement,
}) {
  console.log("1 Rendered");
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
});

const CounterButtonsOne = memo(function CounterButtonsOne({
  onIncrement,
  onDecrement,
}) {
  console.log("2 Rendered");
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
});
