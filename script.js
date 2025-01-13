// Global variable for our timeout reference
let mouseOutTimer = null;

// Immediately swap image on hover
function showImageOnHover(hoverSrc) {
  // 1. Clear any existing timer so we don't revert while hovering quickly between items
  if (mouseOutTimer) {
    clearTimeout(mouseOutTimer);
    mouseOutTimer = null;
  }
  
  // 2. Immediately set the figure to the hovered image
  document.getElementById('main-figure').src = hoverSrc;
}

// Delay revert by 0.5 s
function revertImage(defaultSrc) {
  // 1. Set a timer to revert after 500ms
  mouseOutTimer = setTimeout(() => {
    document.getElementById('main-figure').src = defaultSrc;
    mouseOutTimer = null;
  }, 100);
}
