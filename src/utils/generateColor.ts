export const generateColors = (count: number) => {
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = Math.floor(i * hueStep);
    const saturation = 70 + Math.floor(Math.random() * 20);
    const lightness = 50 + Math.floor(Math.random() * 10);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};
