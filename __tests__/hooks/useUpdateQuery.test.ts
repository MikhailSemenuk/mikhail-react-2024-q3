import { useUpdateQuery } from '@/hooks/useUpdateQuery';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('useUpdateQuery', () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {},
    });
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useUpdateQuery({ page: 1, search: 'test', detailId: 42 }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.search).toBe('test');
    expect(result.current.detailId).toBe(42);
  });

  it('should set correct query params for only page', () => {
    const { result } = renderHook(() => useUpdateQuery({ page: 1, search: '', detailId: undefined }));

    act(() => {
      result.current.setCurrentPage(5);
    });

    expect(pushMock).toHaveBeenCalledWith('?page=5');
  });
});
