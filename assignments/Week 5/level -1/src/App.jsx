import "./App.css";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    socials: {},
    interests: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setForm((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-element-text">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={form.name}
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />
      </div>

      <div className="form-element-text">
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          value={form.desc}
          name="desc"
          placeholder="Describe yourself"
          onChange={handleChange}
        />
      </div>

      <div className="form-element-social">
        <p>Socials</p>
        <input type="text" />
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

export default App;
