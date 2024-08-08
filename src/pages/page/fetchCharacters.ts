import { InfoResults } from "@/types";

export default async function fetchCharacters(
  search: string = "",
  page: string = "1"
): Promise<InfoResults> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(
      search
    )}`
  );
  if (!response.ok && response.status === 404) {
    return {
      info: {
        count: 0,
        pages: 0,
      },
      results: [],
    };
  } else if (!response.ok) {
    throw new Error(`Network response was not ok (status ${response.status})`);
  }
  const data = await response.json();

  return {
    info: {
      count: data.info.count,
      pages: data.info.pages,
    },
    results: data.results,
  };
}
