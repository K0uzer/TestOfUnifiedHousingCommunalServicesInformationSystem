export function formatInitialValues(values: number[]): string {
    if (!values.length) {
        return '—';
    }

    return values.join(', ');
}