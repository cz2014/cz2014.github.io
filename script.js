// Global variable for our timeout reference
let mouseOutTimer = null;

// Immediately swap image on hover
function showImageOnHover(hoverSrc) {
  // Clear any existing timer so we don't revert while hovering quickly between items
  if (mouseOutTimer) {
    clearTimeout(mouseOutTimer);
    mouseOutTimer = null;
  }

  // Immediately set the figure to the hovered image
  const fig = document.getElementById('main-figure');
  if (fig) fig.src = hoverSrc;
}

// Delay revert by 100ms
function revertImage(defaultSrc) {
  mouseOutTimer = setTimeout(() => {
    const fig = document.getElementById('main-figure');
    if (fig) fig.src = defaultSrc;
    mouseOutTimer = null;
  }, 100);
}

// Touch support for mobile: tap to swap image
document.addEventListener('DOMContentLoaded', function() {
  var links = document.querySelectorAll('[onmouseover]');
  links.forEach(function(link) {
    link.addEventListener('touchstart', function(e) {
      var hoverSrc = this.getAttribute('onmouseover').match(/'([^']+)'/);
      if (hoverSrc) showImageOnHover(hoverSrc[1]);
    }, {passive: true});
  });
});
