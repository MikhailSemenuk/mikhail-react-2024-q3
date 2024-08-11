import { Character, InfoResults, PageSearchDetailURL } from '@/types';
import SearchGroup from '@/components/SearchGroup';
import Pagination from '@/components/Pagination';
import CharacterCard from '@/components/CharacterCard';
import { BottomPanel } from '@/components/BottomPanel';
import RightPanel from '@/components/RightPanel';
import ListWrapperCloseRightPanel from './ListWrapperCloseRightPanel';

interface PageProps {
  params: {
    pagesID: string;
  };
  searchParams: {
    search?: string;
    detailId?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const search = searchParams.search || '';

  const detailId = Number(searchParams.detailId);
  const validId = !isNaN(detailId) && detailId > 0 ? detailId : undefined;

  const dataCharacters = await fetchCharacters(search, Number(params.pagesID));
  const characters = dataCharacters.results;

  let selectedCharacterOnPage = characters.find((item) => item.id === validId);
  if (!selectedCharacterOnPage && validId !== undefined) {
    selectedCharacterOnPage = await fetchCharacter(validId);
  }
  const isShowRightPanel = validId !== undefined && selectedCharacterOnPage !== undefined;

  const urlData: PageSearchDetailURL = {
    search: search,
    page: Number(params.pagesID),
    detailId: detailId,
  };

  return (
    <div>
      <div className='d-flex page'>
        <div className='flex-grow-1'>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>

          <SearchGroup urlData={urlData} />

          <ListWrapperCloseRightPanel urlData={urlData}>
            <section className='d-flex flex-wrap justify-content-around'>
              {characters.length > 0 ? (
                characters.map((character) => (
                  <CharacterCard key={character.id} character={character} isDetailCard={false} urlData={urlData} />
                ))
              ) : (
                <p>Try searching for something else (Butter Robot, Abradolf Lincler, Rick, Morty)</p>
              )}
            </section>

            <Pagination urlData={urlData} pages={dataCharacters.info.pages} />
          </ListWrapperCloseRightPanel>
        </div>
        <RightPanel character={selectedCharacterOnPage} isShowRightPanel={isShowRightPanel} urlData={urlData} />
      </div>
      <BottomPanel />
    </div>
  );
}

async function fetchCharacters(search: string = '', page: number = 1): Promise<InfoResults> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(search)}`,
  );
  if (!response.ok && response.status === 404) {
    return {
      info: {
        count: 0,
        pages: 0,
      },
      results: [],
    };
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();

  return {
    info: {
      count: data.info.count,
      pages: data.info.pages,
    },
    results: data.results,
  };
}

async function fetchCharacter(id: number): Promise<Character | undefined> {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok && response.status === 404) {
    return undefined;
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();

  return data;
}
