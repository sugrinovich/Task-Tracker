// Маска поля даты: "12112026" → "12.11.2026"
export function formatDateInput(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 8);

    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;

    return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

// "12.11.2026" → Date (начало дня); null — если формат неверный или такой даты нет (31.02)
export function parseDateInput(value: string): Date | null {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
    if (!match) return null;

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);
    const date = new Date(year, month - 1, day);

    const isRealDate = date.getFullYear() === year
        && date.getMonth() === month - 1
        && date.getDate() === day;

    return isRealDate ? date : null;
}

// Date → "12.11.2026"
export function toDateInput(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");

    return `${day}.${month}.${date.getFullYear()}`;
}
