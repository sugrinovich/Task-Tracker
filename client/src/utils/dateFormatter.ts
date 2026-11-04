const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];


export function dateFormatter(str: string, now: Date = new Date()) {
    const date = new Date(str);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const isToday = day === now.getDate()
        && month === now.getMonth()
        && year === now.getFullYear();

    if (isToday) return "Сегодня";

    return `${day} ${MONTHS[month]}`;
}
