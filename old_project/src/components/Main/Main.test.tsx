import { describe, it, expect, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import { useNavigate, useParams } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import { useSearchAndPagination } from '../../hooks/useSearchAndPagination';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../../state/slices/cardsSlice';
import { charactersApi } from '../../state/slices/charactersApi';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

vi.mock('../../hooks/useCharacters', () => ({
  useCharacters: vi.fn(),
}));

vi.mock('../../hooks/useSearchAndPagination', () => ({
  useSearchAndPagination: vi.fn(),
}));

describe('Main', () => {
  it('renders main component', () => {
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useParams as Mock).mockReturnValue({ page: '1' });
    (useCharacters as Mock).mockReturnValue({
      characters: [],
      pages: 0,
      isLoading: false,
    });
    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: vi.fn(),
      currentPage: 1,
      setCurrentPage: vi.fn(),
      detailsURL: undefined,
      isDetailsNumber: true,
    });

    const store = configureStore({
      reducer: {
        cards: cardsReducer,
        [charactersApi.reducerPath]: charactersApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
    });

    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    expect(screen.getByText('Characters from Rick and Morty')).toBeInTheDocument();
  });

  it('shows and hides RightPanel based on isShowRightPanel', () => {
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useParams as Mock).mockReturnValue({ page: '1' });
    (useCharacters as Mock).mockReturnValue({
      characters: [],
      pages: 0,
      isLoading: false,
    });

    const setUserSearchMock = vi.fn();
    const setCurrentPageMock = vi.fn();

    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: setUserSearchMock,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      detailsURL: 1,
      isDetailsNumber: true,
    });

    const store = configureStore({
      reducer: {
        cards: cardsReducer,
        [charactersApi.reducerPath]: charactersApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
    });

    const { rerender } = render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    expect(screen.getByTestId('right-panel')).toBeInTheDocument();

    // Change detailsURL on undefined
    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: setUserSearchMock,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      detailsURL: undefined,
      isDetailsNumber: true,
    });

    rerender(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    expect(screen.queryByTestId('right-panel')).not.toBeInTheDocument();
  });

  it('opens RightPanel when openRightPanel is called', () => {
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useParams as Mock).mockReturnValue({ page: '1' });
    (useCharacters as Mock).mockReturnValue({
      characters: [],
      pages: 0,
      isLoading: false,
    });

    const setUserSearchMock = vi.fn();
    const setCurrentPageMock = vi.fn();

    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: setUserSearchMock,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      detailsURL: undefined,
      isDetailsNumber: true,
    });

    const store = configureStore({
      reducer: {
        cards: cardsReducer,
        [charactersApi.reducerPath]: charactersApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
    });

    const { rerender } = render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: setUserSearchMock,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      detailsURL: 1,
      isDetailsNumber: true,
    });

    rerender(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    expect(screen.getByTestId('right-panel')).toBeInTheDocument();
  });

  it('closes RightPanel when closeRightPanel is called', () => {
    (useNavigate as Mock).mockReturnValue(vi.fn());
    (useParams as Mock).mockReturnValue({ page: '1' });
    (useCharacters as Mock).mockReturnValue({
      characters: [],
      pages: 0,
      isLoading: false,
    });

    const setUserSearchMock = vi.fn();
    const setCurrentPageMock = vi.fn();

    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: setUserSearchMock,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      detailsURL: 1,
      isDetailsNumber: true,
    });

    const store = configureStore({
      reducer: {
        cards: cardsReducer,
        [charactersApi.reducerPath]: charactersApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
    });

    const { rerender } = render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    (useSearchAndPagination as Mock).mockReturnValue({
      userSearch: '',
      setUserSearch: setUserSearchMock,
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
      detailsURL: undefined,
      isDetailsNumber: true,
    });

    rerender(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    expect(screen.queryByTestId('right-panel')).not.toBeInTheDocument();
  });
});
