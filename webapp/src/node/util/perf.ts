const MS_PER_NS = 1e-6;

export function measure () {
  const startTime = process.hrtime();

  return function () {
    const diffTime = process.hrtime(startTime);
    return Math.round(diffTime[0] / 1000 + diffTime[1] * MS_PER_NS);
  };
}
