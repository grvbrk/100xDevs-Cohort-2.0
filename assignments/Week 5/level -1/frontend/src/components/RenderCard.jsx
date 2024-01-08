/* eslint-disable react/prop-types */
import React from "react";
import "../App.css";
import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";

// eslint-disable-next-line react/prop-types
function RenderCard({ id, handleCardDelete, handleCardEdit, prop: { name, desc, socials, interests } }) {
  return (
    <Card sx={{ maxWidth: 545, bgcolor: "rgb(255, 255, 255)" }} raised={true}>
      <CardContent className="cardContent-container">
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <div className="card-read-delete-container">
          <button onClick={()=>handleCardEdit(id)}>Edit</button>
          <button onClick={()=>handleCardDelete(id)}>Delete</button>
        </div>
        <div className="social-card-container">
          {socials.map((social, index) => {
            return <FacebookSharpIcon sx={{ maxWidth: 15 }} key={index} />;
          })}
        </div>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ wordWrap: "break-word" }}
        >
          {desc}
        </Typography>
        <div className="interest-card-container">
          {interests.map((interest, index) => {
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
