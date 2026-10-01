/**
 * edgenote — Professional Package Website Logic
 * https://edgenote-py.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButtons();
  initCodeCopyButtons();
  initScrollReveal();
});

/* ── Copy install command ───────────────────────────────────────────────── */
function initCopyButtons() {
  const buttons = [
    { btn: document.getElementById('copyInstallBtn'), text: 'pip install edgenote' },
    { btn: document.getElementById('ctaCopyBtn'),     text: 'pip install edgenote' },
  ];

  buttons.forEach(({ btn, text }) => {
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(text);
        const spanEl = btn.querySelector('span');
        if (spanEl) {
          const orig = spanEl.textContent;
          spanEl.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => { spanEl.textContent = orig; btn.classList.remove('copied'); }, 2000);
        }
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  });
}

/* ── Code block copy buttons ────────────────────────────────────────────── */
function initCodeCopyButtons() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    const preEl = btn.dataset.target ? document.getElementById(btn.dataset.target) : null;
    if (!preEl) return;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preEl.innerText);
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  });
}

/* ── Scroll Reveal ──────────────────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}
