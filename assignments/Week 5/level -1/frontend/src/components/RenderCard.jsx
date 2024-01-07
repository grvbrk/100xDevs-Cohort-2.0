/* eslint-disable react/prop-types */
import React from "react";
import "../App.css";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Chip,
} from "@mui/material";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";

// eslint-disable-next-line react/prop-types
function RenderCard({ prop: { name, desc, socials, interests } }) {
  return (
    <Card sx={{ maxWidth: 545, bgcolor: "rgb(255, 255, 255)" }} raised={true}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
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
      </CardActionArea>
    </Card>
  );
}

export default RenderCard;
