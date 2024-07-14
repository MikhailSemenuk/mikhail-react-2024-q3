import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import fetchCharacter from '../libs/fetchCharacter';
import { DetailCharacterCard } from './DetailCharacterCard';
import { Character } from '../types';

export default function RightPanel() {
  const [searchParams] = useSearchParams();
  const detailsURL: string | undefined = searchParams.get('details') ?? undefined;

  console.log('url details = ' + detailsURL);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [detail, setDetail] = useState(detailsURL);
  const [detailCharacter, setDetailCharacter] = useState<Character | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!detail) {
        return;
      }

      const data = await fetchCharacter(detail);
      setDetailCharacter(data);
    };
    fetchData();
  }, [detail]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <div style={{ minWidth: '22rem' }}>
      <DetailCharacterCard character={detailCharacter} onClose={handleClose} />
    </div>
  );
}
