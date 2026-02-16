// src/utils/calculateTotal.ts
export function calculateTotal(input: string): number {
  if (!input) return 0;

  // Split by newline or comma, trim spaces, parse numbers safely
  const parts = input.split(/[\n,]+/);
  return parts.reduce((sum, part) => {
    const num = parseFloat(part.trim());
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
}