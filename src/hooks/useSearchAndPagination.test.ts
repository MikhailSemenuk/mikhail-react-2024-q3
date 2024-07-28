import { renderHook, act } from '@testing-library/react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import useUserSearch from './useUserSearch';
import { useSearchAndPagination } from './useSearchAndPagination';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('./useUserSearch', () => ({
  default: vi.fn(),
}));

describe('useSearchAndPagination', () => {
  const navigate = vi.fn();
  const setUserSearch = vi.fn();

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(navigate);
    (useUserSearch as Mock).mockReturnValue(['test search', setUserSearch]);
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams('?details=1')]);
  });

  it('should initialize with correct values', () => {
    (useParams as Mock).mockReturnValue({ page: '1' });

    const { result } = renderHook(() => useSearchAndPagination());

    expect(result.current.userSearch).toBe('test search');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.detailsURL).toBe(1);
  });

  it('should handle navigation to 404 if page or details is invalid', () => {
    (useParams as Mock).mockReturnValue({ page: 'invalid' });
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams('?details=NaN')]);

    renderHook(() => useSearchAndPagination());

    expect(navigate).toHaveBeenCalledWith('/404', { replace: true });
  });

  it('should update userSearch correctly', () => {
    (useParams as Mock).mockReturnValue({ page: '1' });

    const { result } = renderHook(() => useSearchAndPagination());

    act(() => {
      result.current.setUserSearch('new search');
    });

    expect(setUserSearch).toHaveBeenCalledWith('new search');
  });
});
