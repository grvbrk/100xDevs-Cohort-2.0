import "./App.css";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    socials: [{ platform: "", link: "" }, { platform: "", link: "" }],
    interests: [],
  });

  function handleChange(e) {
    setForm((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  function handleSocialChange(e, index) {
    const updatedSocialField = {}
    console.log(e.target.name, index)
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-element-text">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={form.name}
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
        />
      </div>

      <div className="form-element-text">
        <label htmlFor="desc">Description</label>
        <textarea
          type="text"
          id="desc"
          value={form.desc}
          name="desc"
          placeholder="Describe yourself"
          onChange={handleChange}
        />
      </div>

      <div className="form-element-social">
        <label>Socials</label>
        {form.socials.map((item, index) => {
          return (
            <div key={index} className="form-element-social-links">
              <input
                placeholder="Platform"
                defaultValue={item.platform}
                name="platform"
                onChange={(e)=>handleSocialChange(e, index)}
              />
              <input
                placeholder="Link"
                defaultValue={item.link}
                name="link"
                onChange={(e)=>handleSocialChange(e, index)}
              />
            </div>
          );
        })}
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}

export default App;
