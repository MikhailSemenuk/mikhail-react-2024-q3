'use client';
import { changePagesURL } from '@/libs/changePagesURL';
import { DetailCharacterCard } from './DetailCharacterCard';
import { Character, PageSearchDetailURL } from '@/types';
import { useRouter } from 'next/navigation';

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
      <DetailCharacterCard character={character} onClose={handleClose} />
    </div>
  );
}
