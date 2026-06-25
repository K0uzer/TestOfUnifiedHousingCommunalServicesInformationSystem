export function getMeterTypeKey(types: string[]): 'hvs' | 'gvs' | null {
    if (types.includes('ColdWaterAreaMeter')) {
        return 'hvs';
    }

    if (types.includes('HotWaterAreaMeter')) {
        return 'gvs';
    }

    return null;
}