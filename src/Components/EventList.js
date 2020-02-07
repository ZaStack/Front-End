import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import EventCard from "./EventCard";

const EventList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://block-party-calendar.herokuapp.com/api/events")
      .then(response => {
        console.log("Data response", response);
        setData(response.data);
      })
      .catch(error => {
        console.log("Data didn't return.", error);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      {data.map(data => {
        return (
          <EventCard
            key={data.id}
            eventTitle={data.eventTitle}
            eventDescription={data.eventDescription}
            eventStart={data.eventStart}
            eventEnd={data.eventEnd}
          />
        );
      })}
    </Container>
  );
};
export default EventList;
