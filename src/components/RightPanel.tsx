import { useEffect, useState } from 'react';
import fetchCharacter from '../libs/fetchCharacter';
import { DetailCharacterCard } from './DetailCharacterCard';
import { Character } from '../types';
import SpinerLoading from './SpinerLoading';

interface RightPanelProps {
  selectedId: number | undefined;
  isShowRightPanel: boolean;
  handleClose: () => void;
}

export default function RightPanel({ selectedId, isShowRightPanel, handleClose }: RightPanelProps) {
  const [detailCharacter, setDetailCharacter] = useState<Character | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedId) {
        return;
      }
      setIsLoading(true);
      const data = await fetchCharacter(String(selectedId));
      setIsLoading(false);
      setDetailCharacter(data);
    };
    fetchData();
  }, [selectedId, isShowRightPanel]);

  if (!isShowRightPanel) {
    return <></>;
  }

  return (
    <div className="mt-4 ps-3 border-start border-white" style={{ minWidth: '22rem' }}>
      <SpinerLoading isLoading={isLoading}></SpinerLoading>
      {!isLoading && <DetailCharacterCard character={detailCharacter} onClose={handleClose} />}
    </div>
  );
}
