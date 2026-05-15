/* Mobile hamburger for the pill nav. On wide screens this does nothing. */
(function () {
  'use strict';
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var toggle = nav.querySelector('.nav__toggle');
  var menu = nav.querySelector('.nav__menu');
  if (!toggle || !menu) return;

  function isOpen() { return nav.classList.contains('is-open'); }
  function open() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation');
  }
  function close() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    isOpen() ? close() : open();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { close(); toggle.focus(); }
  });

  document.addEventListener('click', function (e) {
    if (isOpen() && !nav.contains(e.target)) close();
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('.nav__link')) close();
  });

  // Reset when resizing back up to the desktop layout (one px past $bp-mobile).
  try {
    var mq = window.matchMedia('(min-width: 721px)');
    var onChange = function (e) { if (e.matches) close(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  } catch (e) {}
})();
