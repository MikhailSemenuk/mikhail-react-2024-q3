'use client';
import { changePagesURL } from '@/libs/changePagesURL';
import { Character, PageSearchDetailURL } from '@/types';
import { useRouter } from 'next/navigation';
import CharacterCard from './CharacterCard';

interface RightPanelProps {
  character: Character | undefined;
  isShowRightPanel: boolean;
  urlData: PageSearchDetailURL;
}

export default function RightPanel({ character, isShowRightPanel, urlData }: RightPanelProps) {
  const router = useRouter();
  if (!isShowRightPanel || !character) {
    return null;
  }

  function handleClose(): void {
    const urlDataUpdate = { ...urlData };
    urlDataUpdate.detailId = undefined;
    changePagesURL(router, urlDataUpdate);
  }

  return (
    <div className='mt-4 ps-3 border-start border-white' data-testid='right-panel' style={{ minWidth: '22rem' }}>
      <CharacterCard character={character} onClose={handleClose} isDetailCard={true} urlData={urlData} />
    </div>
  );
}
