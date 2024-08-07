import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CharacterCardList from './CharacterCardList';
import { Character } from '../../types';
import { sampleCharacters } from '../../../tests/testData';

const mockCharacters: Character[] = sampleCharacters;

const mockStore = configureStore([]);
const initialState = {
  cards: {
    selectedCards: [],
  },
};

describe('CharacterCardList', () => {
  it('renders a list of characters', () => {
    const mockOnCardClick = vi.fn();

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CharacterCardList characters={mockCharacters} onCardClick={mockOnCardClick} />
      </Provider>,
    );

    expect(screen.getAllByText(/Rick Sanchez/i)).toHaveLength(1);
    expect(screen.getAllByText(/Morty Smith/i)).toHaveLength(1);
  });

  it('calls onCardClick when a character card is clicked', () => {
    const mockOnCardClick = vi.fn();

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CharacterCardList characters={mockCharacters} onCardClick={mockOnCardClick} />
      </Provider>,
    );

    // Click on the first character card
    fireEvent.click(screen.getByText(/Rick Sanchez/i));

    expect(mockOnCardClick).toHaveBeenCalled();
    expect(mockOnCardClick.mock.calls[0][0]).toBe(1); // Check the first argument of the first call
  });

  it('renders a message when there are no characters', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CharacterCardList characters={[]} onCardClick={vi.fn()} />
      </Provider>,
    );

    expect(screen.getByText(/Try search something else/i)).toBeInTheDocument();
  });
});
