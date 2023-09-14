function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function expansionDetailViews() {
  const classes = ["ts-see-more-fold", "ts-collapsed-string"];
  classes.forEach((cls) => {
    const elements = document.getElementsByClassName(cls);
    if (!elements) return;

    Array.from(elements).forEach((e) => {
      if (isInViewport(e)) {
        e.click();
        e.outerHTML = "";
      }
    });
  });
}

setTimeout(async () => {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expansionDetailViews();
  }
});
