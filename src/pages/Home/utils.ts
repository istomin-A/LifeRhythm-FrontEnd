export function fotmatedAt(goalCreatedAt: string) {
  const format = new Date(goalCreatedAt).toLocaleString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return format
}