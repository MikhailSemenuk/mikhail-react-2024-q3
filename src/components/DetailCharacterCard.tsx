import { Character } from '../types';
import CharacterCard from './CharacterCard';

interface DetailCharacterCardProps {
  character: Character | undefined;
  onClose: () => void;
}

export function DetailCharacterCard({ character, onClose }: DetailCharacterCardProps) {
  if (!character) {
    return null;
  }

  return (
    <>
      <CharacterCard character={character} isDetailCard={true} onClose={onClose}></CharacterCard>
    </>
  );
}
