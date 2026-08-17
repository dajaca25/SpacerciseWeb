// Design-page galleries — same discovery approach as the hero carousel:
// list each folder through the GitHub contents API (GitHub Pages can't list
// directories), falling back to a committed manifest when the API is
// rate-limited or unreachable. Drop images into the folder and push.
//
// The page ships with the current images already in the HTML, so the grid
// renders with no network at all; discovery only replaces that list when it
// actually finds files.
(function () {
  var REPO = 'dajaca25/SpacerciseWeb';
  var IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

  var GALLERIES = [
    { id: 'style-explorations', dir: 'images/style-explorations', manifest: 'style-explorations.json', alt: 'Style exploration' },
    { id: 'vector-mockups',     dir: 'images/vector-mockups',     manifest: 'vector-mockups.json',     alt: 'Vector mockup' }
  ];

  GALLERIES.forEach(function (gallery) {
    var wrap = document.getElementById(gallery.id);
    if (!wrap) return;

    fetch('https://api.github.com/repos/' + REPO + '/contents/' + gallery.dir)
      .then(function (res) {
        if (!res.ok) throw new Error('api unavailable');
        return res.json();
      })
      .then(function (entries) {
        return (Array.isArray(entries) ? entries : [])
          .filter(function (e) { return e.type === 'file'; })
          .map(function (e) { return e.name; });
      })
      .catch(function () {
        return fetch(gallery.manifest, { cache: 'no-cache' })
          .then(function (res) { return res.ok ? res.json() : []; });
      })
      .then(function (names) {
        var files = (Array.isArray(names) ? names : [])
          .filter(function (name) { return IMAGE_RE.test(name); })
          .sort(function (a, b) { return a.localeCompare(b, undefined, { numeric: true }); });
        render(wrap, gallery, files);
      })
      .catch(function () { /* nothing reachable — the HTML's own list stays */ });
  });

  function render(wrap, gallery, files) {
    if (!files.length) return; // keep whatever the HTML already lists
    wrap.innerHTML = '';
    files.forEach(function (name, i) {
      var item = document.createElement('li');
      item.className = 'gallery-item';

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-thumb';

      var img = document.createElement('img');
      img.src = gallery.dir + '/' + name;
      img.alt = gallery.alt + ' ' + (i + 1);
      img.loading = 'lazy';

      button.appendChild(img);
      item.appendChild(button);
      wrap.appendChild(item);
    });
  }

  // — lightbox —
  // Delegated off the document so it covers both the HTML's own thumbnails
  // and any that discovery swaps in later.
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');
  var prevBtn = document.getElementById('lightbox-prev');
  var nextBtn = document.getElementById('lightbox-next');
  if (!box || !boxImg) return;

  var group = [];   // the thumbnails in the set currently being viewed
  var index = 0;
  var lastFocused = null;

  document.addEventListener('click', function (e) {
    var thumb = e.target.closest && e.target.closest('.gallery-thumb');
    if (!thumb) return;
    var list = thumb.closest('.gallery-list');
    group = list ? Array.prototype.slice.call(list.querySelectorAll('.gallery-thumb img')) : [];
    var img = thumb.querySelector('img');
    index = Math.max(0, group.indexOf(img));
    open();
  });

  function open() {
    var img = group[index];
    if (!img) return;
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || '';
    lastFocused = document.activeElement;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    // Only offer the arrows when there's more than one image in the set.
    var many = group.length > 1;
    if (prevBtn) prevBtn.hidden = !many;
    if (nextBtn) nextBtn.hidden = !many;
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    boxImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function step(delta) {
    if (!group.length) return;
    index = (index + delta + group.length) % group.length;
    var img = group[index];
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt || '';
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
  if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); step(1); });

  // Clicking the backdrop closes; clicking the image itself doesn't.
  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
