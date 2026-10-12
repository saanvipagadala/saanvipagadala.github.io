/* Saanvi's projects: the page's only script.

   One job, and an optional one. Nothing here is needed for the page to read
   correctly -- if this file fails to load, the film still plays and every
   word is still there, the page is only less tidy. That is deliberate: a page
   about a first grade science project should not depend on JavaScript to be
   usable.

   It is the fullscreen half of the script the other sites here carry. They
   also use it to drive a contact form and a page full of <video> elements;
   this page has neither. */

(function () {
  'use strict';

  /* ---- fullscreen ------------------------------------------------------
     The button a video player puts in its bottom right corner, for the page
     itself. Built by script rather than sitting in the markup, because a
     browser that cannot go fullscreen should not be offered a button that
     does nothing. Not on touch devices: a phone has no fullscreen for a page,
     and on a tablet the button would sit under a thumb. */

  var root = document.documentElement;
  if (!(root.requestFullscreen || root.webkitRequestFullscreen)) return;
  if ('ontouchstart' in window) return;

  var EXPAND = '<path d="M3 8V3h5M17 3h5v5M22 17v5h-5M8 22H3v-5"/>';
  var SHRINK = '<path d="M8 3v5H3M22 8h-5V3M17 22v-5h5M3 17h5v5"/>';

  var btn = document.createElement('button');
  btn.className = 'fs';
  btn.type = 'button';
  document.body.appendChild(btn);

  function on() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement);
  }

  function paint() {
    var label = on() ? 'Leave fullscreen' : 'View fullscreen';
    btn.setAttribute('aria-label', label);
    btn.title = label + '  (F)';
    btn.innerHTML = '<svg viewBox="0 0 25 25" aria-hidden="true">' +
                    (on() ? SHRINK : EXPAND) + '</svg>';
  }

  function toggle() {
    if (on()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
    }
  }

  btn.addEventListener('click', toggle);
  document.addEventListener('fullscreenchange', paint);
  document.addEventListener('webkitfullscreenchange', paint);

  /* The same shortcut a video player uses, but never while something is being
     typed into, and never on top of a browser shortcut. */
  addEventListener('keydown', function (e) {
    if (e.key !== 'f' && e.key !== 'F') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable ||
              /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    e.preventDefault();
    toggle();
  });

  paint();
})();
