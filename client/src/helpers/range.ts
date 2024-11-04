function range(length: number, start?: number, step?: number): Array<number> {
  return Array.from({ length }, (_, i) => (start || 0) + i * (step || 1));
}

export default range;
