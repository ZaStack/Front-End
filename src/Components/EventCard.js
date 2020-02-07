import React from "react";
import { Container, Card, CardContent, Typography } from "@material-ui/core";

const EventCard = props => {
  return (
    <Container maxWidth="lg">
      <Card>
        <CardContent>
          <Typography>{props.eventTitle}</Typography>
          <Typography>{props.eventDescription}</Typography>
          <Typography>{props.eventStart}</Typography>
          <Typography>{props.eventEnd}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
export default EventCard;
