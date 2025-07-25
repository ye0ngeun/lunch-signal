export function isRevealTime(): boolean {
  const now = new Date()
  const revealTime = new Date()
  revealTime.setHours(22, 30, 0, 0)
  return now >= revealTime
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}
