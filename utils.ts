export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Simple async pool for concurrency control
export async function asyncPool<T, R>(
  concurrency: number,
  items: T[],
  iteratorFn: (item: T) => Promise<R>
): Promise<R[]> {
  const ret: Promise<R>[] = [];
  const executing: Promise<any>[] = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (concurrency <= items.length) {
      const e: Promise<any> = p.then(() =>
        executing.splice(executing.indexOf(e), 1)
      );
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

// Progress bar helper
export const renderBar = (done: number, total: number, width = 30) => {
  const percent = done / total;
  const filled = Math.round(percent * width);
  const empty = width - filled;
  const bar = "█".repeat(filled) + "-".repeat(empty);
  const pct = (percent * 100).toFixed(1);
  return `[${bar}] ${done}/${total} (${pct}%)`;
};
