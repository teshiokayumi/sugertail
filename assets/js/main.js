/* シュガーテイルへようこそ 公式サイト */
(function () {
  'use strict';

  /* ---- ヘッダー：スクロールで背景を濃く ---- */
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- モバイルメニュー ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('globalNav');
  var closeNav = function () {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'メニューを開く');
  };
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  /* ---- YouTube：サムネイルを先に表示し、クリックで再生 ---- */
  document.querySelectorAll('.yt').forEach(function (box) {
    var id = box.dataset.yt;
    box.style.backgroundImage =
      'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';

    box.querySelector('.yt-play').addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = box.dataset.title || 'ミュージックビデオ';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      box.innerHTML = '';
      box.appendChild(iframe);
    });
  });

  /* ---- ライトボックス（キャラクターシートの拡大表示） ---- */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbCap = document.getElementById('lightboxCaption');
  var lbClose = document.getElementById('lightboxClose');
  var lastFocused = null;

  var openLightbox = function (src, caption, alt) {
    lastFocused = document.activeElement;
    lbImg.src = src;
    lbImg.alt = alt || caption || '';
    lbCap.textContent = caption || '';
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  var closeLightbox = function () {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.zoom-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      openLightbox(btn.dataset.zoom, btn.dataset.zoomCaption, img ? img.alt : '');
    });
  });
  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lightbox-figure')) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lb.hidden) closeLightbox();
  });

  /* ---- スクロール連動のフェードイン ---- */
  var targets = document.querySelectorAll(
    '.section-title, .about-grid, .media-card, .chara, .chara-sheet, .mv-card, .playlist-box, .chapter-title, .ep-list, .read-card, .cast-list, .news-list, .contact-box'
  );
  if (!('IntersectionObserver' in window)) return;

  targets.forEach(function (el) { el.classList.add('reveal'); });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });
})();
