export default function formatCurrency(
  amount: number,
  currency: string = "NGN",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
}
