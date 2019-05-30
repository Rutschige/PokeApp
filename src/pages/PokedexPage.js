import React from 'react';
import PokemonList from '../components/pokemon/PokemonList';

const Pokedex = () => {
  return (
    <div style={{ textAlign: 'center', margin: '1%' }}>
      <h3>Pokedex</h3>
      <PokemonList />
    </div>
  );
};

export default Pokedex;
