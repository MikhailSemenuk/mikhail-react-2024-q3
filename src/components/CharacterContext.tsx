import { Character } from '@/types';
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface CharacterContextType {
  selectedCards: Character[];
  toggleCard: (card: Character) => void;
  deselectAllCards: () => void;
  isCardChecked: (card: Character) => boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCards, setSelectedCards] = useState<Character[]>([]);

  const deselectAllCards = () => {
    setSelectedCards([]);
  };

  const toggleCard = (card: Character) => {
    const index = selectedCards.findIndex((item) => item.id === card.id);
    if (index !== -1) {
      selectedCards.splice(index, 1);
    } else {
      selectedCards.push(card);
    }
  };

  const isCardChecked = (card: Character) => {
    return selectedCards.findIndex((item) => item.id === card.id) !== -1;
  };

  return (
    <CharacterContext.Provider value={{ selectedCards, toggleCard, deselectAllCards, isCardChecked }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};
