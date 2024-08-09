import { DetailCharacterCard } from './DetailCharacterCard';
import { Character } from '@/types';

interface RightPanelProps {
  character: Character | undefined;
  isShowRightPanel: boolean;
  handleClose: () => void;
}

export default function RightPanel({ character, isShowRightPanel, handleClose }: RightPanelProps) {
  if (!isShowRightPanel || !character) {
    return null;
  }
  const isLoading = false; // TODO: temp

  return (
    <div className='mt-4 ps-3 border-start border-white' data-testid='right-panel' style={{ minWidth: '22rem' }}>
      {!isLoading && <DetailCharacterCard character={character} onClose={handleClose} />}
    </div>
  );
}
