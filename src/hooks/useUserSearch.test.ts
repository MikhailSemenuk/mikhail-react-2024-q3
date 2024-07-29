import { renderHook, act } from '@testing-library/react';
import useUserSearch from './useUserSearch';
import { getUserSearchLS, saveUserSearchLS } from '../libs/appLocalStorage';
import { beforeEach, describe, expect, it, Mock, MockedFunction, vi } from 'vitest';

vi.mock('../libs/appLocalStorage', () => ({
  getUserSearchLS: vi.fn() as MockedFunction<typeof getUserSearchLS>,
  saveUserSearchLS: vi.fn() as MockedFunction<typeof saveUserSearchLS>,
}));

describe('useUserSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with value from getUserSearchLS', () => {
    (getUserSearchLS as Mock).mockReturnValue('initialSearch');

    const { result } = renderHook(() => useUserSearch());

    expect(result.current[0]).toBe('initialSearch');
    expect(getUserSearchLS).toHaveBeenCalledTimes(1);
  });

  it('should update userSearch and call saveUserSearchLS', () => {
    (getUserSearchLS as Mock).mockReturnValue('initialSearch');

    const { result } = renderHook(() => useUserSearch());

    act(() => {
      result.current[1]('newSearch');
    });

    expect(result.current[0]).toBe('newSearch');
    expect(saveUserSearchLS).toHaveBeenCalledWith('newSearch');
    expect(saveUserSearchLS).toHaveBeenCalledTimes(1);
  });
});
