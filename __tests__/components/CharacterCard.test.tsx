import { render, fireEvent } from '@testing-library/react';
import CharacterCard from '@/components/CharacterCard';
import { useCharacterContext } from '@/components/CharacterContext';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'next/navigation';
import { changePagesURL } from '@/libs/changePagesURL';
import { singleCharacter } from '../data/testData';

jest.mock('@/components/CharacterContext', () => ({
  useCharacterContext: jest.fn(),
}));

jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/libs/changePagesURL', () => ({
  changePagesURL: jest.fn(),
}));

describe('CharacterCard', () => {
  const character = singleCharacter;
  const mockToggleCard = jest.fn();
  const mockIsCardCheckedId = jest.fn();
  const mockOnClose = jest.fn();
  const mockChangePagesURL = changePagesURL as jest.MockedFunction<typeof changePagesURL>;
  const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

  beforeEach(() => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      isCardCheckedId: mockIsCardCheckedId,
      toggleCard: mockToggleCard,
    });

    (useTheme as jest.Mock).mockReturnValue({
      darkTheme: false,
    });

    mockIsCardCheckedId.mockReturnValue(false);

    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', () => {
    const { getByText, getByAltText } = render(
      <CharacterCard
        character={character}
        isDetailCard={false}
        urlData={{ search: '', page: 1, detailId: undefined }}
      />,
    );

    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByText('Status: Alive')).toBeInTheDocument();
    expect(getByText('Gender: Male')).toBeInTheDocument();
    expect(getByText('Species: Human')).toBeInTheDocument();
    expect(getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('toggles checkbox when clicked', () => {
    const { getByRole } = render(
      <CharacterCard
        character={character}
        isDetailCard={false}
        urlData={{ search: '', page: 1, detailId: undefined }}
      />,
    );

    fireEvent.click(getByRole('checkbox'));
    expect(mockToggleCard).toHaveBeenCalledWith(character);
  });

  it('renders close button and triggers onClose when clicked in detail mode', () => {
    const { getByLabelText } = render(
      <CharacterCard
        character={character}
        isDetailCard={true}
        urlData={{ search: '', page: 1, detailId: undefined }}
        onClose={mockOnClose}
      />,
    );

    fireEvent.click(getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('applies dark theme classes when dark theme is enabled', () => {
    (useTheme as jest.Mock).mockReturnValue({
      darkTheme: true,
    });

    const { container } = render(
      <CharacterCard
        character={character}
        isDetailCard={true}
        urlData={{ search: '', page: 1, detailId: undefined }}
      />,
    );

    expect(container.firstChild).toHaveClass('text-bg-secondary');
  });

  it('calls changePagesURL with updated URL data when image is clicked', () => {
    const { getByAltText } = render(
      <CharacterCard
        character={character}
        isDetailCard={false}
        urlData={{ search: '', page: 1, detailId: undefined }}
      />,
    );

    fireEvent.click(getByAltText('Rick Sanchez'));
    expect(mockChangePagesURL).toHaveBeenCalledWith(expect.any(Object), {
      search: '',
      page: 1,
      detailId: character.id,
    });
  });
});
