import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import "./Spot.css";
import { Link } from "react-router-dom";
import ScrollTrigger from "react-scroll-trigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "../../App";
import Modal from "react-modal";
import axios from 'axios';




import UserContext from '../UserContext/UserContext';




const copyPin = <FontAwesomeIcon className="copyicon" icon={faCopy} />;

const handleMessage = () => {
  alert("For this demo the Delete feature has been deactivated.");
};



const Spot = (props) => {
  const [animation, setAnimation] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const addToFavorites = async (_id, user) => {
    try {
      if(user) {
        await axios.put(`http://localhost:3001/api/spots/addFavorite/${_id}`, {userId: user._id})
      } else {
        // Handle situation when there's no user (not logged in)
        alert('Please log in to add spots to your favorites');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onEnterViewport = () => {
    setAnimation(true);
  };
  const { _id, name, address, spot_type, notes, image } = props.spot;

  return (
    <div className={`card ${animation ? "slideFromRight" : ""}`}>
      <ScrollTrigger onEnter={onEnterViewport}></ScrollTrigger>
      <div className="column">
        <h1 className="name-txt">{name}</h1>
        <img
          className="img"
          src={image}
          alt={name}
          width={500}
          onClick={() => setModalIsOpen(true)}
        />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "80%",
            },
          }}
        >
          <img
            src={image}
            alt={name}
            className="fullscreen-image"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Modal>
      </div>

      <div id="txt-column" className="column">
        <ul className="column-txt">
          <br />
          <li>{spot_type}</li>
          <li id="address">
            Address: {address}
            <br />{" "}
            <span
              onClick={() => {
                navigator.clipboard.writeText(address);
              }}
            >
              {copyPin}
            </span>
          </li>
          <li id="notes">Notes: {notes}</li>

          <button onClick={() => user && addToFavorites(_id, user)}>Add to Favorites</button>


          <Button component={Link} to={`/spots/${_id}`}>
            Update
          </Button>
          <Button
            className="delete-button"
            /*onClick={props.deleteHandler}*/ onClick={handleMessage}
            onTouchEnd={handleMessage}
          >
            Delete
          </Button>
        </ul>
      </div>
    </div>
  );
};

export default Spot;
