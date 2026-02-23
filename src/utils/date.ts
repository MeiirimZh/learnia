export function getYearMonthDayFromDateString(dateString: string) {
    const date = new Date(dateString);
    return [ date.getFullYear(), date.getMonth() + 1, date.getDate() ] as const;
};

export function getFormattedMonthFromDateString(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", { month: "long" });
};

export function getFormattedMonthDayFromDateString(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short"
    });
};