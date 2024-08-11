import { Character } from '@/types';
import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface CharacterContextType {
  selectedCards: Character[];
  toggleCard: (card: Character) => void;
  isCardCheckedId: (id: number) => boolean;
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
    setSelectedCards((prevSelectedCards) => {
      const index = prevSelectedCards.findIndex((item) => item.id === card.id);
      if (index !== -1) {
        return prevSelectedCards.filter((item) => item.id !== card.id);
      } else {
        return [...prevSelectedCards, card];
      }
    });
  };

  const isCardChecked = (card: Character) => {
    return selectedCards.findIndex((item) => item.id === card.id) !== -1;
  };

  const isCardCheckedId = (id: number) => {
    return selectedCards.findIndex((item) => item.id === id) !== -1;
  };

  return (
    <CharacterContext.Provider value={{ selectedCards, toggleCard, isCardCheckedId, deselectAllCards, isCardChecked }}>
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
