import { DetailCharacterCard } from '@/components/DetailCharacterCard';
import { singleCharacter } from '@/tests/testData';
import { Character } from '@/types';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/CharacterCard', () => ({
  __esModule: true,
  default: jest.fn(() => <div>CharacterCard</div>),
}));

const mockCharacter: Character = singleCharacter;

describe('DetailCharacterCard', () => {
  it('renders CharacterCard when character is provided', () => {
    const onClose = jest.fn();

    render(<DetailCharacterCard character={mockCharacter} onClose={onClose} />);

    expect(screen.getByText('CharacterCard')).toBeInTheDocument();
  });

  it('does not render anything when character is undefined', () => {
    const onClose = jest.fn();

    const { container } = render(<DetailCharacterCard character={undefined} onClose={onClose} />);

    expect(container.firstChild).toBeNull();
  });
});
