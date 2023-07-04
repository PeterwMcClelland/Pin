import React, { useEffect, useState } from "react";
import axios from "axios";
import Spot from "./Spot";
import "./Spot.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Spots = () => {
  const [spots, setSpots] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHandler = async () => {
    return await axios.get(`${apiUrl}/api/spots`).then((res) => res.data);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await axios
        .delete(`${apiUrl}/api/spots/${id}`)
        .then((res) => res.data)
        .then(() => fetchHandler().then((data) => setSpots(data.spots)));
    }
  };

  useEffect(() => {
    fetchHandler().then((data) => setSpots(data.spots));
  }, []);

  if (spots) {
    console.log(spots);
  }

  return (
    <div className="background">
      <div className="search-bar">
        <input
          className="search-txt"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <ul>
        {spots &&
          spots
            .filter(
              (spot) =>
                spot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                spot.spot_type.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((spot, i) => (
              <li key={i}>
                <Spot
                  spot={spot}
                  deleteHandler={() => deleteHandler(spot._id, setSpots)}
                />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Spots;
