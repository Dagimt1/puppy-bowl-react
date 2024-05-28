const COHORT_NAME = '2402-FTB-MT-WEB-PT';
const BASE_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_NAME}`;

export const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/players`);
    const result = await response.json();
    return result.data.players;
  } catch (err) {
    console.error(err);
  }
};

export const fetchPlayerById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/players/${id}`);
    const result = await response.json();
    return result.data.player;
  } catch (err) {
    console.error(err);
  }
};

export const createPlayer = async (player) => {
  try {
    const response = await fetch(`${BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    const result = await response.json();
    return result.data.newPlayer;
  } catch (err) {
    console.error(err);
  }
};

export const deletePlayer = async (id) => {
  try {
    await fetch(`${BASE_URL}/players/${id}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.error(err);
  }
};

// Somebody must have used a map or something and posted a whole bunch of the same content, making it really hard for me to see where I posted.
export const deleteAllPlayers = async () => {
  try {
    const players = await fetchAllPlayers();
    for (const player of players) {
      await deletePlayer(player.id);
    }
  } catch (err) {
    console.error(err);
  }
};
