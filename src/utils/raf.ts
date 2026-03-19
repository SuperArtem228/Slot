/** Request animation frame wrapper with cancel support. */
export function onNextFrame(callback: () => void): () => void {
  const id = requestAnimationFrame(callback);
  return () => cancelAnimationFrame(id);
}
