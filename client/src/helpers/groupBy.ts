function groupBy<T extends Record<string, any>, K extends keyof T = keyof T>(
  data: Array<T>,
  key: K
): Record<NonNullable<T[K]>, Array<T>> {
  return data.reduce((grouped, d) => {
    let gData = grouped[d[key]];
    return { ...grouped, [d[key]]: gData ? gData.concat(d) : [d] };
  }, {} as Record<NonNullable<T[K]>, Array<T>>);
}
export default groupBy;
