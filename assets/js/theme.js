/* Dark/light toggle. The initial theme is set by the no-flash script in <head>;
   this only wires the floating button and keeps it in sync. */
(function () {
  'use strict';
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  // The button advertises the ACTION (switch to the *other* theme).
  function sync() {
    if (!btn) return;
    var target = current() === 'dark' ? 'light' : 'dark';
    var glyph = target === 'dark' ? '☾' /* ☾ */ : '☀' /* ☀ */;
    var text = target === 'dark' ? 'Dark' : 'Light';
    var label = 'Switch to ' + target + ' theme';
    var g = btn.querySelector('.theme-toggle__glyph');
    var t = btn.querySelector('.theme-toggle__text');
    if (g) g.textContent = glyph;
    if (t) t.textContent = text;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  if (btn) {
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }
  sync();

  // Follow the OS preference if the user hasn't made an explicit choice.
  try {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function (e) {
      var stored = null;
      try { stored = localStorage.getItem('theme'); } catch (err) {}
      if (stored !== 'light' && stored !== 'dark') {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        sync();
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  } catch (e) {}
})();
