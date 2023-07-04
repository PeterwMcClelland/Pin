import { Button } from "@mui/material";
import React, { useState } from "react";
import "./Spot.css";
import { Link } from "react-router-dom";
import ScrollTrigger from "react-scroll-trigger";
import "../../App";

const Spot = (props) => {
  const [animation, setAnimation] = useState(false);

  const onEnterViewport = () => {
    setAnimation(true);
  };
  const { _id, name, address, spot_type, notes, image } = props.spot;

  return (
    <div className={`card ${animation ? "slideFromRight" : ""}`}>
      <ScrollTrigger onEnter={onEnterViewport}></ScrollTrigger>
      <div className="column">
        <h1 className="name-txt">{name}</h1>
        <img className="img" src={image} alt={name} width={500} />
      </div>

      <div className="column">
        <ul className="column-txt">
          <br />
          <li>Spot Type: {spot_type}</li>
          <li id="address">Address: {address}</li>
          <li id="notes">Notes: {notes}</li>

          <Button component={Link} to={`/spots/${_id}`}>
            Update
          </Button>
          <Button className="delete-button" onClick={props.deleteHandler}>
            Delete
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Spot;
