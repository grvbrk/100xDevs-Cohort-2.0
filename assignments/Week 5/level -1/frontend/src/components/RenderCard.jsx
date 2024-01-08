/* eslint-disable react/prop-types */
import React from "react";
import "../App.css";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";

// eslint-disable-next-line react/prop-types
function RenderCard({ id, handleCardDelete, handleCardEdit, card }) {
  return (
    <Card sx={{ maxWidth: 450, bgcolor: "rgb(255, 255, 255)" }} raised={true}>
      <CardContent className="cardContent-container">
        <Typography gutterBottom variant="h5" component="div">
          {card.name}
        </Typography>
        <div className="card-read-delete-container">
          <button
            onClick={() => {
              handleCardEdit(card);
            }}
          >
            Edit
          </button>
          <button onClick={() => handleCardDelete(id)}>Delete</button>
        </div>
        <div className="social-card-container">
          {card.socials.map(({ platform, link }, index) => {
            if (platform && link) {
              return <FacebookSharpIcon sx={{ maxWidth: 15 }} key={index} />;
            }
          })}
        </div>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ wordWrap: "break-word" }}
        >
          {card.desc}
        </Typography>
        <div className="interest-card-container">
          {card.interests.map((interest, index) => {
            return (
              <Chip
                key={index}
                size="small"
                label={interest.activity}
                variant="outlined"
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default RenderCard;
