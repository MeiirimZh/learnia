export function getTodayFormatted(): string {
    const date = new Date();
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

export function getNowFormatted(): string {
    const date = new Date();
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const year = date.getFullYear();
    const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
    const second = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
    return `${year}-${month}-${day}-${hour}-${minute}-${second}`;
};

export function getYearMonthDayFromDateString(dateString: string): Array<number> {
    const date = new Date(dateString);
    return [ date.getFullYear(), date.getMonth() + 1, date.getDate() ] as const;
};

export function getFormattedMonthFromDateString(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", { month: "long" });
};

export function getFormattedMonthDayFromDateString(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short"
    });
};