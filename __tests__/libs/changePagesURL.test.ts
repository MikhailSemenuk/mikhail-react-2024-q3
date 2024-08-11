import { changePagesURL } from '@/libs/changePagesURL';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PageSearchDetailURL } from '@/types';

// Mock the AppRouterInstance
const mockRouter = {
  push: jest.fn(),
} as unknown as AppRouterInstance;

describe('changePagesURL', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset any global state or mocks if necessary
  });

  it('should update the URL with search and detailId and page', () => {
    const urlData: PageSearchDetailURL = {
      search: 'test',
      detailId: 123,
      page: 2,
    };

    changePagesURL(mockRouter, urlData);

    expect(mockRouter.push).toHaveBeenCalledWith('/pages/2?search=test&detailId=123');
  });

  it('should update the URL with search and page only when detailId is not provided', () => {
    const urlData: PageSearchDetailURL = {
      search: 'test',
      detailId: undefined,
      page: 2,
    };

    changePagesURL(mockRouter, urlData);

    expect(mockRouter.push).toHaveBeenCalledWith('/pages/2?search=test');
  });

  it('should update the URL with detailId and page only when search is not provided', () => {
    const urlData: PageSearchDetailURL = {
      search: '',
      detailId: 123,
      page: 2,
    };

    changePagesURL(mockRouter, urlData);

    expect(mockRouter.push).toHaveBeenCalledWith('/pages/2?detailId=123');
  });

  it('should handle empty urlData by removing all query parameters', () => {
    const urlData: PageSearchDetailURL = {
      search: '',
      detailId: undefined,
      page: 2,
    };

    changePagesURL(mockRouter, urlData);

    expect(mockRouter.push).toHaveBeenCalledWith('/pages/2?');
  });

  it('should remove query parameters if not provided in urlData', () => {
    const urlData: PageSearchDetailURL = {
      search: '',
      detailId: 456,
      page: 3,
    };

    changePagesURL(mockRouter, urlData);

    expect(mockRouter.push).toHaveBeenCalledWith('/pages/3?detailId=456');
  });
});
