import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import PokemonCard from './PokemonCard';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        setPokemonData(response.data.results);
        setFilteredData(response.data.results);
      })
      .catch(error => {
        console.error('There was an error fetching the Pokémon data!', error);
      });
  }, []);

 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredData(pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  };

  return (
    <div className="App p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Pokémon Database</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearch}
        className="block mx-auto p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredData.map(pokemon => (
          <PokemonDetail key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </div>
  );
}


function PokemonDetail({ name }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => setPokemon(response.data))
      .catch(error => console.error('Error fetching Pokémon details', error));
  }, [name]);

  if (!pokemon) return null;

  return (
    <PokemonCard
      name={name}
      imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
      types={pokemon.types.map(type => type.type.name)}
    />
  );
}

export default App;
