const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

export function datePartFormatter(str: string): string {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return "Дата не указана";

    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function timePartFormatter(str: string): string {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return "--:--";

    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}


export function dateTimeFormatter(str: string): string {
    return `${datePartFormatter(str)}, ${timePartFormatter(str)}`;
}
