export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  image: string;
  origin: {
    name: string;
    url: string;
  };
  //...
}

export interface CharacterPages {
  characters: Character[];
  pages: number;
}
