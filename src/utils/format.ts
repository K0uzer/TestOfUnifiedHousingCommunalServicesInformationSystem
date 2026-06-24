import type { Area } from '../types';

const METER_TYPE_LABELS: Record<string, string> = {
  ColdWaterAreaMeter: 'ХВС',
  HotWaterAreaMeter: 'ГВС',
};

export function formatMeterType(types: string[]): string {
  for (const type of types) {
    const label = METER_TYPE_LABELS[type];
    if (label) {
      return label;
    }
  }

  return types[0] ?? '—';
}

export function getMeterTypeKey(types: string[]): 'hvs' | 'gvs' | null {
  if (types.includes('ColdWaterAreaMeter')) {
    return 'hvs';
  }

  if (types.includes('HotWaterAreaMeter')) {
    return 'gvs';
  }

  return null;
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function formatAutomatic(value: boolean | null): string {
  if (value === null) {
    return '—';
  }

  return value ? 'Да' : 'Нет';
}

export function formatInitialValues(values: number[]): string {
  if (!values.length) {
    return '—';
  }

  return values.join(', ');
}

export function formatAddress(area: Area | undefined): string {
  if (!area) {
    return '—';
  }

  const apartment = area.str_number_full || `кв. ${area.number}`;

  return `${area.house.address}, ${apartment}`;
}
