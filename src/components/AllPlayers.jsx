import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPlayers, createPlayer, deletePlayer, deleteAllPlayers } from '../api';
import '../App.css';
import puppyBackground from '../../images/puppyBackground.jpg'

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPlayer, setNewPlayer] = useState({ name: '', breed: '', status: 'bench', imageUrl: '' });

  useEffect(() => {
    const getPlayers = async () => {
      const data = await fetchAllPlayers();
      setPlayers(data);
    };
    getPlayers();
  }, []);

  const handleCreatePlayer = async (event) => {
    event.preventDefault();
    const createdPlayer = await createPlayer(newPlayer);
    setPlayers([...players, createdPlayer]);
    setNewPlayer({ name: '', breed: '', status: 'bench', imageUrl: '' });
  };

  const handleDeletePlayer = async (id) => {
    await deletePlayer(id);
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleDeleteAllPlayers = async () => {
    await deleteAllPlayers();
    setPlayers([]);
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>Puppy Bowl</h1>
      <img src= {puppyBackground} alt="Puppy Bowl Logo" />
      </header>

      <div className="form-container">
        <form onSubmit={handleCreatePlayer}>
          <input
            type="text"
            placeholder="Name"
            value={newPlayer.name}
            onChange={e => setNewPlayer({ ...newPlayer, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Breed"
            value={newPlayer.breed}
            onChange={e => setNewPlayer({ ...newPlayer, breed: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPlayer.imageUrl}
            onChange={e => setNewPlayer({ ...newPlayer, imageUrl: e.target.value })}
            required
          />
          <select
            value={newPlayer.status}
            onChange={e => setNewPlayer({ ...newPlayer, status: e.target.value })}
            required
          >
            <option value="bench">Bench</option>
            <option value="field">Field</option>
          </select>
          <button type="submit">Create Player</button>
        </form>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="Search players"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleDeleteAllPlayers}>
          Delete All Players
        </button>
      </div>

      <div className="player-container">
        {filteredPlayers.map(player => (
          <div key={player.id} className="player-card">
            <h2>{player.name}</h2>
            <img src={player.imageUrl} alt={player.name} />
            <Link to={`/player/${player.id}`}>See Details</Link>
            <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
