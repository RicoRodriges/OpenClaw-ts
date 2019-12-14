export function popRandomItem<T>(arr: T[], chance: number | undefined = undefined): T | null {
    if (arr.length > 0 && (chance === undefined || Math.random() <= chance)) {
        const i = arr.length === 1 ? 0 : (Math.floor(Math.random() * 100) % arr.length);
        return arr[i];
    }
    return null;
}
