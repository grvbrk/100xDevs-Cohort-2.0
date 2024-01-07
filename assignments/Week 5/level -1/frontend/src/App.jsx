import "./App.css";
import { createRef, useRef, useState } from "react";
import { Chip, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Card from "./components/Card";

function App() {
  const interest = useRef(null);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    socials: [{ platform: "", link: "" }],
    interests: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleChange(e) {
    setForm((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  }

  function handleSocialChange(e, index) {
    const updatedSocials = [...form.socials];
    updatedSocials[index][e.target.name] = e.target.value;
    setForm((prevData) => {
      return { ...prevData, socials: updatedSocials };
    });
  }

  function addSocials() {
    const newSocialField = { platform: "", link: "" };
    const updatedSocials = [...form.socials, newSocialField];
    setForm((prevData) => {
      return { ...prevData, socials: updatedSocials };
    });
  }

  function handleInterestClick() {
    const newInterest = { id: uuidv4(), activity: interest.current.value };

    const newInterestArray = [...form.interests, newInterest];
    setForm((prevData) => {
      return { ...prevData, interests: newInterestArray };
    });

    interest.current.value = null;
  }

  function handleDelete(id) {
    const updatedInterestArray = form.interests.filter((item) => {
      return item.id != id;
    });
    setForm((prevData) => {
      return { ...prevData, interests: updatedInterestArray };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    // setForm({
    //   name: "",
    //   desc: "",
    //   socials: [{ platform: "", link: "" }],
    //   interests: [],
    // });
  }

  return (
    <div className="main-container">
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
                  value={item.platform}
                  name="platform"
                  onChange={(e) => handleSocialChange(e, index)}
                />
                <input
                  placeholder="Link"
                  value={item.link}
                  name="link"
                  onChange={(e) => handleSocialChange(e, index)}
                />
              </div>
            );
          })}
          <button type="button" className="add-social-btn" onClick={addSocials}>
            Add
          </button>
        </div>

        <div className="form-element-interest">
          <label htmlFor="interests">Interests</label>
          <div className="form-element-interest-input">
            <input
              type="text"
              id="interests"
              name="interests"
              placeholder="Interests"
              ref={interest}
            />
            <button
              type="button"
              className="add-interest-btn"
              onClick={handleInterestClick}
            >
              Add
            </button>
          </div>
          {form.interests.length != 0 && (
            <Stack direction="row" spacing={1}>
              <div className="interest-chip">
                {form.interests.map((item, index) => {
                  return (
                    <div key={index}>
                      <Chip
                        size="small"
                        label={item.activity}
                        onDelete={() => handleDelete(item.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </Stack>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
      {formSubmitted && <Card form={form} />}
    </div>
  );
}

export default App;
