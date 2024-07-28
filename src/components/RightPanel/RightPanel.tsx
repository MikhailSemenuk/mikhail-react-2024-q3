import { DetailCharacterCard } from '../CharacterCards/DetailCharacterCard';
import { SpinnerLoading } from '../SpinnerLoading/SpinnerLoading';
import { useGetCharacterQuery } from '../../state/slices/charactersApi';
import { skipToken } from '@reduxjs/toolkit/query/react';

interface RightPanelProps {
  selectedId: number | undefined;
  isShowRightPanel: boolean;
  handleClose: () => void;
}

export default function RightPanel({ selectedId, isShowRightPanel, handleClose }: RightPanelProps) {
  const queryArgs = selectedId ? { id: selectedId.toString() } : skipToken;
  const { data, isLoading } = useGetCharacterQuery(queryArgs);

  if (!isShowRightPanel) {
    return null;
  }

  return (
    <div className='mt-4 ps-3 border-start border-white' data-testid='right-panel' style={{ minWidth: '22rem' }}>
      <SpinnerLoading isLoading={isLoading}></SpinnerLoading>
      {!isLoading && <DetailCharacterCard character={data} onClose={handleClose} />}
    </div>
  );
}
