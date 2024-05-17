export default function CalculateDate(date) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("ch-CH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
