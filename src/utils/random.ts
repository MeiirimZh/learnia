export function getRandomNumberInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function shuffle<T>(array: T[]): T[] {
    const result = [...array];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
};

export function getRandomNElementsFromArray<T>(n: number, array: T[]): T[] {
    const copy = [...array];
    const result: T[] = [];

    while (result.length !== n) {
        let index = getRandomNumberInRange(0, copy.length - 1);

        if (!result.includes(copy[index])) {
            result.push(copy[index]);
            copy.splice(index, 1);
        }
    }

    return result;
};