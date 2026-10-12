(function () {
  var root = document.getElementById('srDemo');
  var v = document.getElementById('srVideo');
  var big = document.getElementById('srBig');
  var play = document.getElementById('srPlay');
  var mute = document.getElementById('srMute');
  var scrub = document.getElementById('srScrub');
  var dragging = false;

  v.muted = false;   // sound on by default
  v.volume = 1;

  function show(btn, a, b, first) {
    btn.querySelector(a).hidden = !first;
    btn.querySelector(b).hidden = first;
  }
  function sync() {
    var playing = !v.paused && !v.ended;
    root.classList.toggle('is-playing', playing);
    show(play, '.i-play', '.i-pause', !playing);
    play.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    big.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
    show(mute, '.i-sound', '.i-muted', !v.muted);
    mute.setAttribute('aria-label', v.muted ? 'Unmute' : 'Mute');
  }
  function toggle() {
    if (v.paused || v.ended) {
      var p = v.play();
      if (p && p.catch) p.catch(function () { sync(); });
    } else {
      v.pause();
    }
  }

  big.addEventListener('click', toggle);
  play.addEventListener('click', toggle);
  v.addEventListener('click', toggle);
  mute.addEventListener('click', function () { v.muted = !v.muted; sync(); });

  ['play', 'pause', 'ended', 'volumechange'].forEach(function (e) { v.addEventListener(e, sync); });

  v.addEventListener('timeupdate', function () {
    if (dragging || !v.duration) return;
    var pct = v.currentTime / v.duration;
    scrub.value = Math.round(pct * 1000);
    scrub.style.setProperty('--p', (pct * 100) + '%');
  });
  scrub.addEventListener('input', function () {
    dragging = true;
    var pct = scrub.value / 1000;
    scrub.style.setProperty('--p', (pct * 100) + '%');
    if (v.duration) v.currentTime = pct * v.duration;
  });
  scrub.addEventListener('change', function () { dragging = false; });
  ['pointerup', 'touchend', 'keyup'].forEach(function (e) {
    scrub.addEventListener(e, function () { dragging = false; });
  });

  sync();
})();
