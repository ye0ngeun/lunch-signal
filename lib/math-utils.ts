export function getProgressPercentage(current: number, target: number): number {
  return Math.min((current / target) * 100, 100)
}
