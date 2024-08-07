import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BottomPanel } from './BottomPanel';
import { RootState } from '../../state/store';
import { deselectAllCards } from '../../state/slices/cardsSlice';
import { useTheme } from '../../hooks/useTheme';
import { singleCharacter } from '../../../tests/testData';
import { charactersApi } from '../../state/slices/charactersApi';
import { downloadAsCSV } from '../../libs/downloadAsCSV';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

vi.mock('../../libs/downloadAsCSV');

type CharactersApiState = ReturnType<typeof charactersApi.reducer>;

const mockStore = configureStore<RootState>([]);

describe('BottomPanel', () => {
  it('renders correctly with selected cards', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: false });

    const initialState: RootState = {
      cards: { selectedCards: singleCharacter },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>,
    );

    expect(screen.getByText(/1 item is selected/i)).toBeInTheDocument();
  });

  it('calls deselectAllCards when "Unselect all" button is clicked', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: false });

    const initialState: RootState = {
      cards: { selectedCards: singleCharacter },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>,
    );

    const unselectButton = screen.getByText(/unselect all/i);
    fireEvent.click(unselectButton);

    expect(store.dispatch).toHaveBeenCalledWith(deselectAllCards());
  });

  it('calls downloadAsCSV when "Download" button is clicked', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: false });

    const initialState: RootState = {
      cards: { selectedCards: singleCharacter },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    const mockCreateObjectURL = vi.fn();
    window.URL.createObjectURL = mockCreateObjectURL;

    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>,
    );

    const downloadButton = screen.getByText(/download/i);
    fireEvent.click(downloadButton);

    expect(downloadAsCSV).toHaveBeenCalledWith(singleCharacter);
  });

  it('renders buttons with correct classes based on theme', () => {
    (useTheme as Mock).mockReturnValue({ darkTheme: true });

    const initialState: RootState = {
      cards: { selectedCards: singleCharacter },
      charactersApi: {} as CharactersApiState,
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>,
    );

    const unselectButton = screen.getByText(/unselect all/i);
    const downloadButton = screen.getByText(/download/i);

    expect(unselectButton).toHaveClass('btn-outline-warning');
    expect(downloadButton).toHaveClass('btn-outline-primary');
  });
});
