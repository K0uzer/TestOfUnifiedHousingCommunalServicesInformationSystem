import { MAX_VISIBLE_PAGES } from '@constans';

export type PaginationItem = number | 'ellipsis';

export function getPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const current = currentPage + 1;
  const items: PaginationItem[] = [1];

  const leftBound = Math.max(2, current - 1);
  const rightBound = Math.min(totalPages - 1, current + 1);

  if (leftBound > 2) {
    items.push('ellipsis');
  } else {
    for (let page = 2; page < leftBound; page += 1) {
      items.push(page);
    }
  }

  for (let page = leftBound; page <= rightBound; page += 1) {
    items.push(page);
  }

  if (rightBound < totalPages - 1) {
    items.push('ellipsis');
  } else {
    for (let page = rightBound + 1; page < totalPages; page += 1) {
      items.push(page);
    }
  }

  items.push(totalPages);

  return items;
}
