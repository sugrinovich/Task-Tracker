const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const DAY_MS = 24 * 60 * 60 * 1000;


function startOfDay(date: Date): Date {
    const copy = new Date(date);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

function daysBetween(from: Date, to: Date): number {
    return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS);
}


// "14 ноя"
export function shortDateFormatter(str: string): string {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return "Без срока";

    return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

// "Сегодня" / "Завтра" / "14 ноя"
export function dateFormatter(str: string, now: Date = new Date()): string {
    const date = new Date(str);
    if (Number.isNaN(date.getTime())) return "Без срока";

    const days = daysBetween(now, date);
    if (days === 0) return "Сегодня";
    if (days === 1) return "Завтра";

    return shortDateFormatter(str);
}

// Сколько дней срок уже прошёл; null — если не просрочено или даты нет
export function overdueDays(str: string, now: Date = new Date()): number | null {
    const date = new Date(str);
    if (Number.isNaN(date.getTime()) || date >= now) return null;

    return daysBetween(date, now);
}

// 0 → "сегодня", 23 → "23 дн. назад"
export function overdueFormatter(days: number): string {
    return days === 0 ? "сегодня" : `${days} дн. назад`;
}
