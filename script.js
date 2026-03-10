'use strict';

/* ============================================================
   CONTACT FORM — simple client-side handler
   Replace the body of handleSubmit() with your backend call,
   Formspree, Netlify Forms, Telegram Bot, etc.
   ============================================================ */
(function () {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput  = form.querySelector('#name');
    const phoneInput = form.querySelector('#phone');
    let valid = true;

    // Basic validation
    [nameInput, phoneInput].forEach(function (input) {
      input.classList.remove('error');
      if (!input.value.trim()) {
        input.classList.add('error');
        valid = false;
      }
    });

    if (!valid) return;

    handleSubmit({
      name:  nameInput.value.trim(),
      phone: phoneInput.value.trim(),
    });
  });

  function handleSubmit(data) {
    /*
      ── OPTION A: Formspree ──────────────────────────────────
      Replace action attribute on <form> with your Formspree URL:
        <form id="contact-form" action="https://formspree.io/f/XXXXXXX" method="POST">
      And remove this JS handler — Formspree handles redirect.

      ── OPTION B: Netlify Forms ─────────────────────────────
      Add netlify attribute to <form> and Netlify handles it.

      ── OPTION C: Telegram Bot ──────────────────────────────
      fetch('https://api.telegram.org/botTOKEN/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: 'YOUR_CHAT_ID',
          text: `Новая заявка!\nИмя: ${data.name}\nТелефон: ${data.phone}`
        })
      });

      ── CURRENT: just shows success message ─────────────────
    */

    console.log('Форма отправлена:', data);

    form.hidden = true;
    success.hidden = false;
  }
})();


/* ============================================================
   STICKY CTA — hide while hero CTA buttons are visible,
   show once user scrolls past them.
   ============================================================ */
(function () {
  const stickyCta = document.getElementById('sticky-cta');
  if (!stickyCta) return;

  // On mobile the sticky bar is always shown (CSS handles desktop).
  // Optionally hide it while the hero section is in view.
  const heroCta = document.querySelector('.hero-cta');
  if (!heroCta || !window.IntersectionObserver) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        // Hide sticky bar when hero CTA is visible on screen
        stickyCta.style.transform = entry.isIntersecting
          ? 'translateY(100%)'
          : 'translateY(0)';
      });
    },
    { threshold: 0.5 }
  );

  // Apply CSS transition for smooth show/hide
  stickyCta.style.transition = 'transform 0.3s ease';
  observer.observe(heroCta);
})();


/* ============================================================
   PHONE MASK — auto-formats Russian phone numbers in the form
   ============================================================ */
(function () {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function () {
    let digits = this.value.replace(/\D/g, '');

    // Normalise leading 8 → 7
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }
    if (!digits.startsWith('7') && digits.length > 0) {
      digits = '7' + digits;
    }

    // Format: +7 (XXX) XXX-XX-XX
    let formatted = '';
    if (digits.length > 0) formatted = '+' + digits[0];
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);

    this.value = formatted;
  });
})();
