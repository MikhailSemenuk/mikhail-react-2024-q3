import { NavigateFunction } from 'react-router-dom';

export default function updateURL(searchParams: URLSearchParams, navigate: NavigateFunction, id: number | undefined) {
  const newSearchParams = new URLSearchParams(searchParams);
  if (id === undefined) {
    newSearchParams.delete('details');
  } else {
    newSearchParams.set('details', id.toString());
  }

  navigate(`${location.pathname}?${newSearchParams.toString()}`);
}
