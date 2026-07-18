// Hero carousel — slides are discovered at runtime by listing the
// images/slides/ folder through the GitHub contents API (GitHub Pages
// itself can't list directories). Drop any image into that folder and
// push: it becomes a slide, ordered by filename.
(function () {
  var REPO = 'dajaca25/SpacerciseWeb';
  var SLIDES_DIR = 'images/slides';
  var SLIDE_SECONDS = 5;
  var IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

  var track = document.getElementById('track');
  var dotsWrap = document.getElementById('dots');

  fetch('https://api.github.com/repos/' + REPO + '/contents/' + SLIDES_DIR)
    .then(function (res) { return res.ok ? res.json() : []; })
    .then(function (entries) {
      var files = (Array.isArray(entries) ? entries : [])
        .filter(function (e) { return e.type === 'file' && IMAGE_RE.test(e.name); })
        .sort(function (a, b) { return a.name.localeCompare(b.name, undefined, { numeric: true }); });
      if (files.length) start(files);
      // else: keep the placeholder slide that's already in the HTML
    })
    .catch(function () { /* API unreachable — placeholder stays */ });

  function start(files) {
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    var dots = [];
    var idx = 0;

    files.forEach(function (file, i) {
      var slide = document.createElement('div');
      slide.className = 'slide';
      var img = document.createElement('img');
      img.src = SLIDES_DIR + '/' + file.name;
      img.alt = 'Spacercise gameplay screenshot ' + (i + 1);
      slide.appendChild(img);
      track.appendChild(slide);

      var dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Go to screenshot ' + (i + 1));
      dot.addEventListener('click', function () { idx = i; render(); });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    function render() {
      track.style.transform = 'translateX(-' + idx * 100 + '%)';
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === idx);
      });
    }
    render();

    if (files.length > 1) {
      setInterval(function () {
        idx = (idx + 1) % files.length;
        render();
      }, SLIDE_SECONDS * 1000);
    }
  }
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
