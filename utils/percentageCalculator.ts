// export function percentageCalculator(
//   originalPrice: number,
//   discountPrice: number
// ): string {
//   if (originalPrice <= 0) return "0%";
//   if (discountPrice < 0) return "0%";

//   const discount = originalPrice - discountPrice;
//   const percentage = (discount / originalPrice) * 100;

//   return percentage.toFixed(2) + "%";
// }

export function percentageCalculator(
  originalPrice: number,
  discountPrice: number
): string {
  if (originalPrice <= 0) return "0%";
  if (discountPrice < 0) return "0%";

  const percentage = (discountPrice / originalPrice) * 100;

  return percentage.toFixed(2) + "%";
}
