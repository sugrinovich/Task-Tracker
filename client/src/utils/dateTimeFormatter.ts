const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

// "10 окт 2026"
export function datePartFormatter(str: string): string {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return "Дата не указана";

    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
