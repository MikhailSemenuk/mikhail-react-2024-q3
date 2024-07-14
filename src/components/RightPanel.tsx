import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import fetchCharacter from '../libs/fetchCharacter';
import { DetailCharacterCard } from './DetailCharacterCard';
import { Character } from '../types';

export default function RightPanel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const detailsURL: string | undefined = searchParams.get('details') ?? undefined;

  console.log('url details = ' + detailsURL);

  const [detailCharacter, setDetailCharacter] = useState<Character | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (detailsURL) {
      setIsVisible(true);
    }

    const fetchData = async () => {
      if (!detailsURL) {
        return;
      }

      const data = await fetchCharacter(detailsURL);
      setDetailCharacter(data);
    };
    fetchData();
  }, [detailsURL]);

  const handleClose = () => {
    setIsVisible(false);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('details');
    console.log(`новый путь ${location.pathname}?${newSearchParams.toString()}`);
    navigate(`${location.pathname}?${newSearchParams.toString()}`);
  };

  if (!isVisible) {
    return <></>;
  }

  return (
    <div className="mt-4" style={{ minWidth: '22rem' }}>
      <DetailCharacterCard character={detailCharacter} onClose={handleClose} />
    </div>
  );
}
