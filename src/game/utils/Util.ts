export function popRandomItem<T>(arr: T[], chance: number | null = null): T | null {
    if (arr.length > 0) {
        const rand = Math.random();
        if (chance === null || rand <= chance) {
            const i = arr.length === 1 ? 0 : ((~~(rand * 100)) % arr.length);
            return arr[i];
        }
    }
    return null;
}
