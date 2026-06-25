import type { Area } from "../types";

export function formatAddress(area: Area | undefined): string {
    if (!area) {
        return '—';
    }

    const apartment = area.str_number_full || `кв. ${area.number}`;

    return `${area.house.address}, ${apartment}`;
}
