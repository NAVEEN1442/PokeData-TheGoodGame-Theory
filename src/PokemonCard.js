import React from 'react';


function PokemonCard({ name, imageUrl, types }) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center">
      <img
        src={imageUrl}
        alt={name}
        className="w-32 h-32 mx-auto mb-2"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">Type: {types.join(', ')}</p>
    </div>
  );
}

export default PokemonCard;
