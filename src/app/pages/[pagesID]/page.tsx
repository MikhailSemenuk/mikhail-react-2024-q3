import { InfoResults, PageSearchDetailURL } from '@/types';
import CharacterCardSimple from '@/components/CharacterCardSimple';
import SearchGroup from '@/components/SearchGroup';
import Pagination from '@/components/Pagination';

interface PageProps {
  params: {
    pagesID: string;
  };
  searchParams: {
    search?: string;
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const search = searchParams.search || '';

  const dataCharacters = await fetchCharacters(search, Number(params.pagesID));
  const characters = dataCharacters.results;
  // TODO: Think new name for urlData
  const urlData: PageSearchDetailURL = {
    search: search,
    page: Number(params.pagesID),
    detailId: undefined,
  };

  return (
    <div>
      <div className='d-flex'>
        <div className='flex-grow-1'>
          <h1 className='text-center mt-2'>Characters from Rick and Morty</h1>

          <SearchGroup urlData={urlData} />

          <div className='d-flex flex-column align-items-center'>
            <section className='d-flex flex-wrap justify-content-around'>
              {characters.length > 0 ? (
                characters.map((character) => (
                  <CharacterCardSimple key={character.id} character={character} isDetailCard={false} />
                ))
              ) : (
                <p>Try searching for something else (Butter Robot, Abradolf Lincler, Rick, Morty)</p>
              )}
            </section>

            <Pagination urlData={urlData} pages={dataCharacters.info.pages} />
          </div>
        </div>
        {/* {isShowRightPanel && (
          <RightPanel character={selectedCharacter} isShowRightPanel={isShowRightPanel} handleClose={closeRightPanel} />
        )} */}
      </div>
      {/* <BottomPanel /> */}
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
