'use strict';

/* ── CONTACT FORM ─────────────────────────────────────────────
   Replace handleSubmit() body with your backend / Formspree /
   Netlify Forms / Telegram Bot call.
   ────────────────────────────────────────────────────────────── */
(function () {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl  = form.querySelector('#name');
    var phoneEl = form.querySelector('#phone');
    var ok = true;

    [nameEl, phoneEl].forEach(function (el) {
      el.classList.remove('error');
      if (!el.value.trim()) { el.classList.add('error'); ok = false; }
    });

    if (!ok) return;

    handleSubmit({ name: nameEl.value.trim(), phone: phoneEl.value.trim() });
  });

  function handleSubmit(data) {
    /*
      ── Telegram Bot example ──────────────────────────────────
      fetch('https://api.telegram.org/bot<TOKEN>/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '<CHAT_ID>',
          text: 'Новая заявка!\nИмя: ' + data.name + '\nТел: ' + data.phone
        })
      });

      ── Formspree ─────────────────────────────────────────────
      Add action="https://formspree.io/f/XXXXXXX" to <form>
      and method="POST" — remove this JS handler entirely.
    */

    console.log('Заявка:', data);
    form.hidden    = true;
    success.hidden = false;
  }
})();


/* ── PHONE INPUT MASK ─────────────────────────────────────────
   Formats input as +7 (XXX) XXX-XX-XX
   ────────────────────────────────────────────────────────────── */
(function () {
  var input = document.getElementById('phone');
  if (!input) return;

  input.addEventListener('input', function () {
    var d = this.value.replace(/\D/g, '');
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d.length && d[0] !== '7') d = '7' + d;

    var out = '';
    if (d.length > 0) out  = '+' + d[0];
    if (d.length > 1) out += ' (' + d.slice(1, 4);
    if (d.length >= 4) out += ') ' + d.slice(4, 7);
    if (d.length >= 7) out += '-' + d.slice(7, 9);
    if (d.length >= 9) out += '-' + d.slice(9, 11);
    this.value = out;
  });
})();


/* ── STICKY BAR — hide while hero CTA is visible ─────────────
   ────────────────────────────────────────────────────────────── */
(function () {
  var bar = document.getElementById('sticky-bar');
  var cta = document.querySelector('.hero .cta-group');
  if (!bar || !cta || !window.IntersectionObserver) return;

  bar.style.transition = 'transform .25s ease';

  new IntersectionObserver(function (entries) {
    bar.style.transform = entries[0].isIntersecting ? 'translateY(100%)' : 'translateY(0)';
  }, { threshold: 0.5 }).observe(cta);
})();
