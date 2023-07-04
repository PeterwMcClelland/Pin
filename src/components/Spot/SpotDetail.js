import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import ScrollTrigger from "react-scroll-trigger";

const SpotDetail = () => {
  const [animation, setAnimation] = useState(false);

  const onEnterViewport = () => {
    setAnimation(true);
  };
  const [inputs, setInputs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(
          `https://pin-index-3d5f57e24919.herokuapp.com/api/spots/${id}`
        );
        setInputs(res.data.spot);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(
        `https://pin-index-3d5f57e24919.herokuapp.com/api/spots/${id}`,
        {
          name: String(inputs.name),
          address: String(inputs.address),
          spot_type: String(inputs.spot_type),
          notes: String(inputs.notes),
          image: String(inputs.image),
        }
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/spots"));
  };

  const handleChange = (e) => {
    const newInputs = {
      ...inputs,
      [e.target.name]: e.target.value,
    };

    if (
      ["output", "tds", "espresso_gs"].includes(e.target.name) &&
      newInputs.output &&
      newInputs.tds &&
      newInputs.espresso_gs
    ) {
      newInputs.percent = (
        (Number(newInputs.output) * Number(newInputs.tds)) /
        Number(newInputs.espresso_gs)
      ).toFixed(2);
    }

    setInputs(newInputs);
  };

  return (
    <div className={`details ${animation ? "liftIntoPlace-details" : ""}`}>
      <ScrollTrigger onEnter={onEnterViewport}></ScrollTrigger>
      {loading ? (
        <div className="loading-bar">Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        inputs && (
          <form onSubmit={handleSubmit}>
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
              <TextField
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="image"
                placeholder='Paste "Copy Image Address" Here'
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
                placeholder="Notes"
              />

              <Button variant="contained" type="submit">
                Update Spot
              </Button>
            </Box>
          </form>
        )
      )}
    </div>
  );
};

export default SpotDetail;
