export const smoothScrolling = (containerRef, recentMovie) => {
  const container = containerRef.current;
  const { imdbID } = recentMovie;
  const target = container?.querySelector(`[data-key="${imdbID}"]`);
  if (target) {
    target.scrollIntoView({
      behavior: "smooth", // Smooth scrolling
      block: "center", // Align in the center
    });
  }
};
