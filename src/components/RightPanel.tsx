import { useEffect, useState } from 'react';
import fetchCharacter from '../libs/fetchCharacter';
import { DetailCharacterCard } from './DetailCharacterCard';
import { Character } from '../types';

interface RightPanelProps {
  selectedId: number | undefined;
  isShowRightPanel: boolean;
  handleClose: () => void;
}

export default function RightPanel({ selectedId, isShowRightPanel, handleClose }: RightPanelProps) {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const location = useLocation();
  // const detailsURL: string | undefined = searchParams.get('details') ?? undefined;

  // console.log('url details = ' + detailsURL);

  const [detailCharacter, setDetailCharacter] = useState<Character | undefined>(undefined);
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   if (detailsURL) {
  //     setIsVisible(true);
  //   }

  //   const fetchData = async () => {
  //     if (!detailsURL) {
  //       return;
  //     }

  //     const data = await fetchCharacter(detailsURL);
  //     setDetailCharacter(data);
  //   };
  //   fetchData();
  // }, [detailsURL]);

  useEffect(() => {
    console.log('сработал useEffect RightPanel ' + selectedId);

    // setIsVisible(!isVisible); /

    const fetchData = async () => {
      if (!selectedId) {
        return;
      }

      const data = await fetchCharacter(String(selectedId));
      setDetailCharacter(data);
    };
    fetchData();
  }, [selectedId, isShowRightPanel]);

  // const handleClose = () => {
  //   // setIsVisible(false); // TODO: fix later
  //   console.log('нажали на кнопку закрыть');

  //   // const newSearchParams = new URLSearchParams(searchParams);
  //   // newSearchParams.delete('details');
  //   // console.log(`новый путь ${location.pathname}?${newSearchParams.toString()}`);
  //   // navigate(`${location.pathname}?${newSearchParams.toString()}`);
  // };

  if (!isShowRightPanel) {
    return <></>;
  }

  return (
    <div className="mt-4 ps-3 border-start border-white" style={{ minWidth: '22rem' }}>
      <DetailCharacterCard character={detailCharacter} onClose={handleClose} />
    </div>
  );
}
