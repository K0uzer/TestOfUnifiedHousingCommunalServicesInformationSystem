import { METERS_URL } from '@constans';

export async function deleteMeter(
  meterId: string,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch(`${METERS_URL}${meterId}/`, {
    method: 'DELETE',
    signal,
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления: ${response.status}`);
  }
}
