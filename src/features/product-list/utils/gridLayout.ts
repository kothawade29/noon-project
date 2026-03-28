export const GRID_HORIZONTAL_PAD = 16;
export const GRID_COLUMN_GAP = 12;

export function getGridItemWidth(screenWidth: number): number {
  const inner = screenWidth - GRID_HORIZONTAL_PAD * 2;
  return (inner - GRID_COLUMN_GAP) / 2;
}
