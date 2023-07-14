import { Button, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollTrigger from "react-scroll-trigger";

const API_URL = process.env.REACT_APP_API_URL;

const AddSpot = () => {
  const [animation, setAnimation] = useState(false);

  const onEnterViewport = () => {
    setAnimation(true);
  };
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    address: "",
    spot_type: "",
    notes: "",
    image: "",
  });

  const handleChange = (e) => {
    const newInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };

    setInputs(newInputs);
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("address", inputs.address);
    formData.append("spot_type", inputs.spot_type);
    formData.append("notes", inputs.notes);
    formData.append("image", inputs.image); // the image is a File object now

    axios.post(`${API_URL}/api/spots`, formData).then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/spots"));
  };

  return (
    <ScrollTrigger onEnter={onEnterViewport}>
      <form
        className={`addcoffee ${animation ? "liftIntoPlace-addcoffee" : ""}`}
        onSubmit={handleSubmit}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          maxWidth={700}
          alignContent={"center"}
          alignSelf={"center"}
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={10}
          marginBottom={10}
        >
          <FormLabel>Spot</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
            placeholder="Park Blocks 9"
          />

          <FormLabel>Address</FormLabel>
          <TextField
            value={inputs.address}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="address"
            placeholder="6666 SW 18th Street Portland, OR."
          />

          <FormLabel>Spot Type</FormLabel>
          <TextField
            value={inputs.spot_type}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="spot_type"
            placeholder="Ledge, Rail, Stairs..."
          />

          <FormLabel>Image</FormLabel>
          <input
            accept="image/*"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setInputs((prev) => ({
                ...prev,
                image: file,
              }));
            }}
          />

          <FormLabel>Notes</FormLabel>
          <TextField
            value={inputs.notes}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="notes"
            multiline="maxRows"
            placeholder="Tasting Notes"
          />

          <Button variant="contained" type="submit">
            Add Spot
          </Button>
        </Box>
      </form>
    </ScrollTrigger>
  );
};

export default AddSpot;
