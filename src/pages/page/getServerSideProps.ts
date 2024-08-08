import { GetServerSideProps } from 'next';
import fetchCharacters from './fetchCharacters';
import parseQueryContext from '@/libs/parseQueryContext';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page, search } = parseQueryContext(context.query);

  const data = await fetchCharacters(search, page);

  return {
    props: {
      characters: data.results,
      totalPages: data.info.pages,
    },
  };
};
