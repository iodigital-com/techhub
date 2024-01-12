export const shuffle = (arr: any[]) => arr.toSorted(() => (Math.random() > 0.5 ? 1 : -1));
