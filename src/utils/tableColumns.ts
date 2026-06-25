import type { TABLE_COLUMNS } from '@constans';

export type TableColumnKey = (typeof TABLE_COLUMNS)[number]['key'];

export function getTableColClass(key: TableColumnKey | 'actions'): string {
  return `table__col--${key}`;
}

export function getTableDataClass(key: TableColumnKey | 'actions'): string {
  return `table__data--${key}`;
}

export function getTableHeaderClass(key: TableColumnKey | 'actions'): string {
  return `table__header--${key}`;
}
