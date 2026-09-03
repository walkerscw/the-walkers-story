const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8e-WJwLMoNxTZxdUIJFKvuMBov2Xqr2Fux9lFbJKaHdpQ03bxJaBDN3iDWO5SRU5A/exec';
const rsvpForm = document.querySelector('#walkers-rsvp-form');
const rsvpSubmitButton = document.querySelector('#walkers-submit-btn');
const rsvpError = document.querySelector('#walkers-error');
const rsvpFormContent = document.querySelector('#walkers-form-content');
const rsvpConfirmation = document.querySelector('#walkers-confirmation');

rsvpForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!rsvpForm.reportValidity()) return;

  rsvpError.hidden = true;
  rsvpError.textContent = '';

  const formData = new FormData(rsvpForm);
  const payload = {
    fullName: String(formData.get('fullName') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    attendance: String(formData.get('attendance') || '').trim(),
  };

  if (!payload.fullName || !payload.email || !payload.phone || !payload.attendance) {
    rsvpError.textContent = 'Please complete all required fields.';
    rsvpError.hidden = false;
    return;
  }

  const originalButtonText = rsvpSubmitButton.textContent;
  rsvpSubmitButton.disabled = true;
  rsvpSubmitButton.textContent = 'Recording RSVP…';
  rsvpForm.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(RSVP_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('The RSVP service did not respond successfully.');
    const result = await response.json();
    if (result?.result !== 'success') throw new Error(result?.message || 'The RSVP could not be recorded.');

    rsvpFormContent.hidden = true;
    rsvpConfirmation.hidden = false;
    rsvpConfirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) {
    rsvpError.innerHTML = 'We could not save your RSVP. Please try again or contact Sean Walker at <a href="mailto:thewalkersstory2027@gmail.com">thewalkersstory2027@gmail.com</a> or <a href="tel:+17864589499">786-458-9499</a>.';
    rsvpError.hidden = false;
    rsvpSubmitButton.disabled = false;
    rsvpSubmitButton.textContent = originalButtonText;
    rsvpForm.removeAttribute('aria-busy');
  }
});
