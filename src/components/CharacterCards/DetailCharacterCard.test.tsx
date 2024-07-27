import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailCharacterCard } from './DetailCharacterCard';
import { Character } from '../../types';
import { singleCharacter } from '../../../tests/testData';

vi.mock('./CharacterCard', () => ({
  __esModule: true,
  default: vi.fn(() => <div>CharacterCard</div>),
}));

const mockCharacter: Character = singleCharacter[0];

describe('DetailCharacterCard', () => {
  it('renders CharacterCard when character is provided', () => {
    const onClose = vi.fn();

    render(<DetailCharacterCard character={mockCharacter} onClose={onClose} />);

    expect(screen.getByText('CharacterCard')).toBeInTheDocument();
  });

  it('does not render anything when character is undefined', () => {
    const onClose = vi.fn();

    const { container } = render(<DetailCharacterCard character={undefined} onClose={onClose} />);

    expect(container.firstChild).toBeNull();
  });
});
