import { AREAS_URL } from '@constans';
import type { Area, PaginatedResponse } from '../types';

export async function fetchAreasByIds(
  ids: string[],
  signal?: AbortSignal
): Promise<PaginatedResponse<Area>> {
  const params = new URLSearchParams();
  for (const id of ids) {
    params.append('id__in', id);
  }

  const url = `${AREAS_URL}?${params.toString()}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка адресов: ${response.status}`);
  }

  return response.json();
}
