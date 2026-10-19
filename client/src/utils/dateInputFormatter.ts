export function formatDateInput(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;

    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

export function formatTimeInput(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    if (digits.length <= 2) return digits;

    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function isValidDateInput(value: string): boolean {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
    if (!match) return false;

    const [, dayValue, monthValue, yearValue] = match;
    const day = Number(dayValue);
    const month = Number(monthValue);
    const year = Number(yearValue);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date.getFullYear() === year
        && date.getMonth() === month - 1
        && date.getDate() === day
        && date >= today;
}

export function isValidTimeInput(value: string): boolean {
    const match = /^(\d{2}):(\d{2})$/.exec(value);
    if (!match) return false;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}
