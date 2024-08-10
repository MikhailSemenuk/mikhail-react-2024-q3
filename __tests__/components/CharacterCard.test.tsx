import { render, fireEvent } from '@testing-library/react';
import CharacterCard from '@/components/CharacterCard';
import { useCharacterContext } from '@/components/CharacterContext';
import { useTheme } from '@/hooks/useTheme';
import { singleCharacter } from '@/tests/testData';

jest.mock('@/components/CharacterContext', () => ({
  useCharacterContext: jest.fn(),
}));

jest.mock('@/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

describe('CharacterCard', () => {
  const character = singleCharacter;

  const mockToggleCard = jest.fn();
  const mockIsCardCheckedId = jest.fn();
  const mockOnCardClick = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      isCardCheckedId: mockIsCardCheckedId,
      toggleCard: mockToggleCard,
    });

    (useTheme as jest.Mock).mockReturnValue({
      darkTheme: false,
    });

    mockIsCardCheckedId.mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders character details correctly', () => {
    const { getByText, getByAltText } = render(<CharacterCard character={character} isDetailCard={false} />);

    expect(getByText('Rick Sanchez')).toBeInTheDocument();
    expect(getByText('Status: Alive')).toBeInTheDocument();
    expect(getByText('Gender: Male')).toBeInTheDocument();
    expect(getByText('Species: Human')).toBeInTheDocument();
    expect(getByAltText('Rick Sanchez')).toBeInTheDocument();
  });

  it('calls onCardClick when image is clicked', () => {
    const { getByAltText } = render(
      <CharacterCard character={character} isDetailCard={false} onCardClick={mockOnCardClick} />,
    );

    fireEvent.click(getByAltText('Rick Sanchez'));
    expect(mockOnCardClick).toHaveBeenCalledWith(character, expect.any(Object));
  });

  it('toggles checkbox when clicked', () => {
    const { getByRole } = render(<CharacterCard character={character} isDetailCard={false} />);

    fireEvent.click(getByRole('checkbox'));
    expect(mockToggleCard).toHaveBeenCalledWith(character);
  });

  it('renders close button and triggers onClose when clicked in detail mode', () => {
    const { getByLabelText } = render(
      <CharacterCard character={character} isDetailCard={true} onClose={mockOnClose} />,
    );

    fireEvent.click(getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('applies dark theme classes when dark theme is enabled', () => {
    (useTheme as jest.Mock).mockReturnValue({
      darkTheme: true,
    });

    const { container } = render(<CharacterCard character={character} isDetailCard={true} />);

    expect(container.firstChild).toHaveClass('text-bg-secondary');
  });
});
