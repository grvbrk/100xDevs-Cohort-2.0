import { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(e) {
    if (!isEditing) {
      const title = document.getElementById("todo-title").value;
      const desc = document.getElementById("todo-desc").value;
      const newTodo = { id: uuidv4(), title, desc, completed: false };

      setTodos((prev) => {
        return [...prev, newTodo];
      });

      document.getElementById("todo-title").value = "";
      document.getElementById("todo-desc").value = "";
    } else {
      const todoId = localStorage.getItem("todoId");
      setIsEditing(!isEditing);
      const newTitle = document.getElementById("todo-title").value;
      const newDesc = document.getElementById("todo-desc").value;
      setTodos((prev) => {
        return prev.map((item) => {
          return item.id === todoId
            ? { ...item, title: newTitle, desc: newDesc }
            : item;
        });
      });

      document.getElementById("todo-title").value = "";
      document.getElementById("todo-desc").value = "";
    }
  }

  function handleClear() {
    setTodos([]);
    setIsEditing(false);
    document.getElementById("todo-title").value = "";
    document.getElementById("todo-desc").value = "";
  }

  function handleCompleted(e) {
    const todoId = e.target.parentElement.parentElement.id;
    const btnValue = todos.filter((item) => {
      return item.id === todoId;
    })[0].completed;

    if (btnValue === false) {
      setTodos((prev) => {
        return prev.map((item) => {
          return item.id === todoId
            ? { ...item, completed: !item.completed } // {completed : true}
            : item;
        });
      });
    } else {
      setTodos((prev) => {
        return prev.filter((item) => {
          return item.id != todoId;
        });
      });
      setIsEditing(false);
      document.getElementById("todo-title").value = "";
      document.getElementById("todo-desc").value = "";
    }
  }

  function handleEdit(e) {
    const todoId = e.target.parentElement.parentElement.id;
    localStorage.setItem("todoId", todoId);
    if (!isEditing) {
      setIsEditing(!isEditing);
      const { title, desc } = todos.filter((item) => {
        return item.id === todoId;
      })[0];
      document.getElementById("todo-title").value = title;
      document.getElementById("todo-desc").value = desc;
    }
  }

  let todoList = todos.map((item) => {
    return (
      <div className="todo-entry" key={item.id} id={item.id}>
        <div className="todo-entry-info">
          {item.completed ? (
            <>
              <h1>
                <del>{item.title}</del>
              </h1>
              <p>
                <del>{item.desc}</del>
              </p>
            </>
          ) : (
            <>
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
            </>
          )}
        </div>
        <div className="todo-edit-completed-btn-container">
          {!item.completed && (
            <button className="general-button" onClick={handleEdit}>
              Edit
            </button>
          )}
          <button className="general-button" onClick={handleCompleted}>
            {item.completed ? "Remove" : "Completed"}
          </button>
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
          <button className="general-button" onClick={handleSubmit}>
            {isEditing ? "Update" : "Add todo"}
          </button>
          <button className="general-button" onClick={handleClear}>
            Clear List
          </button>
        </div>
      </div>
      <div className="render-todo">{todoList}</div>
    </>
  );
}

export default App;
