const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];


export function dateFormatter(str: string, now: Date = new Date()) {
    const date = new Date(str);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const now_day = now.getDate();
    const now_month = now.getMonth();
    const now_year = now.getFullYear();

    if (day === now_day && month === now_month && year === now_year) return "Сегодня"

    else return `${day} ${MONTHS[month]}`
}

export function isOverdueDate(str: string, now: Date = new Date()): boolean {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return false;

    return date < now;
}
