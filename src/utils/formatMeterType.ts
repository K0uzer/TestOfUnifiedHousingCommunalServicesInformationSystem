import { METER_TYPE_LABELS } from '@constans';

export function formatMeterType(types: string[]): string {
    for (const type of types) {
        const label = METER_TYPE_LABELS[type];
        if (label) {
            return label;
        }
    }

    return types[0] ?? '—';
}