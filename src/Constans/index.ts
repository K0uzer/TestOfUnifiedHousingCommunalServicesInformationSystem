// Fetch
const URL = 'https://showroom.eis24.me';
const URN = '/c300/api/v4/test';

const API_BASE = URL + URN;

export const METERS_URL = `${API_BASE}/meters/`;
export const AREAS_URL = `${API_BASE}/areas/`;
export const PAGE_SIZE = 20;

export const METER_TYPE_LABELS: Record<string, string> = {
    ColdWaterAreaMeter: 'ХВС',
    HotWaterAreaMeter: 'ГВС',
};