export const shuffle = <T>(arr: T[]) => arr.toSorted(() => (Math.random() > 0.5 ? 1 : -1));
