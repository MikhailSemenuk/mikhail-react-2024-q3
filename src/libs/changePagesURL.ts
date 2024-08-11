import { PageSearchDetailURL } from '@/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function changePagesURL(router: AppRouterInstance, urlData: PageSearchDetailURL) {
  const queryParams = new URLSearchParams(window.location.search);

  const search = urlData.search;
  const detailId = urlData.detailId;
  const page = urlData.page;

  if (search) {
    queryParams.set('search', search);
  } else {
    queryParams.delete('search');
  }

  if (detailId) {
    queryParams.set('detailId', String(detailId));
  } else {
    queryParams.delete('detailId');
  }

  router.push(`/pages/${page}?${queryParams.toString()}`);
}
