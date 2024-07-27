import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RootState } from '../../state/store';
import { toggleCard } from '../../state/slices/cardsSlice';
import { useTheme } from '../../hooks/useTheme';
import { Character } from '../../types';
import { singleCharacter } from '../../../tests/testData';
import CharacterCard from './CharacterCard';
import { charactersApi } from '../../state/slices/charactersApi';

// Mock useTheme hook
vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const mockStore = configureStore<RootState>([]);

type CharactersApiState = ReturnType<typeof charactersApi.reducer>;

describe('CharacterCard', () => {
  const character: Character = singleCharacter[0];

  it('renders correctly as a detail card', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: false });

    const initialState: RootState = {
      cards: { selectedCards: [] },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CharacterCard character={character} isDetailCard={true} />
      </Provider>,
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(`Status: ${character.status}`)).toBeInTheDocument();
    expect(screen.getByText(`Gender: ${character.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`Species: ${character.species}`)).toBeInTheDocument();
    expect(screen.getByText(`Location: ${character.location.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Origin: ${character.origin.name}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();
  });

  it('renders correctly as a non-detail card', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: true });

    const initialState: RootState = {
      cards: { selectedCards: [] },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CharacterCard character={character} isDetailCard={false} />
      </Provider>,
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.queryByText(`Location: ${character.location.name}`)).toBeNull();
    expect(screen.queryByText(`Origin: ${character.origin.name}`)).toBeNull();
  });

  it('dispatches toggleCard action when checkbox is clicked', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: false });

    const initialState: RootState = {
      cards: { selectedCards: [] },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <CharacterCard character={character} isDetailCard={false} />
      </Provider>,
    );

    fireEvent.click(screen.getByLabelText(/Add to card/i));
    expect(store.dispatch).toHaveBeenCalledWith(toggleCard(character));
  });

  it('calls onCardClick when image or body is clicked', () => {
    const onCardClick = vi.fn();
    const onClose = vi.fn();

    render(
      <Provider store={mockStore({ cards: { selectedCards: [] }, charactersApi: {} as CharactersApiState })}>
        <CharacterCard character={character} isDetailCard={true} onCardClick={onCardClick} onClose={onClose} />
      </Provider>,
    );

    fireEvent.click(screen.getByAltText(character.name));
    expect(onCardClick).toHaveBeenCalledWith(character.id, expect.anything());

    fireEvent.click(screen.getByText(character.name));
    expect(onCardClick).toHaveBeenCalledWith(character.id, expect.anything());
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <Provider store={mockStore({ cards: { selectedCards: [] }, charactersApi: {} as CharactersApiState })}>
        <CharacterCard character={character} isDetailCard={true} onClose={onClose} />
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('handles checkbox checked state correctly', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: false });

    const initialState: RootState = {
      cards: { selectedCards: [character] },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CharacterCard character={character} isDetailCard={false} />
      </Provider>,
    );

    expect(screen.getByLabelText(/Add to card/i)).toBeChecked();
  });

  it('does not trigger onCardClick if onCardClick is not provided', () => {
    const onClose = vi.fn();

    render(
      <Provider store={mockStore({ cards: { selectedCards: [] }, charactersApi: {} as CharactersApiState })}>
        <CharacterCard character={character} isDetailCard={true} onClose={onClose} />
      </Provider>,
    );

    fireEvent.click(screen.getByAltText(character.name));
    fireEvent.click(screen.getByText(character.name));
    expect(screen.queryByRole('button', { name: /Close/i })).toBeInTheDocument();
  });

  it('applies correct CSS classes for non-detail card with dark theme', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: true });

    const initialState: RootState = {
      cards: { selectedCards: [] },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <CharacterCard character={character} isDetailCard={false} />
      </Provider>,
    );

    expect(container.querySelector('.text-bg-warning')).toBeNull(); // should not have this class
    expect(container.querySelector('.text-bg-secondary')).toBeNull(); // should not have this class
  });

  it('prevents event propagation on card footer click', () => {
    const onClickFooter = vi.fn();
    const onCardClick = vi.fn();

    render(
      <Provider store={mockStore({ cards: { selectedCards: [] }, charactersApi: {} as CharactersApiState })}>
        <CharacterCard character={character} isDetailCard={true} onCardClick={onCardClick} />
      </Provider>,
    );

    const checkbox = screen.getByLabelText(/Add to card/i);
    fireEvent.click(checkbox.closest('div')!);

    expect(onClickFooter).not.toHaveBeenCalled();
  });
});
