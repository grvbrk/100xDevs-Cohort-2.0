import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    const title = document.getElementById("todo-title").value;
    const desc = document.getElementById("todo-desc").value;
    const newTodo = { title, desc };

    setTodos((prev) => {
      return [...prev, newTodo];
    });
  }

  function handleClear() {
    setTodos([]);
  }

  let todoList = todos.map((item) => {
    return (
      <div className="todo-entry" key={item.title}>
        <div>
          <button>Edit</button>
        </div>
        <div>
          <h1>{item.title}</h1>
          <p>{item.desc}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="todo-container">
        <input
          type="text"
          className="todo-title"
          id="todo-title"
          placeholder="Input Title"
        />
        <input
          type="text"
          className="todo-desc"
          id="todo-desc"
          placeholder="Input description"
        />
        <div className="add-clear-todo-btn">
          <button onClick={handleSubmit}>Add todo</button>
          <button onClick={handleClear}>Clear List</button>
        </div>
        <div className="render-todo">{todoList}</div>
      </div>
    </>
  );
}

export default App;
