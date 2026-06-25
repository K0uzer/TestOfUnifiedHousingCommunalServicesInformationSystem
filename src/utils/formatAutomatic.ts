export function formatAutomatic(value: boolean | null): string {
    if (value === null) {
        return '—';
    }

    return value ? 'Да' : 'Нет';
}