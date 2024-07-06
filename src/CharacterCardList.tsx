import { Component, ReactNode } from 'react';
import { Character } from './types';

interface CharacterCardListProps {
  characters: Character[];
}

class CharacterCardList extends Component<CharacterCardListProps>{

  render(): ReactNode {
    const { characters } = this.props;

    return (
      <div className='d-flex flex-wrap justify-content-around'>
        {characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <p>Try search something else ('Butter Robot', 'Abradolf Lincler', 'Rick', 'Morty') </p>
        )}
      </div>
    );
  }
}


interface CharacterCardProps {
  character: Character;
}

class CharacterCard extends Component<CharacterCardProps>{

  render(): ReactNode {
    const { character } = this.props;

    return (
      <div className="card m-2" style={{ width: '18rem' }}>
        <img src={character.image} className="card-img-top" alt={character.name} />
        <div className="card-body">
          <h5 className="card-title">{character.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Status: {character.status}</li>
          <li className="list-group-item">Gender: {character.gender}</li>
          <li className="list-group-item">Species: {character.species}</li>
        </ul>
      </div>
    );
  }
}

// const CharacterCard = ({ character }: { character: Character }) => {
//   return (
//     <div className="card m-2" style={{ width: '18rem' }}>
//       <img src={character.image} className="card-img-top" alt={character.name} />
//       <div className="card-body">
//         <h5 className="card-title">{character.name}</h5>
//       </div>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item">Status: {character.status}</li>
//         <li className="list-group-item">Gender: {character.gender}</li>
//         <li className="list-group-item">Species: {character.species}</li>
//       </ul>
//     </div>
//   );
// };

export default CharacterCardList;
