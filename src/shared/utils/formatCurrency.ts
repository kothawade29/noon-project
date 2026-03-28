const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatProductPrice(value: number): string {
  return formatter.format(value);
}
