import { METERS_URL } from '@constans';
import type { Meter, PaginatedResponse } from '../types';

export async function fetchMeters(
  limit: number,
  offset: number,
  signal?: AbortSignal
): Promise<PaginatedResponse<Meter>> {
  const url = `${METERS_URL}?limit=${limit}&offset=${offset}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка счётчиков: ${response.status}`);
  }

  return response.json();
}
