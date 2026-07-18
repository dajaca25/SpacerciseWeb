// Hero carousel — auto-advances every 5 seconds, dots jump to a slide.
(function () {
  var track = document.getElementById('track');
  var dots = Array.prototype.slice.call(document.querySelectorAll('#dots button'));
  var slideCount = dots.length;
  var idx = 0;
  var SLIDE_SECONDS = 5;

  function render() {
    track.style.transform = 'translateX(-' + idx * 100 + '%)';
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === idx);
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      idx = i;
      render();
    });
  });

  setInterval(function () {
    idx = (idx + 1) % slideCount;
    render();
  }, SLIDE_SECONDS * 1000);
})();

// Email signup — front-end confirmation only (GitHub Pages is static; see README
// for hooking up a real mailing-list service).
(function () {
  var form = document.getElementById('signup-form');
  var btn = document.getElementById('signup-btn');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.textContent = 'Signed up ✓';
  });
})();
