import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useUpdateQuery } from '@/hooks/useUpdateQuery';
import Page, { getServerSideProps } from '@/pages/page/[page]';
import { singleCharacterArray } from '../data/testData';
import fetchCharacters from '@/pages/page/fetchCharacters';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useUpdateQuery', () => ({
  useUpdateQuery: jest.fn(),
}));

jest.mock('@/pages/page/fetchCharacters', () => jest.fn());

jest.mock('@/components/CharacterCard', () => {
  const CharacterCard = (props: { [key: string]: unknown }) => <div data-testid='character-card' {...props} />;
  CharacterCard.displayName = 'CharacterCard';
  return CharacterCard;
});

jest.mock('@/components/SearchGroup', () => {
  const SearchGroup = (props: { [key: string]: unknown }) => <div data-testid='search-group' {...props} />;
  SearchGroup.displayName = 'SearchGroup';
  return SearchGroup;
});

jest.mock('@/components/RightPanel', () => {
  const RightPanel = (props: { [key: string]: unknown }) => <div data-testid='right-panel' {...props} />;
  RightPanel.displayName = 'RightPanel';
  return RightPanel;
});

jest.mock('@/components/BottomPanel', () => {
  const BottomPanel = () => <div data-testid='bottom-panel' />;
  BottomPanel.displayName = 'BottomPanel';
  return { BottomPanel };
});

jest.mock('@/components/Pagination', () => {
  const Pagination = (props: { [key: string]: unknown }) => <div data-testid='pagination' {...props} />;
  Pagination.displayName = 'Pagination';
  return Pagination;
});

describe('Page Component', () => {
  let originalConsoleWarn: () => void;
  let originalConsoleError: () => void;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    (useUpdateQuery as jest.Mock).mockReturnValue({
      currentPage: 1,
      setCurrentPage: jest.fn(),
      search: '',
      setSearch: jest.fn(),
      detailId: undefined,
      setDetailId: jest.fn(),
    });

    originalConsoleWarn = console.warn;
    originalConsoleError = console.error;

    console.warn = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;

    jest.clearAllMocks();
  });

  it('renders correctly with characters', () => {
    render(<Page characters={singleCharacterArray} totalPages={5} />);

    expect(screen.getByText('Characters from Rick and Morty')).toBeInTheDocument();
    expect(screen.getByTestId('search-group')).toBeInTheDocument();
    expect(screen.getAllByTestId('character-card').length).toBe(singleCharacterArray.length);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-panel')).toBeInTheDocument();
  });
});

jest.mock('@/pages/page/fetchCharacters', () => jest.fn());

describe('getServerSideProps', () => {
  it('fetches characters and returns props', async () => {
    const mockData = {
      results: singleCharacterArray,
      info: { pages: 10 },
    };
    (fetchCharacters as jest.Mock).mockResolvedValueOnce(mockData);

    const context: Partial<GetServerSidePropsContext> = {
      query: { page: '1', search: 'Rick' },
      req: {} as NextApiRequest,
      res: {} as NextApiResponse,
      resolvedUrl: '',
      params: {},
    };

    const response = await getServerSideProps(context as GetServerSidePropsContext);

    expect(fetchCharacters).toHaveBeenCalledWith('Rick', 1);
    expect(response).toEqual({
      props: {
        characters: mockData.results,
        totalPages: mockData.info.pages,
      },
    });
  });
});
