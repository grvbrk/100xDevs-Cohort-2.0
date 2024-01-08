import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Chip, Stack, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import RenderCard from "./components/RenderCard";

function App() {
  const interest = useRef(null);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    socials: [{ platform: "", link: "" }],
    interests: [],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(true);
  console.log(formSubmitted);
  useEffect(() => {
    async function fetchCards() {
      const res = await fetch("http://localhost:3001/card");
      const allCards = await res.json();
      setCards(allCards.cards);
      setCardsLoading(false);
      // console.log("ran")
    }

    fetchCards();
  }, [formSubmitted]);

  // console.log("Leak");
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

  async function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(!formSubmitted);
    // console.log(form);

    try {
      await fetch("http://localhost:3001/card", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    setForm({
      name: "",
      desc: "",
      socials: [{ platform: "", link: "" }],
      interests: [],
    });
  }

  async function handleCardDelete(id) {
    try {
      await fetch(`http://localhost:3001/card/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setFormSubmitted(!formSubmitted);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCardEdit(id) {}

  return (
    <div className="main-container">
      <Card sx={{ width: 600, bgcolor: "antiquewhite" }} raised={true}>
        <CardContent>
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
              <button type="button" className="add-btn" onClick={addSocials}>
                <AddIcon sx={{ maxWidth: 15 }} />
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
                  className="add-btn"
                  onClick={handleInterestClick}
                >
                  <AddIcon sx={{ maxWidth: 15 }} />
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
        </CardContent>
      </Card>
      {!cardsLoading && (
        <div className="render-cards">
          {cards.map((card) => {
            return (
              <RenderCard
                id={card._id}
                handleCardEdit={handleCardEdit}
                handleCardDelete={handleCardDelete}
                key={card._id}
                prop={card}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
