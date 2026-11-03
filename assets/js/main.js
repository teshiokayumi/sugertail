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
  var setThumb = function (box) {
    box.style.backgroundImage =
      'url(https://i.ytimg.com/vi/' + box.dataset.yt + '/hqdefault.jpg)';
  };
  var thumbObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setThumb(entry.target);
            thumbObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '300px 0px' })
    : null;

  document.querySelectorAll('.yt').forEach(function (box) {
    var id = box.dataset.yt;
    if (thumbObserver) thumbObserver.observe(box);
    else setThumb(box);

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

  /* ---- MV一覧：最初の6本のみ表示し、ボタンで全件を開閉 ---- */
  var mvMore = document.getElementById('mvMore');
  var mvCards = document.querySelectorAll('#mvGrid .mv-card');
  var MV_LIMIT = 6;
  if (mvCards.length > MV_LIMIT) {
    var setMvOpen = function (open) {
      mvCards.forEach(function (card, i) {
        card.classList.toggle('is-collapsed', !open && i >= MV_LIMIT);
      });
      mvMore.setAttribute('aria-expanded', String(open));
      mvMore.textContent = open
        ? '一覧を閉じる'
        : 'すべての動画を見る（全' + mvCards.length + '本）';
    };
    setMvOpen(false);
    mvMore.hidden = false;
    mvMore.addEventListener('click', function () {
      var open = mvMore.getAttribute('aria-expanded') !== 'true';
      setMvOpen(open);
      if (!open) document.getElementById('movie').scrollIntoView();
    });
  }

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
    '.section-title, .about-grid, .media-rows, .game-visual, .game-body, .chara, .chara-sheet, .mv-card, .playlist-box, .chapter, .read-card, .cast-list, .news-list, .band-grid, .goods-ticket, .contact-box'
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
