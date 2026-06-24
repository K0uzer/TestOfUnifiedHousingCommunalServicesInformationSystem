import { AREAS_URL } from '../Constans';
import type { Area, PaginatedResponse } from '../types';

export async function fetchAreasByIds(
  ids: string[],
  signal?: AbortSignal
): Promise<PaginatedResponse<Area>> {
  const url = `${AREAS_URL}?id__in=${ids.join(',')}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка адресов: ${response.status}`);
  }

  return response.json();
}
