import { AREAS_URL } from '@constans';
import type { Area, PaginatedResponse } from '../types';

export async function fetchAreasByIds(
  ids: string[],
  signal?: AbortSignal,
): Promise<Area[]> {
  if (!ids.length) {
    return [];
  }

  const params = new URLSearchParams();
  for (const id of ids) {
    params.append('id__in', id);
  }

  const areas: Area[] = [];
  let url: string | null = `${AREAS_URL}?${params.toString()}`;

  while (url) {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Ошибка адресов: ${response.status}`);
    }

    const data: PaginatedResponse<Area> = await response.json();
    areas.push(...data.results);
    url = data.next;
  }

  return areas;
}
