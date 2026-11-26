export function formatMoney(minor: number, currency = "KES"): string {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency, maximumFractionDigits: 0 }).format(minor / 100);
}
