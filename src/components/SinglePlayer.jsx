import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayerById } from '../api';
import '../App.css'

const SinglePlayer = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getPlayer = async () => {
      const data = await fetchPlayerById(id);
      setPlayer(data);
    };
    getPlayer();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{player.name}</h1>
      <img src={player.imageUrl} alt={player.name} />
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <p>Team ID: {player.teamId}</p>
    </div>
  );
};

export default SinglePlayer;
