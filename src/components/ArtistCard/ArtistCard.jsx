import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ArtistCard = ({ name, image, description }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
        alt={`${name}'s profile`}
        sx={{ height: 200 }}
      />
      <CardContent>
        <Typography variant="h3" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
