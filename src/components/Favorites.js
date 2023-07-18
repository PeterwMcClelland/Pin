import React, { useState, useEffect, useContext } from 'react';
import Spots from './Spot/Spots'; // The component you use to display a spot
import axios from 'axios';
import UserContext from './UserContext/UserContext';

const Favorites = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/favorites/${user.userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFavorites();
  }, [user]);

  return (
    <div>
      <h1>Favorites Page</h1>
      {favorites.map((favoriteSpot) => (
        <Spots key={favoriteSpot._id} spot={favoriteSpot} />
      ))}
    </div>
  );
};

export default Favorites;
